import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MESSAGE_TYPE } from '@/constants/auth.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';
import useGetAccessToken from '@/features/auth/apis/queries/useGetAccessToken.ts';
import useGetUserInfo from '@/features/auth/apis/queries/useGetUserInfo.ts';

import { setAccessToken, setUser } from '@/store/slices/authSlice.ts';

export const useAuth = () => {
  const [code, setCode] = useState('');
  const popWindowRef = useRef<Window | null>(null);
  const { data: accessToken } = useGetAccessToken(code);
  const { data: userInfo } = useGetUserInfo(accessToken?.token || '');

  const dispatch = useDispatch();
  const router = useRouter();

  const messageCallback = (event: MessageEvent, popupWindow: Window | null) => {
    if (event.origin !== JIARY_DOMAIN) {
      // eslint-disable-next-line no-console
      console.error('Cross-Origin Error');
      return;
    }
    popWindowRef.current = popupWindow;

    const receiveData = event.data;
    if (receiveData.type !== MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE) {
      return;
    }
    const code = new URL(receiveData.params).searchParams.get('code');
    setCode(code || '');
  };

  useEffect(() => {
    if (!accessToken?.token || !userInfo?.id) return;
    localStorage.setItem('accessToken', accessToken.token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));

    popWindowRef.current?.close();
    window.removeEventListener(
      'message',
      e => messageCallback(e, popWindowRef.current),
      false,
    );
    router.push('/diary');
  }, [accessToken, userInfo, dispatch, router]);

  return { messageCallback };
};
