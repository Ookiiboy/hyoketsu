import { PageProps } from "$fresh/server.ts";
import { BottomBar } from "../../../components/BottomBar.tsx";
import { QrCode } from "../../../components/QrCode.tsx";
import { ShareButton } from "../../../islands/ShareButton.tsx";

export default function Share(props: PageProps) {
  const url = new URL(props.url);
  url.pathname = `/poll/${props.params.id}/vote`

  return (
    <div>
      <h1>Share</h1>
      <div>
        <QrCode>{url.toString()}</QrCode>
        <ShareButton url={url}>Copy Voting Link</ShareButton>
      </div>
      <BottomBar>
        <a className="c-button c-button--primary" href={url.toString()}>Vote Here</a>
      </BottomBar>
    </div>
  );
}
