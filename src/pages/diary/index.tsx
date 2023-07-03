import { useGetDocList } from '@/features/diary/diaryList/apis/queries';
import DiaryList from '@/features/diary/diaryList/components/DiaryList.tsx';

export default function DiaryPage() {
  const { data } = useGetDocList();

  return <DiaryList files={data?.files} />;
}
