import { RouteContext } from "$fresh/server.ts";

export default function Share() {
  return (
    <div>
      This is where we create a new poll. after we submit the poll form, we
      redirect to, poll/[id]/share, the server should return the new polls id
    </div>
  );
}
