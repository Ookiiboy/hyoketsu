import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";

export default function Error500Page(props: PageProps) {
  // const { error } = props;

  return (
    <>
      <Head>
        <title>500 - Server Error</title>
      </Head>
      <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo />
      </a>
      <h2 class="h3">
        Oof! <b>500!</b>
      </h2>
      <br />
      <p>
        There was some error on the server. Not sure why. While you're here
        though, why not click that button?
      </p>
      <a href="/poll/new" className="c-button c-button--primary">
        Make a New Poll
      </a>
    </>
  );
}
