import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { setCookie } from '@/backend/utils/cookieUtils.ts';
import { readJSONFile, writeFile } from '@/backend/utils/fileUtils.ts';

export function DELETE(
  req: NextApiRequest,
  res: NextApiResponse<AxiosError | { message: string }>,
) {
  const accessToken = req.cookies.Authorization;

  const jsonTokens = readJSONFile();
  const index = jsonTokens.findIndex(v => v.access_token === accessToken);
  if (index > -1) {
    jsonTokens.splice(index, 1);
  }
  writeFile(jsonTokens);
  setCookie(res, 'Authorization', 'deleted', {
    maxAge: 0,
    path: '/',
    expires: new Date(),
  });

  res.status(200).json({ message: 'success' });
}
