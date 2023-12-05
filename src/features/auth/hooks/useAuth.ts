import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MESSAGE_TYPE } from '@/constants/auth.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';
import useGetAccessToken from '@/features/auth/apis/queries/useGetAccessToken.ts';
import useGetUserInfo from '@/features/auth/apis/queries/useGetUserInfo.ts';

import { setAccessToken, setUser } from '@/store/slices/authSlice.ts';

export const useAuth = () => {
  console.log(4);
  const [code, setCode] = useState('');
  const { data: accessToken } = useGetAccessToken(code);
  const { data: userInfo } = useGetUserInfo(accessToken?.token || '');

  const dispatch = useDispatch();
  const messageCallback = useCallback((event: MessageEvent) => {
    console.log(6);
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
    console.log(7);
    if (!accessToken?.token || !userInfo?.id) return;
    localStorage.setItem('accessToken', accessToken.token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setUser(userInfo));
    dispatch(setAccessToken(accessToken));
  }, [accessToken, userInfo, dispatch]);

  return { messageCallback, accessToken, userInfo };
};
