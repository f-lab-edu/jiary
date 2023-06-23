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
  refresh_token: string | null;
  expiry_date: number | null;
  access_token: string | null;
  token_type: string | null;
  id_token: string | null;
  scope: string;
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

const writeFile = (tokens: JSONFile[]) => {
  fs.writeFileSync(process.env.TOKEN_JSON_PATH, JSON.stringify(tokens));
};

const readJSONFile: () => JSONFile[] = () => {
  const dataJSON =
    fs.readFileSync(process.env.TOKEN_JSON_PATH).toString() || '[]';
  return JSON.parse(dataJSON);
};

const checkSameToken = (tokens: TokenInfo) => {
  const jsonTokens: JSONFile[] = readJSONFile();
  let index = jsonTokens.findIndex(
    (v: { access_token: string; refresh_token: string }) =>
      v.access_token === tokens.access_token
  );
  if (index > -1) {
    jsonTokens[index].refresh_token = tokens.refresh_token as string;
  } else {
    jsonTokens.push({
      access_token: tokens.access_token as string,
      refresh_token: tokens.refresh_token as string,
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

        let { tokens } = await oauth2Client.getToken(body.code);
        oauth2Client.setCredentials(tokens);
        writeFile(checkSameToken(tokens));

        res.status(200).json({ token: tokens.access_token });
        break;
      }

      case REQUEST_BODY_TYPE.GET_TOKEN_BY_REFRESH_TOKEN: {
        const { accessToken } = body;

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
          access_token: tokens?.access_token,
        };

        writeFile(jsonTokens);

        oauth2Client.setCredentials(tokens);
        res.status(200).json({ token: tokens?.access_token });
        break;
      }

      default:
        break;
    }
  }
}
