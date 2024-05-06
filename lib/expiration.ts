import { PollMeta } from "./poll.ts";

/**
 * How long polls last.
 */
export const minutesToLive = 20;

/**
 * Is a poll expired?
 */
export const isExpired = (poll: PollMeta) => Date.now() >= poll.expirationDate;
