import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.ts';
import * as style from '@/features/common/components/profile/UserProfile.css.ts';
import Image from 'next/image';

export default function UserProfile() {
  const user = useSelector((state: RootState) => state.auth.user);

  // const { logout } = useAuth();
  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <button>
      <Image
        src={user.picture}
        width={25}
        height={25}
        alt="user-image"
        className={style.userImage}
      />
      {/* <button onClick={handleLogout}>Logout</button> */}
    </button>
  );
}
