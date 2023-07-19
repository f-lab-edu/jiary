import axios, { AxiosError } from 'axios';
import {
  onErrorResponse,
  onRequest,
  onResponse,
} from '@/features/common/apis/interceptors.ts';
import {
  DriveFile,
  File,
  MetaData,
  PatchFileArgs,
} from '@/features/diaryList/apis/interfaces.ts';

export const DOMAIN_URI = process.env.NEXT_PUBLIC_DOMAIN_URI;
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
export const DIARY_KEY = 'DIARY';
export const DIARY_CONTENT_KEY = 'DIARY_CONTENT_KEY';

export const driveApi = axios.create({
  baseURL: 'https://www.googleapis.com/drive/v3/files',
  headers: { 'Content-type': 'application/json' },
  params: {},
  timeout: 15 * 1000,
});

driveApi.interceptors.request.use(onRequest);
driveApi.interceptors.response.use(onResponse, onErrorResponse);

export const driveUploadApi = axios.create({
  baseURL: 'https://www.googleapis.com/upload/drive/v3/files',
  headers: { 'Content-Type': 'multipart/related' },
  params: {},
  timeout: 15 * 1000,
});

driveUploadApi.interceptors.request.use(onRequest);
driveUploadApi.interceptors.response.use(onResponse, onErrorResponse);

export const createFile = async (title: string): Promise<File> =>
  await driveApi
    .post(
      '',
      {
        createdTime: new Date().toISOString(),
        mimeType: 'text/plain',
        name: title,
        parents: ['appDataFolder'],
      },
      { params: { uploadType: 'multipart' } }
    )
    .then(res => res.data);

export const getFileList = async (
  accessToken: string | undefined
): Promise<DriveFile> => {
  let headers = {};
  if (accessToken) {
    headers = { Authorization: `Bearer ${accessToken}` };
  }
  return await driveApi
    .get('', {
      params: {
        q: 'trashed=false',
        spaces: 'appDataFolder',
        fields: '*',
      },
      headers,
    })
    .then(res => res.data);
};

export const getFile = async (
  id: string,
  accessToken: string | undefined
): Promise<string> => {
  let headers = {};
  if (accessToken) {
    headers = { Authorization: `Bearer ${accessToken}` };
  }
  return await driveApi
    .get(`/${id}`, {
      params: { alt: 'media' },
      headers,
    })
    .then(res => res.data);
};

export const getFileMetaData = async (
  id: string,
  accessToken: string | undefined
): Promise<MetaData> => {
  let headers = {};
  if (accessToken) {
    headers = { Authorization: `Bearer ${accessToken}` };
  }
  return await driveApi
    .get(`/${id}`, {
      params: {
        fields:
          'name,createdTime,modifiedTime,description,hasThumbnail,thumbnailLink,contentHints',
      },
      headers,
    })
    .then(res => res.data);
};

export const patchFile = async ({
  fileId,
  multipartData,
}: PatchFileArgs): Promise<File> => {
  return await driveUploadApi.patch(`/${fileId}`, multipartData, {
    params: { uploadType: 'multipart' },
  });
};

export const deleteFile = async (
  fileId: string
): Promise<{ message: string } | AxiosError> =>
  await driveApi.delete(`/${fileId}`).then(res => res.data);
