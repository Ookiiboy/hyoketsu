import { JSX } from "preact";
import { FormError } from "./FormError.tsx";

export type TextAreaProps = JSX.HTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function TextArea(props: TextAreaProps) {
  const errorId = props.error ? props.id + '-error' : undefined;
  const value = props.value || undefined;

  return (
    <div className={`c-text-area`}>
      <label className={`c-text-area__label`} for={props.id}>{props.children}</label>
      <textarea
        className={`c-text-area__textarea`}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={value}
        aria-describedby={errorId}
      />
      {props.error && <FormError id={errorId || ''}>{props.error}</FormError>}
    </div>
  );
}
