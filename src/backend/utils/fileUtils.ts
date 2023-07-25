import fs from 'fs';
import jwtDecode from 'jwt-decode';
import { Credentials, JSONFile } from '@/backend/auth/interfaces.ts';

export const readJSONFile: () => JSONFile[] = () => {
  const dataJSON =
    fs.readFileSync(process.env.TOKEN_JSON_PATH as string).toString() || '[]';
  return JSON.parse(dataJSON);
};

export const writeFile = (tokens: JSONFile[]) => {
  fs.writeFileSync(
    process.env.TOKEN_JSON_PATH as string,
    JSON.stringify(tokens)
  );
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
