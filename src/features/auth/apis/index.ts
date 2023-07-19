import {
  AuthToken,
  LogoutResponse,
  UserInfo,
  GoogleLoginUrl,
} from '@/features/auth/apis/interfaces.ts';
import { REQUEST_BODY_TYPE } from '@/constants/auth.ts';
import jiaryApi from '@/features/common/apis/jiaryInstance.ts';
import oauthApi from '@/features/common/apis/oauthInstance.ts';

export const getAuthCode = async (): Promise<GoogleLoginUrl> =>
  await jiaryApi.get('').then(res => res.data);

export const getAccessToken = async (code: string): Promise<AuthToken> =>
  await jiaryApi
    .post('', {
      type: REQUEST_BODY_TYPE.GET_TOKEN,
      code,
    })
    .then(res => res.data);

export const getAccessTokenByRefreshToken = async (): Promise<AuthToken> =>
  await jiaryApi
    .post('', {
      type: REQUEST_BODY_TYPE.GET_TOKEN_BY_REFRESH_TOKEN,
      accessToken: localStorage.getItem('accessToken'),
    })
    .then(res => res.data);

export const logout = async (
  accessToken: string | null
): Promise<LogoutResponse> =>
  await jiaryApi
    .delete('', { params: { access_token: accessToken } })
    .then(res => res.data);

export const getUserInfo = async (accessToken: string): Promise<UserInfo> =>
  await oauthApi
    .get(`oauth2/v2/userinfo`, { params: { access_token: accessToken } })
    .then(res => res.data);
