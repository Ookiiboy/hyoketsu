import { Adapter, DeletePredicate } from './adapter.ts';
import { adapter } from './session-storage.ts';
import { Poll, UnsavedPoll } from '../poll.ts';
import { nextId, createdDateFromId } from '../poll-id.ts';

function create(adapter: Adapter) {
  return {
    async createPoll(unsaved: UnsavedPoll) {
      const id = nextId();
      const createdDate = createdDateFromId(id);

      const poll: Poll = {
        ...unsaved,
        id,
        createdDate,
      };

      await adapter.set(id, JSON.stringify(poll));

      return poll;
    },
    async getPoll(id: string) {
      const rawPoll = await adapter.get(id);
      return rawPoll ? JSON.parse(rawPoll) : null;
    },
    async savePoll(poll: Poll) {
      return adapter.set(poll.id, JSON.stringify(poll));
    },
    async deleteWhere(pred: DeletePredicate) {
      return adapter.deleteWhere(pred);
    }
  };
}

export const db = create(adapter);
