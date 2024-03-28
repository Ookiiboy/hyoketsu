import { db } from '../db/db.ts';
import { isValid, createdDateFromId } from '../poll-id.ts';

const MAX_POLL_AGE = 20 * 60 * 1000; // 20 minutes

export function isExpiredPollId(key: string): boolean {
  if (isValid(key)) {
    const createdDate = createdDateFromId(key);
    const age = Date.now() - createdDate;
    return age > MAX_POLL_AGE;
  }
  return false;
}

export function deleteExpiredPolls() {
  console.log(`Checking expired polls...`);
  const count = db.deleteWhere(isExpiredPollId);
  console.log(`Deleted ${count} expired polls`);
}
