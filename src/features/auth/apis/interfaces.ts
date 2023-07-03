export interface UserInfo {
  email: string;
  id: string;
  name?: string;
  given_name?: string;
  locale?: string;
  picture?: string;
  verified_email?: boolean;
}

export interface GoogleLoginUrl {
  location: string;
}

export interface AuthToken {
  token: string;
}

export interface LogoutResponse {
  message: string;
}
