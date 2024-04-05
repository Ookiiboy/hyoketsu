import { Adapter } from './adapter.ts';

export const adapter: Adapter = {
  get(key) {
    return sessionStorage.getItem(key);
  },
  set(key, value) {
    sessionStorage.setItem(key, value);
  },
  deleteWhere(pred) {
    let count = 0;

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && pred(key)) {
        sessionStorage.removeItem(key);
        count += 1;
      }
    }

    return count;
  },
};
