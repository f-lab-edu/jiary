import { useQuery } from '@tanstack/react-query';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFile } from '@/features/diary/apis/index.ts';

const useGetFile = (id: string, accessToken?: string) =>
  useQuery<string>({
    queryKey: [DIARY_KEY, id],
    queryFn: () => getFile(id, accessToken),
  });

export default useGetFile;
