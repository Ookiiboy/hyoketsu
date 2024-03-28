import { PollId } from './poll-id.ts';

type PollType = 'multiple';

type Common = {
  id: PollId;
  type: PollType;
  /** Milliseconds since Jan 1, 1970 UTC */
  createdDate: number;
  /** The question */
  prompt: string;
};

export type MultipleChoiceResponses = {
  [option: string]: number;
};

export type MultipleChoicePoll = Common & {
  type: 'multiple',
  options: Array<string>,
  responses: MultipleChoiceResponses,
};

export type Poll = MultipleChoicePoll;
export type UnsavedPoll = Omit<Poll, 'id' | 'createdDate'>;
