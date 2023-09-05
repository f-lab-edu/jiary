import { useMutation } from '@tanstack/react-query';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { createFile } from '@/features/diary/apis/index.ts';

const useCreateFile = () =>
  useMutation({
    mutationKey: [DIARY_KEY],
    mutationFn: (title: string) => createFile(title),
  });

export default useCreateFile;
