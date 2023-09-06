import { google } from 'googleapis';

import { GOOGLE_INFO } from '@/backend/constants/google.ts';

export const oauth2Client = new google.auth.OAuth2(
  GOOGLE_INFO.GOOGLE_ID,
  GOOGLE_INFO.GOOGLE_SECRET,
  GOOGLE_INFO.REDIRECT_URI,
);
