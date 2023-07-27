import Image from 'next/image';
import LoginSection from '@/features/auth/components/LoginSection/LoginSection.tsx';
import loginBackground from '@/static/auth/open-peeps.png';
import * as style from '@/features/auth/pages/root/AuthPage.css.ts';
import Head from 'next/head';

export default function AuthPage() {
  return (
    <div className={style.container}>
      <Head>
        <title>Jiary 로그인 페이지</title>
      </Head>

      <Image
        src={loginBackground}
        alt="Auth Background Image"
        className={style.backgroundImage}
        placeholder="blur"
      />
      <div className={style.backgroundAfter}></div>
      <LoginSection />
    </div>
  );
}
