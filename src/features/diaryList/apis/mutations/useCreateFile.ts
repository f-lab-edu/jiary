import { useMutation } from '@tanstack/react-query';
import { createFile } from '@/features/diaryList/apis/index.ts';
import { DIARY_KEY } from '@/constants/queryKey.ts';

const useCreateFile = () =>
  useMutation({
    mutationKey: [DIARY_KEY],
    mutationFn: (title: string) => createFile(title),
  });

export default useCreateFile;
