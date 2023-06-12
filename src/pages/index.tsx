import Head from 'next/head';
import Counter from '../components/Counter.tsx';
import * as style from '../styles/style-test.css.ts';
import QueryTest from '../components/QueryTest.tsx';

export default function Home() {
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
      </main>
    </>
  );
}
