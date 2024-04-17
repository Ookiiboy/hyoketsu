import { PageProps, Handlers } from "$fresh/server.ts";
import { PollMeta } from '../../../lib/poll.ts';
import { store } from '../../../lib/db/poll-store.ts';
import { RadioButton } from "../../../components/RadioButton.tsx";
import { RadioFieldset } from "../../../components/RadioFieldset.tsx";
import { Button } from "../../../components/Button.tsx";
import { BottomBar } from "../../../components/BottomBar.tsx";
import { NotFoundError } from "../../../lib/errors.ts";

export default function Vote(props: PageProps<PollMeta>) {
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

    const poll = await store.getPollMeta(id);
    return await ctx.render(poll);
  },
  async POST(req, ctx) {
    const id = ctx.params.id;

    const poll = await store.getPollMeta(id);
    const form = await req.formData();

    for (const selection of form.getAll('selections')) {
      if (typeof selection === 'string') {
        await store.vote(poll, selection);
      }
    }

    // Redirect user to results page
    const headers = new Headers();
    headers.set("location", `results`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
