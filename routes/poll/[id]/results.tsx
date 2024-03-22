import { PageProps } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { db } from '../../../lib/db/db.ts';

export default function Results(props: PageProps<Poll>) {
  return (
    <div>
      <h1>{props.data?.question}</h1>
      <ul>
        {Object.entries(props.data.responses).map((a, i) => {
          console.log(i);
          return <li key={i}>{a[0]} - {a[1]}</li>
        })}
      </ul>
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
