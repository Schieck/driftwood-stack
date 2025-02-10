import RootLayout from '@/components/layout';
import '@/styles/globals.css'

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RootLayout>
    <Component {...pageProps} />
  </RootLayout>
);

export default MyApp;