import axios from 'axios';
import {
  onErrorResponse,
  onResponse,
} from '@/features/common/apis/interceptors.ts';
import {
  AuthToken,
  LogoutResponse,
  UserInfo,
  GoogleLoginUrl,
} from '@/features/auth/apis/interfaces.ts';
import { REQUEST_BODY_TYPE } from '@/constants/auth.ts';
import { jiaryApi } from '@/features/common/apis/jiaryInstance.ts';

export const oauthApi = axios.create({
  baseURL: 'https://www.googleapis.com',
  headers: { 'Content-type': 'application/json' },
  params: {},
  timeout: 15 * 1000,
});

setTimeout(() => {
  oauthApi.interceptors.response.use(onResponse, onErrorResponse);
});

export const DOMAIN_URI = process.env.NEXT_PUBLIC_DOMAIN_URI;
export const AUTH_KEY = 'AUTH';

export const getAuthCode = async (): Promise<GoogleLoginUrl> =>
  await jiaryApi.get(`${DOMAIN_URI}/api/auth`).then(res => res.data);

export const getAccessToken = async (code: string): Promise<AuthToken> =>
  await jiaryApi
    .post(`${DOMAIN_URI}/api/auth`, {
      type: REQUEST_BODY_TYPE.GET_TOKEN,
      code,
    })
    .then(res => res.data);

export const getAccessTokenByRefreshToken = async (): Promise<AuthToken> =>
  await jiaryApi
    .post(`${DOMAIN_URI}/api/auth`, {
      type: REQUEST_BODY_TYPE.GET_TOKEN_BY_REFRESH_TOKEN,
      accessToken: localStorage.getItem('accessToken'),
    })
    .then(res => res.data);

export const logout = async (
  accessToken: string | null
): Promise<LogoutResponse> =>
  await jiaryApi
    .delete(`${DOMAIN_URI}/api/auth`, { params: { access_token: accessToken } })
    .then(res => res.data);

export const getUserInfo = async (accessToken: string): Promise<UserInfo> =>
  await oauthApi
    .get(`oauth2/v2/userinfo`, { params: { access_token: accessToken } })
    .then(res => res.data);
