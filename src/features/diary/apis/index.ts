import { AxiosError } from 'axios';
import {
  DriveFile,
  File,
  MetaData,
  PatchFileArgs,
} from '@/features/diary/apis/interfaces.ts';
import driveApi from '@/features/common/apis/driveInstance.ts';
import driveUploadApi from '@/features/common/apis/driveUploadInstance.ts';

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
      { params: { uploadType: 'multipart' } },
    )
    .then(res => res.data);

export const getFileList = async (accessToken?: string): Promise<DriveFile> => {
  let headers = {};
  if (accessToken) {
    headers = { Authorization: `Bearer ${accessToken}` };
  }
  return await driveApi
    .get('', {
      params: {
        q: 'trashed=false',
        spaces: 'appDataFolder',
        fields:
          'files(id,name,createdTime,modifiedTime,hasThumbnail,thumbnailLink,contentHints)',
      },
      headers,
    })
    .then(res => res.data);
};

export const getFile = async (
  id: string,
  accessToken?: string,
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
  accessToken?: string,
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
  fileId: string,
): Promise<{ message: string } | AxiosError> =>
  await driveApi.delete(`/${fileId}`).then(res => res.data);
