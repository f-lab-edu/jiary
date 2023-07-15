import { DIARY_KEY, getDocList } from '@/features/diaryList/apis/index.ts';
import { useQuery } from '@tanstack/react-query';
import { DriveFile } from '@/features/diaryList/apis/interfaces.ts';

const useGetDocList = () =>
  useQuery<DriveFile>({
    queryKey: [DIARY_KEY, 'docList'],
    queryFn: getDocList,
  });

export default useGetDocList;
