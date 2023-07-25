export interface JSONFile {
  access_token: string;
  refresh_token: string;
  user_email: string;
}

export interface Credentials {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
  user_email?: string | null;
}

export interface GoogleUrl {
  location: string;
}
export interface Login {
  token: string;
}
export interface Response {
  message: string;
}
