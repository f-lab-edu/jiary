import { DIARY_KEY, getDoc } from '@/features/diaryList/apis/index.ts';
import { useQuery } from '@tanstack/react-query';
import { Doc } from '@/features/diaryList/apis/interfaces.ts';

export const useGetDoc = (id: string) =>
  useQuery<Doc>({
    queryKey: [DIARY_KEY, id],
    queryFn: () => getDoc(id),
  });

export default useGetDoc;
