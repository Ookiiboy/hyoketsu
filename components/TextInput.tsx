import { JSX } from "preact";

export type TextInputProps = JSX.HTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function TextInput(props: TextInputProps) {
  return (
    <div className={`c-text-input`}>
      <label className={`c-text-input__label`} for={props.id}>{props.children}</label>
      <input
        className={`c-text-input__input`}
        placeholder={props.placeholder}
        type="text"
        name={props.name}
        id={props.id}
        value={props.value}
      />
      {!!props.error && (<span>{props.error}</span>)}
    </div>
  );
}
