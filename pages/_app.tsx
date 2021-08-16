import { AppProps } from 'next/dist/shared/lib/router/router';
import '../src/styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
