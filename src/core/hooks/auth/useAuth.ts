import { useDispatch } from 'react-redux';
import { getUserInfo } from '@/core/apis/auth.ts';
import { setAccessToken, setUser } from '@/store/slices/authSlice.ts';
import { useState } from 'react';

let popupWindow: Window | null = null;

const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const redirectUri = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth/end-popup`;
const scope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'openid',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive.file',
].join(' ');
const oAuthURL = `${oauth2Endpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;

const openPopup = () => {
  popupWindow = window.open(
    oAuthURL,
    'jiarySignin',
    'toolbar=no, width=575, height=700, top=100, left=100'
  );
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isEndAuth, setEndAuth] = useState(false);

  const messageCallback = async (event: MessageEvent) => {
    if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN_URI) {
      // TODO: origin error
      console.error('Cross-Origin Error');
      return;
    }
    const receiveData = event.data;
    if (receiveData.type !== 'jiarySignin') {
      return;
    }

    const url = new URL(receiveData.params);
    const hash = url.hash;
    if (hash) {
      const accessToken = hash.split('=')[1].split('&')[0];
      const userInfo = await getUserInfo(accessToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userInfo));
      dispatch(setUser(userInfo));
      dispatch(setAccessToken(accessToken));
    }
    // TODO: not hash error

    popupWindow?.close();
    window.removeEventListener('message', messageCallback, false);
    setEndAuth(true);
  };

  const openAuthPopup = () => {
    if (popupWindow === null || popupWindow.closed) {
      openPopup();
    } else if (
      window.location.href !== `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth`
    ) {
      openPopup();
      popupWindow.focus();
    } else {
      popupWindow.focus();
    }

    window.addEventListener('message', messageCallback, false);
  };

  return [isEndAuth, openAuthPopup] as const;
};
