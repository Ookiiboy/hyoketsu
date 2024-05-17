import { Poll } from './poll.ts';

function pollUrl(baseUrl: URL, pollId: Poll['id']): string {
  const copy = new URL(baseUrl);
  copy.pathname = `/poll/${encodeURIComponent(pollId)}`;
  return copy.toString();
}

export const vote = (baseUrl: URL, pollId: Poll['id']): string => {
  return pollUrl(baseUrl, pollId);
};

export const share = (baseUrl: URL, pollId: Poll['id']): string => {
  return pollUrl(baseUrl, pollId) + '/share';
};

export const results = (baseUrl: URL, pollId: Poll['id']): string => {
  return pollUrl(baseUrl, pollId) + '/results';
};
