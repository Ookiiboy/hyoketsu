import { PageProps } from "$fresh/server.ts";
import { BottomBar } from "../../../components/BottomBar.tsx";

export default function Share(props: PageProps) {
  const url = new URL(props.url);
  url.pathname = `/poll/${props.params.id}/vote`

  return (
    <div>
      this is where we generate the QR code to share, and give you a button to
      copy the link
      <h1>You're looking at the share page of ID: {props.params.id}</h1>
      <BottomBar>
        <a className="c-button c-button--primary" href={url.toString()}>Vote Here</a>
      </BottomBar>
      {/*<pre>{JSON.stringify(props, null, 2)}</pre>*/}
    </div>
  );
}
