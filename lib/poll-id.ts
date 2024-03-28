const idPattern = /^\d+$/;
export type PollId = `${number}`;

export const nextId = (): PollId => `${Date.now()}`;
export const isValid = (key: string): key is PollId => idPattern.test(key);

export const createdDateFromId = (id: PollId) => {
  if (!isValid(id)) {
    throw new Error(`Invalid poll id: ${id}`);
  }

  return Number(id);
}
