import { Poll, UnsavedPoll, MultipleChoiceResponses } from '../poll.ts';
import { PollId } from '../poll-id.ts';
import { minutesToLive } from "../expiration/time-to-live.ts";

type PollMeta = Omit<Poll, 'responses'>;

export const store = await initialize();

async function initialize() {
  const kv = await Deno.openKv();

  return {
    async create(unsaved: UnsavedPoll): Promise<Poll> {
      const now = Date.now();
      const id: PollId = `${now}`;
      const expirationDate = now + (minutesToLive * 60 * 1000);

      const pollMeta: PollMeta = {
        ...unsaved,
        id,
        createdDate: now,
        expirationDate,
      };

      // save poll meta
      const key = pollKey(id);
      await kv.set(key, pollMeta, {expireIn: expirationDate});

      // save responses
      for (const option of pollMeta.options) {
        await kv.set(responseKey(id, option), 0n, {expireIn: expirationDate});
      }

      // Populate poll responses so calling code can use it immediately
      const poll: Poll = {
        ...pollMeta,
        responses: defaultResponses(unsaved.options),
      }

      return poll;
    },
    async get(id: PollId): Promise<Poll> {
      const { value: pollMeta  } = await kv.get<PollMeta>(pollKey(id));

      if (!pollMeta) {
        throw new Error('poll not found');
      }

      // Load vote counts
      const options = pollMeta.options;
      const optionKeys = options.map(option => responseKey(id, option));
      const results = await kv.getMany<Array<Deno.KvU64>>(optionKeys);
      const responses = defaultResponses(options);

      for (let i = 0; options.length; i++) {
        const result = results[i];

        responses[options[i]] = result.value == null
          ? 0
          // Coerce bigint to number, could lose precision
          : Number(result.value);
      }

      // Combine vote counts with meta to form fully populated poll object
      return {
        ...pollMeta,
        responses
      };
    },
    async vote(id: PollId, option: string) {
      const { value: pollMeta  } = await kv.get<PollMeta>(pollKey(id));

      if (!pollMeta) {
        throw new Error('poll not found');
      }

      if (!(option in pollMeta.options)) {
        throw new Error('option not found');
      }

      const key = responseKey(id, option);
      await kv.atomic().sum(key, 1n).commit();
    }
  };
}

type PollKey = ['poll', PollId];
type ResponsesKey = [...PollKey, 'responses'];
type ResponseKey = [...ResponsesKey, string];

function pollKey(id: PollId): PollKey {
  return ['poll', id] as const;
}

function responsesKey(id: PollId): ResponsesKey {
  return [...pollKey(id), 'responses'] as const;
}

function responseKey(id: PollId, option: string): ResponseKey {
  return [...responsesKey(id), option] as const;
}

function defaultResponses(options: Poll['options']): MultipleChoiceResponses {
  return options.reduce((counts, curr) => {
    counts[curr] = 0;
    return counts;
  }, {} as MultipleChoiceResponses);
}
