import { JSX } from "preact";

export function TextInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`c-text-input`}>
      <label className={`c-text-input__label`} for={props.id}>{props.children}</label>
      <input className={`c-text-input__input`}placeholder={props.placeholder} type="text" name={props.name} id={props.id} />
    </div>
  );
}
