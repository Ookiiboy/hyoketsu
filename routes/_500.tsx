import { PageProps } from "$fresh/server.ts";

export default function Error500Page(props: PageProps) {
  // const { error } = props;

  return <p>500 internal error</p>;
}
