export type MultipleChoiceResponses = {
  [key: string]: number
};

export type MultipleChoicePoll = {
  id: string,
  type: 'multiple',
  question: string,
  options: Array<string>,
  minSelections?: number,
  maxSelections?: number,
  responses: MultipleChoiceResponses
};

export type Poll = MultipleChoicePoll;
export type UnsavedPoll = Omit<Poll, 'id'>;
