import Image from 'next/image';

import useGetAuthCode from '@/features/auth/apis/queries/useGetAuthCode.ts';
import { useLoginPopup } from '@/features/auth/hooks/useLoginPopup.ts';

import * as style from '@/features/auth/components/LoginSection/LoginSection.css.ts';

export default function LoginSection() {
  const { data } = useGetAuthCode();
  const { openLoginPopup } = useLoginPopup();

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image
          src="/logo/jiary-logo.svg"
          width={60}
          height={60}
          alt="Picture of the logo"
        />
      </div>

      <ul className={style.ul}>
        <p className={style.emphasis}>
          <span>Jiary 서비스를 사용하기 위해서</span>
          <span>Google Login이 필요합니다.</span>
        </p>
        <br />
        <p>아래와 같은 권한이 필요합니다.</p>
        <br />
        <li className={style.li}>
          저장한 다이어리 정보를 얻기 위한 Google Drive 권한
        </li>
        <li className={style.li}>
          다이어리를 쓰고, 저장하기 위한 Google Docs 권한
        </li>
      </ul>

      <p className={`${style.subText} ${style.description}`}>
        Jiary 서비스는 사용자의 정보를 수집하지 않습니다. 모든 정보는 로그인한
        계정의 Google Drive 저장소를 사용합니다.
      </p>

      <p className={`${style.ul} ${style.description}`}>
        동의하시면 아래의 Google Login 버튼을 클릭해서 로그인 해주세요.
      </p>

      <div className={style.buttonWrapper}>
        <button
          onClick={() => openLoginPopup(data?.location)}
          className={style.loginButton}
        >
          <Image
            src="/logo/google_signin.png"
            width={30}
            height={30}
            alt="Google Logo"
            className={style.googleLogo}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
