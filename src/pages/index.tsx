import Head from 'next/head';
import { getAccessTokenByRefreshToken } from '@/features/auth/apis/index.ts';

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 입니다</title>
      </Head>
      <button onClick={getAccessTokenByRefreshToken}>get refresh token!</button>
      <div>Home</div>

      <div style={{ color: 'red' }}>preview sucess!</div>
    </>
  );
}
