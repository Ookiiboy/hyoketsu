import { asset } from '$fresh/runtime.ts';
import { type PageProps } from '$fresh/server.ts';
import { Container } from '../components/Container.tsx';
import { minutesToLive } from '../lib/expiration.ts';

export default function App({ Component }: PageProps) {
  const env = Deno.env.get('ENV');
  const isDev = env === 'dev';
  return (
    <html lang='en'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content={`Polls last ${minutesToLive} minutes, and then are gone forever.`}
        />
        <title>Hyōketsu 票決 - Ephemeral Voting</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100..900&display=swap'
          rel='stylesheet'
        >
        </link>
        <link rel='stylesheet' href={asset('/styles.css')} />
      </head>
      <body>
        {isDev && <div className={`c-env`} data-env={env} />}
        <Container>
          <Component />
        </Container>
      </body>
    </html>
  );
}
