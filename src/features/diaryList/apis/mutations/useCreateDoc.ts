import { useMutation } from '@tanstack/react-query';
import { DIARY_KEY, createDoc } from '@/features/diaryList/apis/index.ts';

const useCreateDoc = () =>
  useMutation({
    mutationKey: [DIARY_KEY],
    mutationFn: (title: string) => createDoc(title),
  });

export default useCreateDoc;
