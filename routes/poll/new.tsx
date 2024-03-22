import { osType } from "$std/path/_os.ts";
import { RouteContext, Handlers } from "$fresh/server.ts";
import { UnsavedPoll, MultipleChoiceResponses } from '../../lib/poll.ts';
import { db } from '../../lib/db/db.ts';
import { BottomBar } from "../../components/BottomBar.tsx";
import { Button } from "../../components/Button.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const question = form.get("question")?.toString().trim();
    const options = form.get("pollOptions")?.toString().split(/\r?\n/)
      // remove empties
      .filter(opt => !!opt);

    // TODO filter out dupes

    if (!options || options.length === 0) {
      // TODO handle error
    }

    if (!question || question.length === 0) {
      // TODO handle
    }

    const unsaved: UnsavedPoll = {
      type: 'multiple',
      question,
      options,
      responses: options.reduce((responses, option) => {
        responses[option] = 0;
        return responses;
      }, {} as MultipleChoiceResponses)
    };

    const poll = db.createPoll(unsaved);

    console.log(poll);

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", `${poll.id}/share`);
    return new Response(null, {
      status: 303,
      headers
    });
  },
};

export default function New() {
  return (
    <>
      <form method="post">
        <div>
          <label for="question">Question</label>
          <input type="text" name="question" id="question" />
        </div>
        <div>
          <label for="pollOptions">Options</label>
          <textarea name="pollOptions" id="pollOptions"/>
        </div>
        <BottomBar>
        <Button type="submit">Make Poll</Button>
        </BottomBar>
      </form>
    </>
  );
}
