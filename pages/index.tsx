import Blog from './Blog';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Blog App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Blog />
      </main>
    </div>
  );
}
