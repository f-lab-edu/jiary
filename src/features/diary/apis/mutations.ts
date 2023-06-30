import { useMutation } from '@tanstack/react-query';
import { docsApi } from '@/features/diary/apis/index.ts';
import { Doc } from '@/features/diary/apis/interfaces.ts';
import axios, { AxiosError } from 'axios';
import { DOMAIN_URI } from '@/features/diary/apis/index.ts';

const createDoc = async (title: string): Promise<Doc> =>
  await docsApi.post('', { title: `jiary-${title}` }).then(res => res.data);

export const useCreateDoc = () =>
  useMutation({
    mutationFn: (title: string) => createDoc(title),
  });

const deleteDoc = async (
  fileId: string
): Promise<{ message: string } | AxiosError> =>
  await axios
    .delete(
      `${DOMAIN_URI}/api/diary?file_id=${fileId}&access_token=${localStorage.getItem(
        'accessToken'
      )}`
    )
    .then(res => res.data);

export const useDeleteDoc = () =>
  useMutation({
    mutationFn: (fileId: string) => deleteDoc(fileId),
  });
