import { useEffect } from 'react';
import { getUserInfo } from '@/core/apis/auth.ts';

export default function AuthPage() {
  const oauthSignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth`;
    const scope = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid',
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive.file',
    ].join(' ');

    const oAuthURL = `${oauth2Endpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.assign(oAuthURL);
  };

  const afterGetUserToken = async () => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      const accessToken = hash.split('=')[1].split('&')[0];
      const userInfo = await getUserInfo(accessToken);

      // TODO: user info 처리
      // TODO: accessToken 처리
      // redux에 올리기
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userInfo));
    }
  };

  useEffect(() => {
    afterGetUserToken();
  }, []);

  return (
    <>
      <div>AuthPage</div>
      <br />
      <button onClick={oauthSignIn}>login</button>
    </>
  );
}
