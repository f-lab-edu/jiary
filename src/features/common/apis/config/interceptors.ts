import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAccessTokenByRefreshToken } from '@/features/auth/apis/index.ts';
import store from '@/store/store.ts';
import { setAccessToken } from '@/store/slices/authSlice.ts';
import { isSSR } from '@/core/utils/objectUtils.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';

type ChangeConfigNewToken = (
  config: AxiosRequestConfig,
  token: string,
) => AxiosRequestConfig;

const changeConfigNewToken: ChangeConfigNewToken = (config, token) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const url = config.url;
  if (url?.includes('access_token=')) {
    const tokenIndex = url.indexOf('access_token=');
    if (tokenIndex > -1) {
      let urlToken = '';
      const endIndex = url.indexOf('&', tokenIndex);
      if (endIndex > -1) {
        urlToken = url.slice(tokenIndex + 13, endIndex);
      } else {
        urlToken = url.slice(tokenIndex + 13);
      }
      config.url = url.replace(urlToken, token);
    }
  }

  return config;
};

export const onRequest = (request: InternalAxiosRequestConfig) => {
  if (!isSSR) {
    request.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`;
  }
  return request;
};

export const onResponse = (response: AxiosResponse) => {
  return response;
};

export const onErrorResponse = async (
  error: AxiosError,
): Promise<AxiosError> => {
  if (Number(error.response?.status) === 401) {
    try {
      const { token } = await getAccessTokenByRefreshToken();
      if (!token) {
        throw new Error('not found');
      }
      localStorage.setItem('accessToken', token);
      store.dispatch(setAccessToken(token));

      const config = changeConfigNewToken(
        error.config as AxiosRequestConfig,
        token,
      );
      return await axios.request(config);
    } catch (error) {
      if (!isSSR) {
        alert('로그인이 필요합니다.');
        window.location.href = `${JIARY_DOMAIN}/auth`;
      }
    }
  }
  return Promise.reject(error);
};
