// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx';
import * as $_500 from './routes/_500.tsx';
import * as $_app from './routes/_app.tsx';
import * as $_middleware from './routes/_middleware.ts';
import * as $api_middleware from './routes/api/_middleware.ts';
import * as $api_poll_id_ from './routes/api/poll/[id].ts';
import * as $index from './routes/index.tsx';
import * as $poll_id_index from './routes/poll/[id]/index.tsx';
import * as $poll_id_results from './routes/poll/[id]/results.tsx';
import * as $poll_id_share from './routes/poll/[id]/share.tsx';
import * as $poll_new from './routes/poll/new.tsx';
import * as $AutoRefreshingBarGraph from './islands/AutoRefreshingBarGraph.tsx';
import * as $ShareButton from './islands/ShareButton.tsx';
import type { Manifest } from '$fresh/server.ts';

const manifest = {
  routes: {
    './routes/_404.tsx': $_404,
    './routes/_500.tsx': $_500,
    './routes/_app.tsx': $_app,
    './routes/_middleware.ts': $_middleware,
    './routes/api/_middleware.ts': $api_middleware,
    './routes/api/poll/[id].ts': $api_poll_id_,
    './routes/index.tsx': $index,
    './routes/poll/[id]/index.tsx': $poll_id_index,
    './routes/poll/[id]/results.tsx': $poll_id_results,
    './routes/poll/[id]/share.tsx': $poll_id_share,
    './routes/poll/new.tsx': $poll_new,
  },
  islands: {
    './islands/AutoRefreshingBarGraph.tsx': $AutoRefreshingBarGraph,
    './islands/ShareButton.tsx': $ShareButton,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
