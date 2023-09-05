import axios from 'axios';

import { DRIVE_UPLOAD_DOMAIN } from '@/constants/domain.ts';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/config/interceptors.ts';

export const driveUploadApi = axios.create({
  baseURL: DRIVE_UPLOAD_DOMAIN,
  headers: { 'Content-Type': 'multipart/related' },
  timeout: 15 * 1000,
});

driveUploadApi.interceptors.request.use(onRequest);
driveUploadApi.interceptors.response.use(onResponse, onErrorResponse);

export default driveUploadApi;
