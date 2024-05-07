type PollType = 'multiple';

type Common = {
  id: string;
  type: PollType;
  /** Milliseconds since Jan 1, 1970 UTC */
  createdDate: number;
  /** The question */
  prompt: string;
  /** Milliseconds since Jan 1, 1970 UTC */
  expirationDate: number;
};

export type MultipleChoiceResponses = {
  [option: string]: number;
};

export type MultipleChoicePoll = Common & {
  type: 'multiple';
  options: Array<string>;
  responses: MultipleChoiceResponses;
};

export type Poll = MultipleChoicePoll;
/**
 * Poll that hasn't been saved yet
 */
export type UnsavedPoll = Omit<
  Poll,
  'id' | 'createdDate' | 'expirationDate' | 'responses'
>;
/**
 * Everything except the vote counts.
 */
export type PollMeta = Omit<Poll, 'responses'>;
