import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '@/store/slices/authSlice.ts';
import { MESSAGE_TYPE } from '@/constants/auth.ts';
import useGetAccessToken from '@/features/auth/apis/queries/useGetAccessToken.ts';
import useGetUserInfo from '@/features/auth/apis/queries/useGetUserInfo.ts';
import { useRouter } from 'next/router';
import { JIARY_DOMAIN } from '@/constants/domain.ts';
import { useEffect, useRef, useState } from 'react';

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
    console.log('accessToken', accessToken);
    console.log('userInfo', userInfo);
    if (!accessToken?.token || !userInfo?.id) return;
    console.log('통과');
    localStorage.setItem('accessToken', accessToken.token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));
    console.log('popWindowRef', popWindowRef.current);

    popWindowRef.current?.close();
    window.removeEventListener(
      'message',
      e => messageCallback(e, popWindowRef.current),
      false,
    );
    console.log('!! test!');
    router.push('/diary');
  }, [accessToken, userInfo, dispatch]);

  return { messageCallback };
};
