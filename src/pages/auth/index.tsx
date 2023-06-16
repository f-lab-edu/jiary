import * as style from '@/pages/auth/index.css.ts';
import { useAuth } from '@/core/hooks/auth/useAuth.ts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginSection from '@/components/auth/LoginSection.tsx';
import loginBackground from '@/static/auth/open-peeps.png';
import Image from 'next/image';
import Head from 'next/head';

export default function AuthPage() {
  const [isEndAuth, openAuthPopup] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isEndAuth) {
      router.push('/');
    }
  }, [isEndAuth, router]);

  return (
    <div className={style.root}>
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
      <LoginSection openAuthPopup={openAuthPopup} />
    </div>
  );
}
