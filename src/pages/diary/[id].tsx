import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { getFile, getFileMetaData } from '@/features/diary/apis/index.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
export { default } from '@/features/diary/pages/content/DiaryContentPage.tsx';

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();
  const id = context.query?.id as string;

  await Promise.all([
    queryClient.prefetchQuery<string>({
      queryKey: [DIARY_KEY, id],
      queryFn: () => getFile(id, context.req.cookies.Authorization),
    }),
    queryClient.prefetchQuery<MetaData>({
      queryKey: [DIARY_KEY, 'metadata', id],
      queryFn: () => getFileMetaData(id, context.req.cookies.Authorization),
    }),
  ]);

  return {
    props: {
      diaryId: id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
