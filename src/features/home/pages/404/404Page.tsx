import localFont from 'next/font/local';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import * as style from '@/features/home/pages/404/404Page.css.ts';

const DOS_VGA = localFont({
  src: '../../../../../public/fonts/DOS-VGA-437-Win.ttf',
});

export default function Page404() {
  const router = useRouter();
  const moveHome = useCallback(() => router.push('/'), [router]);

  useEffect(() => {
    document.addEventListener('keyup', () => moveHome());
    return document.removeEventListener('keyup', () => moveHome());
  }, [moveHome]);

  return (
    <>
      <Head>
        <title>Not Found - Jiary</title>
        <meta name="description" content="알 수 없는 페이지" />
        <meta property="og:title" content="Not Found - Jiary" />
        <meta property="og:description" content="Not Found Page" />
      </Head>

      <div className={DOS_VGA.className}>
        <div className={style.container}>
          <div className={style.notfound}>
            <div className={style.centered}>
              <span className={style.inverted}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              &nbsp;
            </div>
            <div className={style.centered}>
              <span className={style.inverted}>
                &nbsp;4&nbsp;0&nbsp;4&nbsp;
              </span>
              <span className={style.shadow}>&nbsp;</span>
            </div>
            <div className={style.centered}>
              <span className={style.inverted}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className={style.shadow}>&nbsp;</span>
            </div>
            <div className={style.centered}>
              &nbsp;
              <span className={style.shadow}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <div className={style.row}>&nbsp;</div>
            <div className={style.row}>
              A fatal exception 404 has occurred at C0DE:ABAD1DEA in 0xC0DEBA5E.
            </div>
            <div className={style.row}>
              The current request will be terminated.
            </div>
            <div className={style.row}>&nbsp;</div>
            <div className={style.row}>
              * Press any key to return to the previous page.
            </div>
            <div className={style.row}>
              * Press CTRL+ALT+DEL to restart your computer. You will
            </div>
            <div className={style.row}>
              &nbsp;&nbsp;lose any unsaved information in all applications.
            </div>
            <div className={style.row}>&nbsp;</div>
            <div className="centered">
              Press any key to continue...
              <span className={style.blink}>&#9608;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
