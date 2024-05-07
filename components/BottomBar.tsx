import { JSX } from 'preact';
import { FooterLock } from './FooterLock.tsx';

export function BottomBar(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <FooterLock className={`c-bottom-bar`}>
      {props.children}
    </FooterLock>
  );
}
