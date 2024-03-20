import { Adapter } from './adapter.ts';
import { adapter } from './session-storage.ts';
import { Poll, UnsavedPoll } from '../poll.ts';

function create(adapter: Adapter) {
  return {
    createPoll(unsaved: UnsavedPoll) {
      const id = btoa(Date.now().toString());
      const poll: Poll = {
        ...unsaved,
        id,
      };

      adapter.set(id, JSON.stringify(poll));

      return poll;
    },
    getPoll(id: string) {
      return adapter.get(id);
    },
    deletePoll(id: string) {
      adapter.delete(id);
    }
  };
}

export const db = create(adapter);
