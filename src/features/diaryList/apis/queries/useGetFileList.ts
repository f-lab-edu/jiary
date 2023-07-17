import { DIARY_KEY, getFileList } from '@/features/diaryList/apis/index.ts';
import { useQuery } from '@tanstack/react-query';
import { DriveFile } from '@/features/diaryList/apis/interfaces.ts';

const useGetFileList = () =>
  useQuery<DriveFile>({
    queryKey: [DIARY_KEY, 'docList'],
    queryFn: getFileList,
  });

export default useGetFileList;
