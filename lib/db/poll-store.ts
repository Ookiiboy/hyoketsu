import { Poll, PollMeta, UnsavedPoll, MultipleChoiceResponses } from '../poll.ts';
import { minutesToLive } from "../expiration.ts";
import { NotFoundError } from "../errors.ts";
import { ulid } from 'ulid';

export const store = await initialize();

async function initialize() {
  const kv = await Deno.openKv();

  async function getMeta(id: Poll['id']): Promise<PollMeta> {
    const { value  } = await kv.get<PollMeta>(pollKey(id));

    if (!value) {
      throw new NotFoundError('poll not found');
    }

    return value;
  }

  return {
    async create(unsaved: UnsavedPoll): Promise<Poll> {
      const now = Date.now();
      const id = ulid();
      const expirationDate = now + (minutesToLive * 60 * 1000);

      const pollMeta: PollMeta = {
        ...unsaved,
        id,
        createdDate: now,
        expirationDate,
      };

      const tx = kv.atomic();

      // Save poll meta
      tx.set(pollKey(id), pollMeta, {expireIn: expirationDate});

      // Save vote count for each option
      for (const option of pollMeta.options) {
         tx.set(responseKey(id, option), new Deno.KvU64(0n), {expireIn: expirationDate});
      }

      // Commit all operations to db
      await tx.commit();

      // Give calling code something to look at
      return {
        ...pollMeta,
        responses: defaultResponses(unsaved.options),
      };
    },
    /**
     * Get a poll, minus the vote counts.
     */
    getPollMeta: getMeta,
    /**
     * Get a poll, fully populated.
     */
    async getPoll(id: Poll['id']): Promise<Poll> {
      const pollMeta = await getMeta(id);

      // Load vote counts
      const options = pollMeta.options;
      const optionKeys = options.map(option => responseKey(id, option));
      const results = await kv.getMany<Array<Deno.KvU64>>(optionKeys);

      const responses = results.reduce((voteCounts, current, index) => {
        voteCounts[options[index]] = current.value == null
          ? 0
          // Risky: Coerce bigint to number which could lose precision
          : Number(current.value);
        return voteCounts;
      }, defaultResponses(options));

      // Make a fully populated poll object
      return {
        ...pollMeta,
        responses
      };
    },
    async vote(poll: PollMeta, option: string) {
      if (!poll.options.includes(option)) {
        throw new NotFoundError('option not found');
      }

      const key = responseKey(poll.id, option);
      await kv.atomic().sum(key, 1n).commit();
    }
  };
}

type PollKey = ['poll', Poll['id']];
type ResponsesKey = [...PollKey, 'responses'];
type ResponseKey = [...ResponsesKey, string];

function pollKey(id: Poll['id']): PollKey {
  return ['poll', id] as const;
}

function responsesKey(id: Poll['id']): ResponsesKey {
  return [...pollKey(id), 'responses'] as const;
}

function responseKey(id: Poll['id'], option: string): ResponseKey {
  return [...responsesKey(id), option] as const;
}

function defaultResponses(options: Poll['options']): MultipleChoiceResponses {
  return options.reduce((counts, curr) => {
    counts[curr] = 0;
    return counts;
  }, {} as MultipleChoiceResponses);
}
