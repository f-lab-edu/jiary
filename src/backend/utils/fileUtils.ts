import fs from 'fs';
import path from 'path';
import jwtDecode from 'jwt-decode';
import { Credentials, JSONFile } from '@/backend/auth/interfaces.ts';

const tokenFilePath = path.join(
  process.cwd(),
  `./${process.env.JSON_TOKEN_FILE_NAME}`
);

const createFile = (path: string) => {
  fs.writeFileSync(path, '[]', 'utf8');
};

export const readJSONFile: () => JSONFile[] = () => {
  if (!fs.existsSync(tokenFilePath)) {
    createFile(tokenFilePath);
  }
  const dataJSON = fs.readFileSync(tokenFilePath, 'utf8').toString() || '[]';
  return JSON.parse(dataJSON);
};

export const writeFile = (tokens: JSONFile[]) => {
  if (!fs.existsSync(tokenFilePath)) {
    createFile(tokenFilePath);
  }
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokens), 'utf8');
};

export const checkSameToken = (tokens: Credentials) => {
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
    if (tokens.refresh_token) {
      jsonTokens[index].refresh_token = tokens.refresh_token as string;
    }
  } else {
    jsonTokens.push({
      user_email: userEmail,
      access_token: tokens.access_token as string,
      refresh_token: tokens.refresh_token as string,
    });
  }
  return jsonTokens;
};
