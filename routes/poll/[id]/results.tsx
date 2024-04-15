import { PageProps, Handlers } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { store } from '../../../lib/db/poll-store.ts';
import { AutoRefreshingBarGraph } from "../../../islands/AutoRefreshingBarGraph.tsx";
import { NotFoundError } from "../../../lib/errors.ts";

export default function Results(props: PageProps<Poll>) {
  return (
    <>
      <h1 className={`h2`}>{props.data.prompt}</h1>
      <AutoRefreshingBarGraph pollId={props.data.id} responses={props.data.responses}/>
      <br/>
      <a className="c-button c-button--primary" href="results">Refresh</a>
    </>
  );
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;

    try {
      const poll = await store.getPoll(id);
      return await ctx.render(poll);
    } catch(e) {
      if (e instanceof NotFoundError) {
        return ctx.renderNotFound();
      } else {
        return new Response(null, {
          status: 500
        });
      }
    }
  }
};
