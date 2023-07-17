import { DIARY_KEY, getFileMetaData } from '@/features/diaryList/apis/index.ts';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';
import { useQuery } from '@tanstack/react-query';

const useGetFileMetaData = (id: string, accessToken: string | undefined) =>
  useQuery<MetaData>({
    queryKey: [DIARY_KEY, 'metadata', id],
    queryFn: () => getFileMetaData(id, accessToken),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

export default useGetFileMetaData;
