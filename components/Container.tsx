import { JSX } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

export function Container(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={`c-container`}>
      {props.children}
    </section>
  );
}
