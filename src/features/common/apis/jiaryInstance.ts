import axios from 'axios';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/interceptors.ts';

export const jiaryApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URI,
  headers: { 'Content-type': 'application/json' },
  params: {},
  timeout: 15 * 1000,
});

setTimeout(() => {
  jiaryApi.interceptors.request.use(onRequest);
  jiaryApi.interceptors.response.use(onResponse, onErrorResponse);
});
