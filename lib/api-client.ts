import { Poll } from '../lib/poll.ts';

export function loadPoll(id: Poll['id']) {
  return fetch(`/api/poll/${id}`)
    .then((resp) => resp.json())
    .then((json) => json as Poll);
}
