import useGetDocList from '@/features/diaryList/apis/queries/useGetDocList.ts';
import DiaryPage from '@/features/diaryList/pages/root/DiaryPage.tsx';

export default function Index() {
  const { data } = useGetDocList();

  return <DiaryPage files={data?.files} />;
}
