import { Head } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx"

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <a href="/" style={{textDecoration: "none", color: "inherit"}}>
        <Logo/>
      </a>
      <h2 class="h3">Oh No! <b>404!</b></h2>
      <br/>
      <p>We can't find anything at this address. If you're looking for a poll, it might have expired.</p>
      <a href="/poll/new" className="c-button c-button--primary">Make a New Poll</a>

    </>
  );
}
