import fs from 'fs';
import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import jwtDecode from 'jwt-decode';

interface GoogleUrl {
  location: string;
}
interface Login {
  token: string;
}
interface Response {
  message: string;
}

interface JSONFile {
  access_token: string;
  refresh_token: string;
  user_email: string;
}
interface Credentials {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
  user_email?: string | null;
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

const writeFile = (tokens: JSONFile[]) => {
  fs.writeFileSync(
    process.env.TOKEN_JSON_PATH as string,
    JSON.stringify(tokens)
  );
};

const readJSONFile: () => JSONFile[] = () => {
  const dataJSON =
    fs.readFileSync(process.env.TOKEN_JSON_PATH as string).toString() || '[]';
  return JSON.parse(dataJSON);
};

const checkSameToken = (tokens: Credentials) => {
  const jsonTokens: JSONFile[] = readJSONFile();
  const userEmail = jwtDecode<{ email: string }>(
    tokens.id_token as string
  )?.email;

  const index = jsonTokens.findIndex(
    (v: { access_token: string; refresh_token: string; user_email: string }) =>
      v.user_email === userEmail
  );

  if (index > -1) {
    jsonTokens[index].access_token = tokens.access_token as string;
  } else {
    jsonTokens.push({
      user_email: userEmail,
      access_token: tokens.access_token as string,
      refresh_token: tokens.refresh_token as string,
    });
  }
  return jsonTokens;
};

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

        res.status(200).json({ token: tokens.access_token || '' });
        break;
      }

      case 'GET_TOKEN_BY_REFRESH_TOKEN': {
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
