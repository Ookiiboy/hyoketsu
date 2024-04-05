export type DeletePredicate = (key: string) => boolean;

export type Adapter = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  /**
   * Delete all values whose key satisfies a predicate.
   *
   * @returns How many items were deleted.
   */
  deleteWhere(pred: DeletePredicate): Promise<number>;
};
