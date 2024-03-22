import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function RadioFieldset(props: JSX.HTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset id={props.id} className={`c-radio-fieldset`}>
      {props.children}
    </fieldset>
  );
}
