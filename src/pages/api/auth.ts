import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import {
  JSONFile,
  checkSameToken,
  readJSONFile,
  writeFile,
} from '@/serverUtils/authUtils.ts';
import { setCookie } from '@/serverUtils/cookieUtils.ts';

interface GoogleUrl {
  location: string;
}
interface Login {
  token: string;
}
interface Response {
  message: string;
}

export const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth/end-popup`
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'openid',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive',
];

const authorizationUrl: string = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

let hasGetTokenRequest = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoogleUrl | Login | Response | AxiosError>
) {
  if (req.method === 'GET') {
    res.status(200).json({ location: authorizationUrl });
  } else if (req.method === 'POST') {
    const body = req.body;

    switch (body.type) {
      case 'GET_TOKEN': {
        if (hasGetTokenRequest) {
          res.status(429).end();
          hasGetTokenRequest = false;
          return;
        }
        hasGetTokenRequest = true;

        const { tokens } = await oauth2Client.getToken(body.code);

        oauth2Client.setCredentials(tokens);
        writeFile(checkSameToken(tokens));

        setCookie(res, 'authorization', tokens.access_token, {
          httpOnly: true,
          sameSite: process.env.NEXT_PUBLIC_MODE !== 'development',
          domain: process.env.NEXT_PUBLIC_DOMAIN_URI,
          path: '/',
          maxAge: 60 * 60 * 24 * 20, // 20일
        });
        res.status(200).json({ token: tokens.access_token || '' });
        break;
      }

      case 'GET_TOKEN_BY_REFRESH_TOKEN': {
        if (!Object.hasOwn(req.cookies, 'authorization')) {
          res.status(404).json({
            message: 'not found',
            isAxiosError: true,
            location: 'server',
            name: 'AxiosError',
          });
        }

        const accessToken = req.cookies.authorization;
        const jsonTokens: JSONFile[] = readJSONFile();
        const targetIndex = jsonTokens.findIndex(
          token => token.access_token === accessToken
        );

        if (targetIndex < 0) {
          res.status(404).json({
            message: 'not found',
            isAxiosError: true,
            location: 'server',
            name: 'AxiosError',
          });
          return;
        }

        const { tokens } = await oauth2Client.refreshToken(
          jsonTokens[targetIndex].refresh_token
        );

        jsonTokens[targetIndex] = {
          ...jsonTokens[targetIndex],
          access_token: tokens.access_token || '',
        };

        writeFile(jsonTokens);

        oauth2Client.setCredentials(tokens);
        res.status(200).json({ token: tokens.access_token || '' });
        break;
      }

      default:
        res.status(404).end();
        break;
    }
  } else if (req.method === 'DELETE') {
    const { access_token } = req.query;

    const jsonTokens = readJSONFile();
    const index = jsonTokens.findIndex(v => v.access_token === access_token);
    if (index > -1) {
      jsonTokens.splice(index, 1);
    }
    writeFile(jsonTokens);

    res.status(200).json({ message: 'success' });
  }
}
