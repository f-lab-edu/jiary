import { useMutation } from '@tanstack/react-query';
import { DIARY_KEY, createFile } from '@/features/diaryList/apis/index.ts';

const useCreateFile = () =>
  useMutation({
    mutationKey: [DIARY_KEY],
    mutationFn: (title: string) => createFile(title),
  });

export default useCreateFile;
