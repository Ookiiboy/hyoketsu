import { Adapter } from './adapter.ts';
import { adapter } from './session-storage.ts';
import { Poll, UnsavedPoll } from '../poll.ts';

function create(adapter: Adapter) {
  const nextId = () => String(Date.now());

  return {
    createPoll(unsaved: UnsavedPoll) {
      const id = nextId();
      const poll: Poll = {
        ...unsaved,
        id,
        createdDate: Date.now(),
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
    }
  };
}

export const db = create(adapter);
