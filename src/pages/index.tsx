import Head from 'next/head';
import Counter from '../components/Counter.tsx';
import * as style from '../styles/style-test.css.ts';
import QueryTest from '../components/QueryTest.tsx';
import PageLoadingSpinner from '@/components/common/PageLoadingSpinner.tsx';
import { ReducerType } from '@/store/rootReducer.ts';
import { useSelector } from 'react-redux';

export default function Home() {
  const isPageLoading = useSelector(
    (state: ReducerType) => state.ui.isPageLoading
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <div className={style.Main}>Home</div>
        <Counter />
        <br />
        <QueryTest />
        <br />
        {isPageLoading ? <PageLoadingSpinner /> : null}
      </main>
    </>
  );
}
