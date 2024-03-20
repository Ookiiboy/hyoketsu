import { PageProps } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { db } from '../../../lib/db/db.ts';

export default function Vote(props: PageProps<Poll>) {
  return (
    <div>
      <form method="post">
        <p>{props.data.question}</p>
        <div>
          {
            props.data.options.map(option => (
              <>
                <label>
                  <input type="radio" value={option} name="selections" key={option}/> {option}
                </label>
                <br/>
              </>
            ))
          }
        </div>
        <button type="submit">Submit</button>
      </form>
      {/*<pre>{JSON.stringify(props.data, null, 2)}</pre>*/}
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
  },
  async POST(req, ctx) {
    const id = ctx.params.id;
    const poll = db.getPoll(id);

    if (!poll) {
      return new Response(404);
    }

    const form = await req.formData();
    form.getAll('selections').forEach(selection => {
      if (selection in poll.responses) {
        poll.responses[selection] += 1;
      }
    });

    db.savePoll(poll);

    // Redirect user to results page
    const headers = new Headers();
    headers.set("location", `results`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
