import axios from 'axios';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/config/interceptors.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';

const jiaryApi = axios.create({
  baseURL: `${JIARY_DOMAIN}/api/auth`,
  headers: { 'Content-type': 'application/json' },
  timeout: 15 * 1000,
});

setTimeout(() => {
  jiaryApi.interceptors.request.use(onRequest);
  jiaryApi.interceptors.response.use(onResponse, onErrorResponse);
});

export default jiaryApi;
