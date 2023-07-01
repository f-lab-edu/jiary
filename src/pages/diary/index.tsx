import { useGetDocList } from '@/features/diary/apis/queries.ts';
import DiaryList from '@/features/diary/components/diaryList/DiaryList.tsx';

export default function DiaryPage() {
  const { data } = useGetDocList();

  return <DiaryList files={data?.files} />;
}
