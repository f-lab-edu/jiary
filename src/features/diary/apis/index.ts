import axios from 'axios';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/interceptors.ts';

export const driveApi = axios.create({
  baseURL: 'https://www.googleapis.com/drive/v3',
  headers: {
    'Content-type': 'application/json',
  },
  params: {},
  timeout: 15 * 1000,
});

driveApi.interceptors.request.use(onRequest);
driveApi.interceptors.response.use(onResponse, onErrorResponse);

export const docsApi = axios.create({
  baseURL: 'https://content-docs.googleapis.com/v1/documents',
  headers: {
    'Content-type': 'application/json',
  },
  params: {},
  timeout: 15 * 1000,
});

docsApi.interceptors.request.use(onRequest);
docsApi.interceptors.response.use(onResponse, onErrorResponse);

export const DIARY_KEY = 'DIARY' as const;
