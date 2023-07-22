import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFileList } from '@/features/diaryList/apis/index.ts';
import { DriveFile } from '@/features/diaryList/apis/interfaces.ts';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
export { default } from '@/features/diaryList/pages/root/DiaryPage.tsx';

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<DriveFile>({
    queryKey: [DIARY_KEY, 'docList'],
    queryFn: () => getFileList(context.req.cookies.Authorization),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
