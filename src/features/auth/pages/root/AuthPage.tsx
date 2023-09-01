import Image from 'next/image';
import LoginSection from '@/features/auth/components/LoginSection/LoginSection.tsx';
import * as style from '@/features/auth/pages/root/AuthPage.css.ts';
import Head from 'next/head';

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>Jiary 로그인 페이지</title>
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
