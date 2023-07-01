import { useMutation } from '@tanstack/react-query';
import { DIARY_KEY, docsApi } from '@/features/diary/apis/index.ts';
import { Doc } from '@/features/diary/apis/interfaces.ts';
import axios, { AxiosError } from 'axios';
import { DOMAIN_URI } from '@/features/diary/apis/index.ts';
import { queryClient } from '@/pages/_app.tsx';

const createDoc = async (title: string): Promise<Doc> =>
  await docsApi.post('', { title: `jiary-${title}` }).then(res => res.data);

export const useCreateDoc = () =>
  useMutation({
    mutationKey: [DIARY_KEY],
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
    mutationKey: [DIARY_KEY],
    mutationFn: (fileId: string) => deleteDoc(fileId),
    onSuccess() {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [DIARY_KEY] });
      }, 800);
    },
  });
