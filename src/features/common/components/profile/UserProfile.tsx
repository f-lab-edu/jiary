import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.ts';
import * as style from '@/features/common/components/profile/UserProfile.css.ts';
import Image from 'next/image';
import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import { useLogout } from '@/features/auth/hooks/useLogout.ts';

export default function UserProfile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { logout } = useLogout();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Image
          src={user.picture}
          width={30}
          height={30}
          alt="user-image"
          className={style.userImage}
        />
      </Dropdown.Trigger>
      <Dropdown.List width="fit-content" offset={8}>
        <Dropdown.SubmitButton onClick={logout} className={style.logoutButton}>
          로그아웃
        </Dropdown.SubmitButton>
      </Dropdown.List>
    </Dropdown>
  );
}
