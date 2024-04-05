import { minutesToLive } from "../lib/expiration/time-to-live.ts";

const Check = () => <span style={{color: "var(--primary-accent-color)"}}>✔</span>

export default function Home() {
  return (
    <>
      <h1 className={`h2`}>Hyōketsu <Check/><br/><b className={`h1`}>票決</b></h1>
      <p><abbr title={`Polls last ${minutesToLive} minutes, and then are gone forever.`}>Ephemeral voting</abbr> made easy.</p>
      <a href="/poll/new" className="c-button c-button--primary">Make a New Poll</a>
    </>
  );
}
