import { getFileList } from '@/features/diary/apis/index.ts';
import { useQuery } from '@tanstack/react-query';
import { DriveFile } from '@/features/diary/apis/interfaces.ts';
import { DIARY_KEY } from '@/constants/queryKey.ts';

const useGetFileList = (accessToken?: string) =>
  useQuery<DriveFile>({
    queryKey: [DIARY_KEY, 'docList'],
    queryFn: () => getFileList(accessToken),
  });

export default useGetFileList;
