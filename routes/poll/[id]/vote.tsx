import { PageProps } from "$fresh/server.ts";

export default function Vote(props: PageProps) {
  return (
    <div>
      this is where we vote on a poll of a given id
      <h1>You're looking to vote on ID: {props.params.id}</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
