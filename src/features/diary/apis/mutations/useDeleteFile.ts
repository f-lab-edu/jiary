import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFile } from '@/features/diary/apis/index.ts';
import { DriveFile, File } from '@/features/diary/apis/interfaces.ts';
import { AxiosError } from 'axios';
import { DIARY_KEY } from '@/constants/queryKey.ts';

const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string } | string, AxiosError, string>({
    mutationKey: [DIARY_KEY],
    mutationFn: (fileId: string) => deleteFile(fileId),
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
