import type { Signal } from "@preact/signals";
import { Button, ButtonProps } from "../components/Button.tsx";

type ShareButtonProps = ButtonProps & {
  url: URL;
}

export function ShareButton(props: ShareButtonProps) {
  const {
    url,
    onClick,
    ...buttonProps
  } = props;

  const copyUrl = () => {
    navigator.clipboard.writeText(url.toString());
    alert('Copied!');
  };

  return (
    <Button {...buttonProps} onClick={copyUrl}></Button>
  );
}
