import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DIARY_KEY, deleteDoc } from '@/features/diaryList/apis/index.ts';
import { DriveFile, File } from '@/features/diaryList/apis/interfaces.ts';
import { AxiosError } from 'axios';

const useDeleteFile = () => {
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

export default useDeleteFile;
