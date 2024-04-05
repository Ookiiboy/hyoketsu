import { Adapter } from './adapter.ts';

export const adapter: Adapter = {
  async get(key) {
    return sessionStorage.getItem(key);
  },
  async set(key, value) {
    return sessionStorage.setItem(key, value);
  },
  async deleteWhere(pred) {
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
