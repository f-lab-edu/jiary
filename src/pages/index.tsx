import Head from 'next/head';
import * as style from '@/styles/style-test.css.ts';

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 입니다</title>
      </Head>

      <div className={style.Main}>Home</div>
    </>
  );
}
