export const GOOGLE_INFO = {
  GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: `${process.env.NEXT_PUBLIC_DOMAIN_URI}/auth/end-popup`,
  SCOPE: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid',
    // 'https://www.googleapis.com/auth/documents',
    // 'https://www.googleapis.com/auth/drive.file',
    // 'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
  ],
};
