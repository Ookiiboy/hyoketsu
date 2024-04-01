import { JSX } from "preact";
import { FormError } from "./FormError.tsx";

export type TextInputProps = JSX.HTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function TextInput(props: TextInputProps) {
  const errorId = props.error ? props.id + '-error' : undefined;
  const value = props.value || undefined;

  return (
    <div className={`c-text-input`}>
      <label className={`c-text-input__label`} for={props.id}>{props.children}</label>
      <input
        className={`c-text-input__input`}
        placeholder={props.placeholder}
        type="text"
        name={props.name}
        id={props.id}
        value={value}
        aria-describedby={errorId}
      />
      {props.error && <FormError id={errorId || ''}>{props.error}</FormError>}
    </div>
  );
}
