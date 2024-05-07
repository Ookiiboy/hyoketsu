import { JSX } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

export function FooterLock(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={`o-footer-lock ${props.className}`}>
      {props.children}
    </section>
  );
}
