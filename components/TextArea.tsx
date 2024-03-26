import { JSX } from "preact";

export function TextArea(props: JSX.HTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={`c-text-area`}>
      <label className={`c-text-area__label`} for={props.id}>{props.children}</label>
      <textarea className={`c-text-area__textarea`} name={props.name} id={props.id} placeholder={props.placeholder}/>
    </div>
  );
}
