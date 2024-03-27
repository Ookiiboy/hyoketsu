import { PageProps } from "$fresh/server.ts";
import { Poll } from '../../../lib/poll.ts';
import { db } from '../../../lib/db/db.ts';
import { RadioButton } from "../../../components/RadioButton.tsx";
import { RadioFieldset } from "../../../components/RadioFieldset.tsx";
import { Button } from "../../../components/Button.tsx";
import { BottomBar } from "../../../components/BottomBar.tsx";

export default function Vote(props: PageProps<Poll>) {
  return (
    <div>
      <form method="post">
        <h1 className={`h2`}>{props.data.prompt}</h1>
        <RadioFieldset id="vote">
          {
            props.data.options.map(option => (
              <RadioButton name="selections" value={option} key={option}>{option}</RadioButton>
            ))
          }
        </RadioFieldset>
        <BottomBar>
          <Button primary type="submit">Cast Your Vote</Button>
        </BottomBar>
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
