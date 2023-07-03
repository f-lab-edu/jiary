import {
  DIARY_KEY,
  docsApi,
  driveApi,
} from '@/features/diaryList/apis/index.ts';
import { useQuery } from '@tanstack/react-query';
import { Doc, DriveFile } from '@/features/diaryList/apis/interfaces.ts';

const getDocList = async (): Promise<DriveFile> =>
  await driveApi
    .get("/files?q=trashed=false and name contains 'jiary-'")
    .then(res => res.data);

export const useGetDocList = () =>
  useQuery<DriveFile>({
    queryKey: [DIARY_KEY, 'docList'],
    queryFn: getDocList,
  });

export const getDoc = async (id: string): Promise<Doc> => {
  return await docsApi.get(`/${id}`).then(res => res.data);
};

export const useGetDoc = (id: string) =>
  useQuery<Doc>({
    queryKey: [DIARY_KEY, id],
    queryFn: () => getDoc(id),
  });
