import { useQuery } from '@tanstack/react-query';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFileList } from '@/features/diary/apis/index.ts';
import { DriveFile } from '@/features/diary/apis/interfaces.ts';

const useGetFileList = (accessToken?: string) =>
  useQuery<DriveFile>({
    queryKey: [DIARY_KEY, 'docList'],
    queryFn: () => getFileList(accessToken),
    suspense: true,
  });

export default useGetFileList;
