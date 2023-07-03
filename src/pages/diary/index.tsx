import { useGetDocList } from '@/features/diaryList/apis/queries.ts';
import DiaryList from '@/features/diaryList/components/DiaryList.tsx';

export default function DiaryPage() {
  const { data } = useGetDocList();

  return <DiaryList files={data?.files} />;
}
