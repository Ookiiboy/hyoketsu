import { PageProps } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { db } from '../../../lib/db/db.ts';
import { BarGraph } from "../../../components/BarGraph.tsx";

export default function Results(props: PageProps<Poll>) {
  return (
    <div>
      <h1 className={`h2`}>{props.data.question}</h1>
      <BarGraph responses={props.data.responses}/>
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
