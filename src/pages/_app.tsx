import { ReactElement, ReactNode, useState } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';

import { Provider as ReduxProvider } from 'react-redux';
import store from '../store/store.ts';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from '@/components/common/AppLayout.tsx';

import '@/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
