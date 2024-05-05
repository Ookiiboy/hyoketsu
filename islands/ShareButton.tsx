import { Button, ButtonProps } from "../components/Button.tsx";

type ShareButtonProps = ButtonProps & {
  url: string;
}

export function ShareButton(props: ShareButtonProps) {
  const {
    url,
    onClick,
    ...buttonProps
  } = props;

  const copyUrl = () => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Copied!'));
  };

  return (
    <Button {...buttonProps} onClick={copyUrl}></Button>
  );
}
