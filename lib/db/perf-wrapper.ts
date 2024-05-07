import { logger } from "../logger.ts";

// deno-lint-ignore no-explicit-any
export function perfWrapper<T, A extends any[]>(
  name: string,
  fn: (...a: A) => T,
): (...a: A) => T {
  return function wrapper(...a: A) {
    const start = performance.now();

    const result = fn(...a);

    logger.info(`${name} - ms: ${performance.now() - start}`);

    return result;
  };
}
