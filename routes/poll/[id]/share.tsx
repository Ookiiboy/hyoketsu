import { Handlers, PageProps } from '$fresh/server.ts';
import { Poll } from '../../../lib/poll.ts';
import { store } from '../../../lib/db/poll-store.ts';
import { BottomBar } from '../../../components/BottomBar.tsx';
import { QrCode } from '../../../components/QrCode.tsx';
import { ShareButton } from '../../../islands/ShareButton.tsx';

export default function Share(props: PageProps<Poll>) {
  const url = new URL(props.url);
  url.pathname = `/poll/${props.data.id}/vote`;

  return (
    <>
      <h1 className={`h2`}>Share</h1>
      <QrCode>{url.toString()}</QrCode>
      <ShareButton url={url.toString()}>Copy Voting Link</ShareButton>
      <BottomBar>
        <a className='c-button c-button--primary' href={url.toString()}>
          Vote Here
        </a>
      </BottomBar>
    </>
  );
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;

    const poll = await store.getPoll(id);
    return await ctx.render(poll);
  },
};
