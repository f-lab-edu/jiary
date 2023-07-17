import useGetFileList from '@/features/diaryList/apis/queries/useGetFileList.ts';
import DiaryPage from '@/features/diaryList/pages/root/DiaryPage.tsx';

export default function Index() {
  const { data } = useGetFileList();

  return <DiaryPage files={data?.files} />;
}
