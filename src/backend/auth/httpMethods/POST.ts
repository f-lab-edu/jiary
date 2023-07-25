import { GoogleUrl, JSONFile, Login } from '@/backend/auth/interfaces.ts';
import { oauth2Client } from '@/backend/utils/authUtils.ts';
import { setCookie } from '@/backend/utils/cookieUtils.ts';
import {
  checkSameToken,
  readJSONFile,
  writeFile,
} from '@/backend/utils/fileUtils.ts';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

let hasGetTokenRequest = false;

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<GoogleUrl | Login | Response | AxiosError>
) {
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

      setCookie(res, 'Authorization', tokens.access_token, {
        httpOnly: true,
        sameSite: process.env.NEXT_PUBLIC_MODE !== 'development',
        domain:
          process.env.NEXT_PUBLIC_MODE !== 'development'
            ? process.env.NEXT_PUBLIC_DOMAIN_URI
            : '',
        path: '/',
        maxAge: 60 * 60 * 24 * 20, // 20일
      });
      res.status(200).json({ token: tokens.access_token || '' });
      break;
    }

    case 'GET_TOKEN_BY_REFRESH_TOKEN': {
      if (!Object.hasOwn(req.cookies, 'Authorization')) {
        res.status(404).json({
          message: 'not found',
          isAxiosError: true,
          location: 'server',
          name: 'AxiosError',
        });
        return;
      }

      const accessToken = req.cookies.Authorization;
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

      // @ts-ignore
      const { tokens } = await oauth2Client.refreshToken(
        jsonTokens[targetIndex].refresh_token
      );

      jsonTokens[targetIndex] = {
        ...jsonTokens[targetIndex],
        access_token: tokens.access_token || '',
      };

      writeFile(jsonTokens);

      setCookie(res, 'Authorization', tokens.access_token, {
        httpOnly: true,
        sameSite: process.env.NEXT_PUBLIC_MODE !== 'development',
        domain:
          process.env.NEXT_PUBLIC_MODE !== 'development'
            ? process.env.NEXT_PUBLIC_DOMAIN_URI
            : '',
        path: '/',
        maxAge: 60 * 60 * 24 * 20, // 20일
      });

      oauth2Client.setCredentials(tokens);
      res.status(200).json({ token: tokens.access_token || '' });
      break;
    }

    default:
      res.status(404).end();
      break;
  }
}
