import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import UserProfile from '@/features/common/components/profile/UserProfile.tsx';

import { isLoggedInSelector } from '@/store/slices/authSlice.ts';

import * as style from '@/features/common/components/header/PageHeader.css.ts';

export default function PageHeader() {
  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <header className={style.header}>
      <div className={style.navContainer}>
        <nav className={style.nav}>
          <ul className={style.ul}>
            <li className="jiary-logo">
              <Link href="/" className={style.imageLogoWrapper}>
                <Image
                  src="/logo/jiary-logo.svg"
                  width={30}
                  height={30}
                  alt="jiary-logo"
                />
              </Link>
            </li>
            <li className={style.li}>
              <Link href="/diary" className={style.a}>
                Diary
              </Link>
            </li>
          </ul>

          <ul className={style.ul}>
            <li className={style.li}>
              <Link
                href="https://github.com/pozafly/jiary"
                target="_blank"
                className={style.a}
              >
                <Image
                  src="/logo/github-logo.svg"
                  width={30}
                  height={30}
                  alt="github-logo"
                />
              </Link>
            </li>

            {isLoggedIn ? (
              <li className={style.li}>
                <UserProfile />
              </li>
            ) : (
              <li className={style.li}>
                <Link href="/auth" className={style.a}>
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
