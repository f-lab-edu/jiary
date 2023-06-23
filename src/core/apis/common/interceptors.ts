import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessTokenByRefreshToken } from '@/core/apis/auth.ts';
import store from '@/store/store.ts';
import { setAccessToken } from '@/store/slices/authSlice.ts';

export const onResponse = (response: AxiosResponse) => {
  return response;
};

export const onErrorResponse = async (
  error: AxiosError
): Promise<AxiosError> => {
  if (Number(error.response?.status) === 401) {
    try {
      const { token } = await getAccessTokenByRefreshToken();
      if (!token) {
        throw new Error('not found');
      }
      localStorage.setItem('accessToken', token);
      store.dispatch(setAccessToken(token));

      const config = error.config as AxiosRequestConfig;
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return await axios.request(config as AxiosRequestConfig);
    } catch (error) {
      alert('로그인이 필요합니다.');
      window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth`;
    }
  }
  return Promise.reject(error);
};
