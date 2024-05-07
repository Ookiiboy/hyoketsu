import { minutesToLive } from '../lib/expiration.ts';
import Logo from '../components/Logo.tsx';
export default function Home() {
  return (
    <>
      <a href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo />
      </a>
      <p>
        <abbr
          title={`Polls last ${minutesToLive} minutes, and then are gone forever.`}
        >
          Ephemeral voting
        </abbr>{' '}
        made easy.
      </p>
      <a href='/poll/new' className='c-button c-button--primary'>
        Make a New Poll
      </a>
    </>
  );
}
