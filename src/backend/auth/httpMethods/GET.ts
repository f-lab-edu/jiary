import { GoogleUrl } from '@/backend/auth/interfaces.ts';
import { GOOGLE_INFO } from '@/backend/constants/google.ts';
import { oauth2Client } from '@/backend/utils/authUtils.ts';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const authorizationUrl: string = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: GOOGLE_INFO.SCOPE,
});

export function GET(
  req: NextApiRequest,
  res: NextApiResponse<GoogleUrl | AxiosError>
) {
  res.status(200).json({ location: authorizationUrl });
}
