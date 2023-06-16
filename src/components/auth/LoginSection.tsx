import Image from 'next/image';
import jiaryLogo from '@/static/jiary-logo.svg';
import * as style from './LoginSection.css.ts';

export default function LoginSection({
  openAuthPopup,
}: {
  openAuthPopup: () => void;
}) {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image
          src={jiaryLogo}
          width={60}
          height={60}
          alt="Picture of the logo"
        />
      </div>

      <ul className={style.ul}>
        <p className={style.emphasis}>
          Jiary 서비스를 사용하기 위해서 Google Login이 필요합니다.
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

      <p className={style.ul}>
        동의하시면 아래의 Google Login 버튼을
        <br /> 클릭해서 로그인 해주세요.
      </p>

      <div className={style.buttonWrapper}>
        <button onClick={openAuthPopup} className={style.loginButton}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
