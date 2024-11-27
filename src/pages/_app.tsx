import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/context/ThemeContext';
import { useRemoteRefresh } from 'next-remote-refresh/hook';

export default function App({ Component, pageProps }: AppProps) {
  useRemoteRefresh();

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
