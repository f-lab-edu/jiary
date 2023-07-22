import Head from 'next/head';
import * as style from '@/styles/style-test.css.ts';
import { getAccessTokenByRefreshToken } from '@/features/auth/apis/index.ts';

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 입니다</title>
      </Head>
      <button onClick={getAccessTokenByRefreshToken}>get refresh token!</button>
      <div className={style.Main}>Home</div>
    </>
  );
}
