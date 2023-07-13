import axios, { AxiosError } from 'axios';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/interceptors.ts';
import {
  Doc,
  DriveFile,
  MutationDocApi,
  RequestInsertText,
  RequestRemoveText,
} from '@/features/diaryList/apis/interfaces.ts';
import { jiaryApi } from '@/features/common/apis/jiaryInstance.ts';

export const DOMAIN_URI = process.env.NEXT_PUBLIC_DOMAIN_URI;
export const DIARY_KEY = 'DIARY' as const;
export const DIARY_CONTENT_KEY = 'DIARY_CONTENT_KEY' as const;

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

export const createDoc = async (title: string): Promise<Doc> =>
  await docsApi.post('', { title: `jiary-${title}` }).then(res => res.data);

export const deleteDoc = async (
  fileId: string
): Promise<{ message: string } | AxiosError> =>
  await jiaryApi
    .delete(
      `${DOMAIN_URI}/api/diary?file_id=${fileId}&access_token=${localStorage.getItem(
        'accessToken'
      )}`
    )
    .then(res => res.data);

export const getDocList = async (): Promise<DriveFile> =>
  await driveApi
    .get("/files?q=trashed=false and name contains 'jiary-'")
    .then(res => res.data);

export const getDoc = async (id: string): Promise<Doc> =>
  await docsApi.get(`/${id}`).then(res => res.data);

export const insertText = async ({
  docId,
  insertText,
}: RequestInsertText): Promise<MutationDocApi> =>
  await docsApi.post(`/${docId}:batchUpdate`, {
    requests: [{ insertText }],
  });

export const removeText = async ({
  docId,
  deleteContentRange,
}: RequestRemoveText): Promise<MutationDocApi> =>
  await docsApi.post(`/${docId}:batchUpdate`, {
    requests: [{ deleteContentRange }],
  });
