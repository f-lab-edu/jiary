import { GetServerSideProps } from 'next';
import useGetFile from '@/features/diaryList/apis/queries/useGetFile.ts';
import DiaryContentPage from '@/features/diaryList/pages/content/DiaryContentPage.tsx';
import useGetFileMetaData from '@/features/diaryList/apis/queries/useGetFileMetaData.ts';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getFile, getFileMetaData } from '@/features/diaryList/apis/index.ts';
import { DIARY_KEY } from '@/constants/queryKey.ts';

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
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index({ id }: { id: string }) {
  const { data: document } = useGetFile(id, undefined);
  const { data: metaData } = useGetFileMetaData(id, undefined);

  return (
    <DiaryContentPage
      document={document || ''}
      metaData={metaData || { createdTime: '' }}
      diaryId={id}
    />
  );
}
