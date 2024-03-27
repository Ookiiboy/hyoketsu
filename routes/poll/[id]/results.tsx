import { PageProps } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { db } from '../../../lib/db/db.ts';
import { BarGraph } from "../../../components/BarGraph.tsx";
import { Button } from "../../../components/Button.tsx";

export default function Results(props: PageProps<Poll>) {
  return (
    <>
      <h1 className={`h2`}>{props.data.prompt}</h1>
      <BarGraph responses={props.data.responses}/>
      <br/>
      <Button onClick="window.location.reload()">Reload</Button>
    </>
  );
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const poll = db.getPoll(id);
    if (!poll) {
      return new Response("404");
      // should we redirect?
      // Where should we redirect to?
    }
    return await ctx.render(poll);
  }
};
