import axios from 'axios';
import { REQUEST_BODY_TYPE } from '@/constant/auth.ts';
import {
  onErrorResponse,
  onResponse,
} from '@/core/apis/common/interceptors.ts';

export interface UserInfo {
  email: string;
  id: string;
  name?: string;
  given_name?: string;
  locale?: string;
  picture?: string;
  verified_email?: boolean;
}

const oauthApi = axios.create({
  baseURL: 'https://www.googleapis.com',
  headers: {
    'Content-type': 'application/json',
  },
  params: {},
  timeout: 15 * 1000,
});

setTimeout(() => {
  oauthApi.interceptors.response.use(onResponse, onErrorResponse);
});

export const getAuthCode = async (): Promise<{ location: string }> =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/auth`)
    .then(res => res.data);

export const getAccessToken = async (
  code: string
): Promise<{ token: string }> =>
  await axios
    .post(`${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/auth`, {
      type: REQUEST_BODY_TYPE.GET_TOKEN,
      code,
    })
    .then(res => res.data);

export const getAccessTokenByRefreshToken = async (): Promise<{
  token: string;
}> =>
  await axios
    .post(`${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/auth`, {
      type: REQUEST_BODY_TYPE.GET_TOKEN_BY_REFRESH_TOKEN,
      accessToken: localStorage.getItem('accessToken'),
    })
    .then(res => res.data);

export const logoutToServer = async (
  accessToken: string | null
): Promise<{ message: string }> =>
  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/auth?access_token=${accessToken}`
    )
    .then(res => res.data);

export const getUserInfo = async (accessToken: string): Promise<UserInfo> =>
  await oauthApi
    .get(`oauth2/v2/userinfo?access_token=${accessToken}`)
    .then(res => res.data);
