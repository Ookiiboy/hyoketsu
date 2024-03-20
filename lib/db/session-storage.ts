import { Adapter } from './adapter.ts';

export const adapter: Adapter = {
  get(key) {
    return sessionStorage.getItem(key);
  },
  set(key, value) {
    sessionStorage.setItem(key, value);
  },
  delete(key) {
    sessionStorage.removeItem(key);
  }
};
