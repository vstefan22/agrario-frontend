import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import dynamic from 'next/dynamic';

const BrowserRouterWrapper = dynamic(() => import('../components/BrowserRouterWrapper'), { ssr: false });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouterWrapper>
        <Component {...pageProps} />
      </BrowserRouterWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
