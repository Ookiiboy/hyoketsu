import { PageProps } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { db } from '../../../lib/db/db.ts';

export default function Results(props: PageProps<Poll>) {
  return (
    <div>
      this is where we show the results of the poll
      <h1>You're looking at the results of ID: {props.params.id}</h1>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const poll = db.getPoll(id);

    if (!poll) {
      return new Response(404);
    }

    return await ctx.render(poll);
  }
};
