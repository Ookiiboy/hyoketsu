import { FreshContext } from "$fresh/server.ts";
import { store } from '../../../lib/db/poll-store.ts';
import { NotFoundError } from "../../../lib/errors.ts";

export const handler = async (_req: Request, ctx: FreshContext) => {
  const id = ctx.params.id;

  try {
    const poll = await store.getPoll(id);
    return new Response(JSON.stringify(poll));
  } catch (e) {
    if (e instanceof NotFoundError) {
      return new Response(null, {
        status: 404
      });
    } else {
      return new Response(null, {
        status: 500
      });
    }
  }
};
