import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

/* eslint-disable @typescript-eslint/no-var-requires */
const { oauth2Client } = require('@/pages/api/auth.ts');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | AxiosError | { message: string }>
) {
  if (req.method === 'DELETE') {
    const fileId = req.query.file_id as string;
    oauth2Client.setCredentials({ access_token: req.query.access_token });

    const service = google.drive({ version: 'v3', auth: oauth2Client });

    try {
      service.files.delete({ fileId });
    } catch (error) {
      res.status(404).json({ message: 'error' });
    }

    res.status(204).end();
  }
}
