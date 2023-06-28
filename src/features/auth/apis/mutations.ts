import { DOMAIN_URI, oauthApi } from '@/features/auth/apis/index.ts';
import axios from 'axios';
import { REQUEST_BODY_TYPE } from '@/constant/auth.ts';
import {
  AuthToken,
  LogoutResponse,
  UserInfo,
} from '@/features/auth/apis/interfaces.ts';
import { useMutation } from '@tanstack/react-query';

const getAccessToken = async (code: string): Promise<AuthToken> =>
  await axios
    .post(`${DOMAIN_URI}/api/auth`, {
      type: REQUEST_BODY_TYPE.GET_TOKEN,
      code,
    })
    .then(res => res.data);

export const getAccessTokenByRefreshToken = async (): Promise<AuthToken> =>
  await axios
    .post(`${DOMAIN_URI}/api/auth`, {
      type: REQUEST_BODY_TYPE.GET_TOKEN_BY_REFRESH_TOKEN,
      accessToken: localStorage.getItem('accessToken'),
    })
    .then(res => res.data);

const logout = async (accessToken: string | null): Promise<LogoutResponse> =>
  await axios
    .delete(`${DOMAIN_URI}/api/auth?access_token=${accessToken}`)
    .then(res => res.data);

const getUserInfo = async (accessToken: string): Promise<UserInfo> =>
  await oauthApi
    .get(`oauth2/v2/userinfo?access_token=${accessToken}`)
    .then(res => res.data);

export const useGetAccessToken = () =>
  useMutation({
    mutationFn: (code: string) => getAccessToken(code),
  });

export const useGetAccessTokenByRefreshToken = () =>
  useMutation({ mutationFn: () => getAccessTokenByRefreshToken() });

export const useLogout = () =>
  useMutation({
    mutationFn: (accessToken: string | null) => logout(accessToken),
  });

export const useGetUserInfo = () =>
  useMutation({
    mutationFn: (accessToken: string) => getUserInfo(accessToken),
  });
