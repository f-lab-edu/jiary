export const JIARY_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_URI;
export const OAUTH_DOMAIN = 'https://www.googleapis.com';
export const DRIVE_DOMAIN = 'https://www.googleapis.com/drive/v3/files';
export const DRIVE_UPLOAD_DOMAIN =
  'https://www.googleapis.com/upload/drive/v3/files';
export const GOOGLE_POPUP_URL = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.appdata&response_type=code&client_id=799247539118-dkci5957fbdpf3546piiur8odfutjmf5.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F${JIARY_DOMAIN}%2Fauth%2Fend-popup`;
