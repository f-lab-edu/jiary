import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { ReactNode } from 'react';

import PageHeader from '@/features/common/components/header/PageHeader.tsx';
import PageLoadingSpinner from '@/features/common/components/spinner/PageLoadingSpinner.tsx';

import * as style from '@/features/common/components/PageLayout.css.ts';

export default function PageLayout(props: { children: ReactNode }) {
  const isFetching = useIsFetching();
  const isMuatating = useIsMutating();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/png" />
        <meta name="author" content="pozafly" />
        <meta
          name="keywords"
          content="Jiary, diary, google map, web application"
        />
        <meta property="og:image" content="/home/main.png" />
        <meta property="og:site_name" content="Jiary" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
      </Head>

      <PageHeader />
      <Analytics />
      <div className={style.main}>{props.children}</div>
      {Boolean(isFetching || isMuatating) && <PageLoadingSpinner />}
    </>
  );
}
