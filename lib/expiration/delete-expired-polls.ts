import { db } from '../db/db.ts';
import { isValid, createdDateFromId } from '../poll-id.ts';
import { minutesToLive } from './time-to-live.ts';

/** How long a poll lasts, in millis */
const MAX_POLL_AGE_MS = minutesToLive * 60 * 1000;

export function isExpiredPollId(key: string): boolean {
  if (isValid(key)) {
    const createdDate = createdDateFromId(key);
    const age = Date.now() - createdDate;
    return age > MAX_POLL_AGE_MS;
  }
  return false;
}

export async function deleteExpiredPolls() {
  console.log(`Checking expired polls...`);
  const count = await db.deleteWhere(isExpiredPollId);
  console.log(`Deleted ${count} expired polls`);
}
