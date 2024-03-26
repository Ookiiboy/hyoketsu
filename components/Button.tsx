import { JSX } from "preact";
interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
};
export function Button(props: ButtonProps)  {
  return (
    <button
      {...props}
      className={`c-button ${props.primary === true ? `c-button--primary` : ``}`}
    />
  );
}
