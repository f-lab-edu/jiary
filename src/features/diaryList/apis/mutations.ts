import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DIARY_KEY, docsApi } from '@/features/diaryList/apis/index.ts';
import { Doc, DriveFile, File } from '@/features/diaryList/apis/interfaces.ts';
import axios, { AxiosError } from 'axios';
import { DOMAIN_URI } from '@/features/diaryList/apis/index.ts';

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

export const useDeleteDoc = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string } | string, AxiosError, string>({
    mutationKey: [DIARY_KEY],
    mutationFn: (fileId: string) => deleteDoc(fileId),
    onSuccess(_, variables) {
      queryClient.setQueryData<DriveFile>(
        [DIARY_KEY, 'docList'],
        (oldData): DriveFile => ({
          ...oldData,
          files: oldData?.files.filter(file => file.id !== variables) as File[],
        })
      );
    },
  });
};
