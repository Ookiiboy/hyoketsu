import { FreshContext } from "$fresh/server.ts";
import { store } from "../../../lib/db/poll-store.ts";

export const handler = async (_req: Request, ctx: FreshContext) => {
  const id = ctx.params.id;

  const poll = await store.getPoll(id);
  return new Response(JSON.stringify(poll));
};
