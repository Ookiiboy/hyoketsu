import { FreshContext, Handler } from '$fresh/server.ts';
import { NotFoundError } from "../lib/errors.ts";
import { logger } from '../lib/logger.ts';

export const handler: Array<Handler> = [
  // Handle errors
  async function errorHandler(_req: Request, ctx: FreshContext) {
    try {
      return await ctx.next();
    } catch (e) {
      logger.error(e);

      if (e instanceof NotFoundError) {
        return ctx.renderNotFound();
      }

      throw e;
    }
  },
  // Log response timing
  async function responseTimer(req: Request, ctx: FreshContext) {
    const before = performance.now();
    const result = await ctx.next();

    if (ctx.destination === 'route') {
      const durationMillis = performance.now() - before;
      const url = new URL(req.url);

      logger.info(`${req.method} ${url.pathname} - ms: ${durationMillis}`);
    }

    return result;
  },
];
