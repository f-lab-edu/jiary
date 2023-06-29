import Head from 'next/head';
import * as style from '@/styles/style-test.css.ts';
import PageLoadingSpinner from '@/features/common/components/spinner/PageLoadingSpinner.tsx';
import { useIsFetching } from '@tanstack/react-query';

export default function Home() {
  const isPageLoading = useIsFetching({ queryKey: ['auth'] });

  return (
    <>
      <Head>
        <title>홈 입니다</title>
      </Head>

      <div className={style.Main}>Home</div>
      {isPageLoading ? <PageLoadingSpinner /> : null}
    </>
  );
}
