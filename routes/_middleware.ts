import * as log from 'log';
import { FreshContext } from '$fresh/server.ts';
import { NotFoundError } from "../lib/errors.ts";

// Handle errors
export async function handler(_req: Request, ctx: FreshContext) {
  try {
    return await ctx.next();
  } catch (e) {
    log.error(e);

    if (e instanceof NotFoundError) {
      return ctx.renderNotFound();
    }

    throw e;
  }
}
