import { GetServerSideProps } from 'next';
import useGetDoc from '@/features/diaryList/apis/queries/useGetDoc.ts';
import DiaryContentPage from '@/features/diaryList/pages/content/DiaryContentPage';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.query?.id;
  return {
    props: { id },
  };
};

export default function Index({ id }: { id: string }) {
  const { data } = useGetDoc(id);

  return <DiaryContentPage doc={data} />;
}
