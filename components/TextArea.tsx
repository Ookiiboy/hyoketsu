import { JSX } from "preact";

export type TextAreaProps = JSX.HTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function TextArea(props: TextAreaProps) {
  return (
    <div className={`c-text-area`}>
      <label className={`c-text-area__label`} for={props.id}>{props.children}</label>
      <textarea
        className={`c-text-area__textarea`}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
      />
      {!!props.error && (<span>{props.error}</span>)}
    </div>
  );
}
