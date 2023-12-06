import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { createFile } from '@/features/diary/apis/index.ts';
import { DriveFile } from '@/features/diary/apis/interfaces.ts';

const useCreateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [DIARY_KEY],
    mutationFn: (title: string) => createFile(title),
    onSuccess() {
      queryClient.invalidateQueries<DriveFile>([DIARY_KEY, 'docList']);
    },
  });
};

export default useCreateFile;
