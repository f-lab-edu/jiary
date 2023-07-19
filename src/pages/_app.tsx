import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';

import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store/store.ts';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import bootApp from '@/core/config/boostApp.ts';
import PageLayout from '@/features/common/components/PageLayout.tsx';

import '@/styles/globals.css.ts';
import '@/features/diaryList/components/DiaryEditor/lexical.css';
import { isSSR } from '@/core/utils/objectUtils.ts';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? (page => <PageLayout>{page}</PageLayout>);
  const [queryClient] = useState(new QueryClient());

  useEffect(() => {
    !isSSR && bootApp();
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
