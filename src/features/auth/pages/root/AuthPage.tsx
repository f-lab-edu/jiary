import Image from 'next/image';
import LoginSection from '@/features/auth/components/LoginSection/LoginSection.tsx';
import loginBackground from '@/static/auth/open-peeps.png';
import * as style from '@/features/auth/pages/root/AuthPage.css.ts';
import Head from 'next/head';
import { OpenLoginPopup } from '@/features/auth/hooks/useAuth.ts';

type Props = {
  openLoginPopup: OpenLoginPopup;
};

export default function AuthPage({ openLoginPopup }: Props) {
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