import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFile } from '@/features/diaryList/apis/index.ts';
import { useQuery } from '@tanstack/react-query';

const useGetFile = (id: string, accessToken?: string) =>
  useQuery<string>({
    queryKey: [DIARY_KEY, id],
    queryFn: () => getFile(id, accessToken),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

export default useGetFile;
