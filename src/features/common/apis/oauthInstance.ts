import axios from 'axios';

import { OAUTH_DOMAIN } from '@/constants/domain.ts';
import {
  onErrorResponse,
  onResponse,
} from '@/features/common/apis/config/interceptors.ts';

const oauthApi = axios.create({
  baseURL: OAUTH_DOMAIN,
  headers: { 'Content-type': 'application/json' },
  timeout: 15 * 1000,
});

setTimeout(() => {
  oauthApi.interceptors.response.use(onResponse, onErrorResponse);
});

export default oauthApi;
