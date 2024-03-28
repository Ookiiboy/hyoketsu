import { Adapter, DeletePredicate } from './adapter.ts';
import { adapter } from './session-storage.ts';
import { Poll, UnsavedPoll } from '../poll.ts';
import { nextId, createdDateFromId } from '../poll-id.ts';

function create(adapter: Adapter) {
  return {
    createPoll(unsaved: UnsavedPoll) {
      const id = nextId();
      const createdDate = createdDateFromId(id);

      const poll: Poll = {
        ...unsaved,
        id,
        createdDate,
      };

      adapter.set(id, JSON.stringify(poll));

      return poll;
    },
    getPoll(id: string) {
      const rawPoll = adapter.get(id);
      return rawPoll ? JSON.parse(rawPoll) : null;
    },
    savePoll(poll: Poll) {
      adapter.set(poll.id, JSON.stringify(poll));
    },
    deletePoll(id: string) {
      adapter.delete(id);
    },
    deleteWhere(pred: DeletePredicate) {
      return adapter.deleteWhere(pred);
    }
  };
}

export const db = create(adapter);
