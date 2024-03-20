import { PageProps } from "$fresh/server.ts";

export default function Results(props: PageProps) {
  return (
    <div>
      this is where we show the results of the poll
      <h1>You're looking at the results of ID: {props.params.id}</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
