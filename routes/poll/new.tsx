import { RouteContext, Handlers, PageProps } from "$fresh/server.ts";
import { UnsavedPoll, MultipleChoiceResponses } from '../../lib/poll.ts';
import { db } from '../../lib/db/db.ts';
import { BottomBar } from "../../components/BottomBar.tsx";
import { Button } from "../../components/Button.tsx";
import { TextInput } from "../../components/TextInput.tsx";
import { TextArea } from "../../components/TextArea.tsx";

type FormErrors = {
  prompt?: string,
  options?: string,
};

type FormValues = {
  prompt: string,
  options: Array<string>,
};

type ParseResult = {
  errors: FormErrors,
  values: FormValues,
}

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const parseResult = parseFormSubmission(form);

    if (Object.values(parseResult.errors).length > 0) {
      return ctx.render(parseResult);
    }

    const { prompt, options } = parseResult.values;

    const unsaved: UnsavedPoll = {
      type: 'multiple',
      prompt,
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

export default function New(props: PageProps<ParseResult | undefined>) {
  const formState: ParseResult = props.data ?? {
    errors: {},
    values: defaultValues()
  };

  return (
    <>
      <h1 className={`h2`}>New Poll</h1>
      <form method="post">
        <TextInput
          name="prompt"
          id="prompt"
          placeholder="Doughnuts or bagels?"
          value={formState.values.prompt}
          error={formState.errors.prompt}
        >
          Poll Question
        </TextInput>
        <TextArea
          name="options"
          id="pollOptions"
          placeholder="One choice per line..."
          value={formState.values.options.join('\n')}
          error={formState.errors.options}
        >
          Poll Choices
        </TextArea>
        <BottomBar>
          <Button primary type="submit">Make Poll</Button>
        </BottomBar>
      </form>
    </>
  );
}

function defaultValues(): FormValues {
  return {
    prompt: '',
    options: []
  };
}

function parseFormSubmission(formData: FormData): ParseResult {
  const errors: FormErrors = {};

  const prompt = stringValue('prompt', formData).trim();
  if (prompt.length === 0) {
    errors.prompt = 'Question cannot be blank';
  }

  const rawOptions = stringValue('options', formData);
  const options = unique(
    rawOptions
      .split(/\r?\n/)
      .map(opt => opt.trim())
      // remove empties
      .filter(opt => !!opt)
  );

  if (options.length === 0) {
    errors.options = 'Must include at least 1 choice';
  }

  return {
    errors,
    values: {
      options,
      prompt
    }
  };
}

/**
 * Get a string value at all costs.
 */
function stringValue(name: string, formData: FormData): string {
  const value = formData.get(name);
  // Unexpected file
  if (value instanceof Blob) {
    return '';
  } else {
    return value ?? '';
  }
}

function unique<T>(values: Iterable<T>): Array<T> {
  return Array.from(new Set<T>(values));
}