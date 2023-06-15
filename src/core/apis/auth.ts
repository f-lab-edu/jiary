import { AxiosResponse } from 'axios';
import axios from 'axios';

interface UserInfo {
  email: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const oauthApi = axios.create({
  baseURL: 'https://www.googleapis.com',
  headers: {
    'Content-type': 'application/json',
  },
  params: {},
  timeout: 15 * 1000,
});

export const getUserInfo = async (
  accessToken: string
): Promise<AxiosResponse<UserInfo>> => {
  const response = await oauthApi.get(
    `oauth2/v2/userinfo?access_token=${accessToken}`
  );

  return response.data;
};
