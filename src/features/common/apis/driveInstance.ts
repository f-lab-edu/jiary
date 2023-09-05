import axios from 'axios';

import { DRIVE_DOMAIN } from '@/constants/domain.ts';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/config/interceptors.ts';

export const driveApi = axios.create({
  baseURL: DRIVE_DOMAIN,
  headers: { 'Content-type': 'application/json' },
  timeout: 15 * 1000,
});

driveApi.interceptors.request.use(onRequest);
driveApi.interceptors.response.use(onResponse, onErrorResponse);

export default driveApi;
