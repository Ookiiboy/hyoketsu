import { osType } from "$std/path/_os.ts";
import { RouteContext, Handlers } from "$fresh/server.ts";
import { UnsavedPoll, MultipleChoiceResponses } from '../../lib/poll.ts';
import { db } from '../../lib/db/db.ts';
import { BottomBar } from "../../components/BottomBar.tsx";
import { Button } from "../../components/Button.tsx";
import { TextInput } from "../../components/TextInput.tsx";
import { TextArea } from "../../components/TextArea.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const question = form.get("question")?.toString().trim();
    const options = form.get("options")?.toString().split(/\r?\n/)
      // remove empties
      .filter(opt => !!opt);

    // TODO filter out dupes

    if (!options || options.length === 0) {
      const headers = new Headers();
      headers.set("location", `new`);
      return new Response(null, {
        status: 400,
        headers
        // return ctx.render(), how?
      });
    }

    if (!question || question.length === 0) {
      const headers = new Headers();
      headers.set("location", `new`);
      return new Response(null, {
        status: 400,
        headers
        // return ctx.render(), how?
      });
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
        <TextInput name="question" id="question" placeholder="Doughnuts or bagels?">Poll Question</TextInput>
        <TextArea name="options" id="pollOptions" placeholder="One choice per line...">Poll Choices</TextArea>
        <BottomBar>
        <Button primary type="submit">Make Poll</Button>
        </BottomBar>
      </form>
    </>
  );
}
