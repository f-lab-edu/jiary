import { useDispatch } from 'react-redux';
import {
  removeAccessToken,
  removeUser,
  setAccessToken,
  setUser,
} from '@/store/slices/authSlice.ts';
import { MESSAGE_TYPE } from '@/constants/auth.ts';
import useGetAccessToken from '@/features/auth/apis/mutations/useGetAccessToken.ts';
import useLogout from '@/features/auth/apis/mutations/useLogout.ts';
import useGetUserInfo from '@/features/auth/apis/mutations/useGetUserInfo.ts';
import { useRouter } from 'next/router';

const DOMAIN_URI = process.env.NEXT_PUBLIC_DOMAIN_URI;
let popupWindow: Window | null = null;

export type OpenLoginPopup = {
  (url: string | undefined): void;
};

const openPopup = (url: string | undefined) => {
  popupWindow = window.open(
    url,
    MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE,
    'toolbar=no, width=560, height=700, top=100, left=100'
  );
};

export const useAuth = () => {
  const getAccessTokenMutation = useGetAccessToken();
  const getUserInfoMutation = useGetUserInfo();
  const logoutMutation = useLogout();
  const dispatch = useDispatch();
  const router = useRouter();

  const messageCallback = async (event: MessageEvent) => {
    if (event.origin !== DOMAIN_URI) {
      // eslint-disable-next-line no-console
      console.error('Cross-Origin Error');
      return;
    }

    const receiveData = event.data;
    if (receiveData.type !== MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE) {
      return;
    }

    const url = new URL(receiveData.params);
    const searchParams = url.searchParams;
    const { token: accessToken } = await getAccessTokenMutation.mutateAsync(
      searchParams.get('code') || ''
    );
    if (!accessToken) throw new Error('엑세스 토큰이 없습니다.');
    const userInfo = await getUserInfoMutation.mutateAsync(accessToken);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));

    popupWindow?.close();
    window.removeEventListener('message', messageCallback, false);
    router.push('/diary');
  };

  const openLoginPopup: OpenLoginPopup = (url: string | undefined) => {
    if (popupWindow === null || popupWindow.closed) {
      openPopup(url);
    } else if (window.location.href !== `${DOMAIN_URI}/auth`) {
      openPopup(url);
      popupWindow.focus();
    } else {
      popupWindow.focus();
      return;
    }

    window.addEventListener('message', messageCallback, false);
  };

  const logout = () => {
    logoutMutation.mutate(localStorage.getItem('accessToken'));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(removeUser());
    dispatch(removeAccessToken());
  };

  return { openLoginPopup, logout };
};
