import * as style from '@/features/home/pages/Home.css.ts';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 입니다</title>
      </Head>
      <div> </div>

      <Image
        src="/background/open-peeps.png"
        alt="Auth Background Image"
        className={style.backgroundImage}
        fill
        sizes="100vw"
      />
      <div className={style.backgroundAfter}></div>
    </>
  );
}
