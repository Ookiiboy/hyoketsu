import { FreshContext } from "$fresh/server.ts";
import { db } from '../../../lib/db/db.ts';

export const handler = (_req: Request, ctx: FreshContext): Response => {
  const id = ctx.params.id;
  const poll = db.getPoll(id);

  if (!poll) {
    return new Response("404");
  }

  return new Response(JSON.stringify(poll));
};
