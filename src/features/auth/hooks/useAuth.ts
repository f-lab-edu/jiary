import { useDispatch } from 'react-redux';
import {
  removeAccessToken,
  removeUser,
  setAccessToken,
  setUser,
} from '@/store/slices/authSlice.ts';
import { MESSAGE_TYPE } from '@/constant/auth.ts';
import {
  useGetAccessToken,
  useLogout,
  useGetUserInfo,
} from '@/features/auth/apis/mutations.ts';

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
    const userInfo = await getUserInfoMutation.mutateAsync(accessToken);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));

    popupWindow?.close();
    window.removeEventListener('message', messageCallback, false);
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
