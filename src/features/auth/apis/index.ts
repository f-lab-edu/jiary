import axios from 'axios';
import {
  onErrorResponse,
  onResponse,
} from '@/features/common/apis/interceptors';

export const oauthApi = axios.create({
  baseURL: 'https://www.googleapis.com',
  headers: {
    'Content-type': 'application/json',
  },
  params: {},
  timeout: 15 * 1000,
});

setTimeout(() => {
  oauthApi.interceptors.response.use(onResponse, onErrorResponse);
});

export const DOMAIN_URI = process.env.NEXT_PUBLIC_DOMAIN_URI;
export const AUTH_KEY = 'AUTH' as const;
