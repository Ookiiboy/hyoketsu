import { JSX } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

export function RadioButton(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`c-radio-button`}>
      <input
        className={`c-radio-button__input`}
        type='radio'
        value={props.value}
        name={props.name}
        key={props.key}
      />
      <span className={`c-radio-button__text`}>{props.children}</span>
    </label>
  );
}
