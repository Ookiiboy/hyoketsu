import { defineConfig } from "$fresh/server.ts";
import { deleteExpiredPolls } from './lib/expiration/delete-expired-polls.ts';

Deno.cron('Delete expired polls', {
  minute: {
    every: 1
  }
}, () => {
  deleteExpiredPolls();
});

export default defineConfig({});
