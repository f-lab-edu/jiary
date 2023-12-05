import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MESSAGE_TYPE } from '@/constants/auth.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';
import useGetAccessToken from '@/features/auth/apis/queries/useGetAccessToken.ts';
import useGetUserInfo from '@/features/auth/apis/queries/useGetUserInfo.ts';

import { setAccessToken, setUser } from '@/store/slices/authSlice.ts';

export const useAuth = () => {
  const [code, setCode] = useState('');
  const { data: accessToken } = useGetAccessToken(code);
  const { data: userInfo } = useGetUserInfo(accessToken?.token || '');
  const doRoutePush = useRef(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const messageCallback = useCallback((event: MessageEvent) => {
    if (event.origin !== JIARY_DOMAIN) {
      alert('로그인 오류입니다. 다시 로그인 해주세요.');
      // eslint-disable-next-line no-console
      console.error('Cross-Origin Error');
      return;
    }

    const receiveData = event.data;
    if (receiveData.type !== MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE) {
      alert('로그인 오류입니다. 다시 로그인 해주세요.');
      // eslint-disable-next-line no-console
      console.error('Post-Message Error');
      return;
    }

    const code = new URL(receiveData.params).searchParams.get('code');
    if (!code) {
      alert('로그인 오류입니다. 다시 로그인 해주세요.');
      // eslint-disable-next-line no-console
      console.error('Post-Message Error');
      return;
    }

    setCode(code);
  }, []);

  useEffect(() => {
    console.log('accessToken', accessToken);
    console.log('userInfo', userInfo);
    if (!accessToken?.token || !userInfo?.id) return;
    if (doRoutePush.current) return;
    localStorage.setItem('accessToken', accessToken.token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));

    console.log('push 일어남!!');
    router.push('/diary');
    doRoutePush.current = true;
  }, [accessToken, userInfo, dispatch, router]);

  return { messageCallback };
};
