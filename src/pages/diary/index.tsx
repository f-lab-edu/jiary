import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFileList } from '@/features/diary/apis/index.ts';
import { DriveFile } from '@/features/diary/apis/interfaces.ts';
export { default } from '@/features/diary/pages/root/DiaryPage.tsx';

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
