import { FreshContext } from "$fresh/server.ts";
import { db } from '../../../lib/db/db.ts';

export const handler = async (_req: Request, ctx: FreshContext) => {
  const id = ctx.params.id;
  const poll = await db.getPoll(id);

  if (!poll) {
    return new Response(null, {
      status: 404
    });
  }

  return new Response(JSON.stringify(poll));
};
