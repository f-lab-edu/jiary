import * as style from '@/pages/auth/index.css.ts';
import { useAuth } from '@/core/hooks/auth/useAuth.ts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginSection from '@/components/auth/LoginSection.tsx';
import loginBackground from '@/static/auth/open-peeps.png';
import Image from 'next/image';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '@/store/slices/authSlice.ts';

export default function AuthPage() {
  const { openLoginPopup } = useAuth();
  const isAuth = useSelector(isAuthSelector);
  const router = useRouter();

  useEffect(() => {
    console.log('effect');
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

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
      <LoginSection openLoginPopup={openLoginPopup} />
    </div>
  );
}
