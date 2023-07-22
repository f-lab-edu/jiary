import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFileMetaData } from '@/features/diary/apis/index.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import { useQuery } from '@tanstack/react-query';

const useGetFileMetaData = (id: string, accessToken?: string) =>
  useQuery<MetaData>({
    queryKey: [DIARY_KEY, 'metadata', id],
    queryFn: () => getFileMetaData(id, accessToken),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

export default useGetFileMetaData;
