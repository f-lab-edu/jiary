import { GetServerSideProps } from 'next';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getFile, getFileMetaData } from '@/features/diaryList/apis/index.ts';
import { DIARY_KEY } from '@/constants/queryKey.ts';
export { default } from '@/features/diaryList/pages/content/DiaryContentPage.tsx';

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();
  const id = context.query?.id as string;

  await queryClient.prefetchQuery<string>({
    queryKey: [DIARY_KEY, id],
    queryFn: () => getFile(id, context.req.cookies.Authorization),
  });

  await queryClient.prefetchQuery<MetaData>({
    queryKey: [DIARY_KEY, 'metadata', id],
    queryFn: () => getFileMetaData(id, context.req.cookies.Authorization),
  });

  return {
    props: {
      diaryId: id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
