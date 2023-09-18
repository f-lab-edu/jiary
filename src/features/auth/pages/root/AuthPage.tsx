import Head from 'next/head';
import Image from 'next/image';

import LoginSection from '@/features/auth/components/LoginSection/LoginSection.tsx';

import * as style from '@/features/auth/pages/root/AuthPage.css.ts';

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>로그인 페이지 - Jiary</title>
        <meta name="description" content="Jiary에 로그인 해보세요!" />
        <meta property="og:title" content="로그인 페이지 - Jiary" />
        <meta property="og:description" content="Jiary에 로그인 해보세요!" />
      </Head>

      <Image
        src="/background/open-peeps.png"
        alt="Auth Background Image"
        className={style.backgroundImage}
        fill
        sizes="100vw"
      />
      <div className={style.backgroundAfter}></div>
      <div className={style.loginSectionContainer}>
        <LoginSection />
      </div>
    </>
  );
}
