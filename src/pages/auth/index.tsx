import * as style from '@/pages/auth/index.css.ts';
import { useAuth } from '@/features/auth/hooks/useAuth';
import LoginSection from '@/features/auth/components/LoginSection.tsx';
import loginBackground from '@/static/auth/open-peeps.png';
import Image from 'next/image';
import Head from 'next/head';

export default function AuthPage() {
  const { openLoginPopup } = useAuth();

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
      <LoginSection openLoginPopup={openLoginPopup} />
    </div>
  );
}
