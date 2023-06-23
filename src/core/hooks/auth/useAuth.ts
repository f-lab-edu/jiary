import { useDispatch } from 'react-redux';
import {
  getAccessToken,
  getUserInfo,
  logoutToServer,
} from '@/core/apis/auth.ts';
import {
  removeAccessToken,
  removeUser,
  setAccessToken,
  setUser,
} from '@/store/slices/authSlice.ts';
import { MESSAGE_TYPE } from '@/constant/auth.ts';

let popupWindow: Window | null = null;

const openPopup = (url: string) => {
  popupWindow = window.open(
    url,
    MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE,
    'toolbar=no, width=560, height=700, top=100, left=100'
  );
};

export const useAuth = () => {
  const dispatch = useDispatch();

  const messageCallback = async (event: MessageEvent) => {
    if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN_URI) {
      // TODO: origin error
      console.error('Cross-Origin Error');
      return;
    }

    const receiveData = event.data;
    if (receiveData.type !== MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE) {
      return;
    }

    const url = new URL(receiveData.params);
    const searchParams = url.searchParams;
    const response = await getAccessToken(searchParams.get('code') || '');

    const accessToken = response.token;
    const userInfo = await getUserInfo(accessToken);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));

    popupWindow?.close();
    window.removeEventListener('message', messageCallback, false);
  };

  const openLoginPopup: (url: string) => void = (url: string) => {
    if (popupWindow === null || popupWindow.closed) {
      openPopup(url);
    } else if (
      window.location.href !== `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth`
    ) {
      openPopup(url);
      popupWindow.focus();
    } else {
      popupWindow.focus();
      return;
    }

    window.addEventListener('message', messageCallback, false);
  };

  const logout: () => void = async () => {
    await logoutToServer(localStorage.getItem('accessToken'));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(removeUser());
    dispatch(removeAccessToken());
  };

  return { openLoginPopup, logout };
};
