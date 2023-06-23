const fs = require('fs');
const { google } = require('googleapis');
import type { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_BODY_TYPE } from '@/constant/auth.ts';
import { AxiosError } from 'axios';

interface Redirect {
  location: string;
}
interface Login {
  token: string;
}

interface JSONFile {
  access_token: string;
  refresh_token: string;
}
interface TokenInfo {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
}

const oauth2Client = new google.auth.OAuth2(
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
];

const authorizationUrl: string = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

let hasGetTokenRequest = false;

const checkSameToken = (tokens: TokenInfo) => {
  const dataJSON = fs.readFileSync(process.env.TOKEN_JSON_PATH).toString();
  const jsonTokens = JSON.parse(dataJSON);
  let index = jsonTokens.findIndex(
    (v: { access_token: string; refresh_token: string }) =>
      v.access_token === tokens.access_token
  );
  if (index > -1) {
    jsonTokens[index].refresh_token = tokens.refresh_token;
  } else {
    jsonTokens.push({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
  }
  return jsonTokens;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Redirect | Login | AxiosError>
) {
  if (req.method === 'GET') {
    res.status(200).json({ location: authorizationUrl });
  } else if (req.method === 'POST') {
    const body = req.body;

    switch (body.type) {
      case REQUEST_BODY_TYPE.GET_TOKEN: {
        if (hasGetTokenRequest) {
          return;
        }
        hasGetTokenRequest = true;
        const { code } = body;
        let { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const jsonTokens = checkSameToken(tokens);
        fs.writeFileSync(
          process.env.TOKEN_JSON_PATH,
          JSON.stringify(jsonTokens)
        );

        res.status(200).json({ token: tokens.access_token });
        break;
      }

      case REQUEST_BODY_TYPE.GET_TOKEN_BY_REFRESH_TOKEN: {
        const { accessToken } = body;

        const dataJSON = fs
          .readFileSync(process.env.TOKEN_JSON_PATH)
          .toString();
        const tokens: JSONFile[] = JSON.parse(dataJSON);
        const targetIndex = tokens.findIndex(
          token => token.access_token === accessToken
        );
        console.log(targetIndex);

        if (targetIndex < 0) {
          res.status(404).json({
            message: 'not found',
            isAxiosError: true,
            location: 'server',
            name: 'AxiosError',
          });
          return;
        }

        const response = await oauth2Client.refreshToken(
          tokens[targetIndex].refresh_token
        );

        tokens[targetIndex] = {
          ...tokens[targetIndex],
          access_token: response.tokens?.access_token,
        };

        fs.writeFileSync(process.env.TOKEN_JSON_PATH, JSON.stringify(tokens));
        oauth2Client.setCredentials(response.tokens);
        res.status(200).json({ token: response.tokens?.access_token });
        break;
      }

      default:
        break;
    }
  }
}
