import { useGetDocList } from '@/features/diary/apis/queries.ts';
import DiaryList from '@/features/diary/components/diaryList/DiaryList.tsx';
import { useIsFetching } from '@tanstack/react-query';
import { DIARY_KEY } from '@/features/diary/apis/index.ts';
import PageLoadingSpinner from '@/features/common/components/spinner/PageLoadingSpinner.tsx';

export default function Index() {
  const { data } = useGetDocList();
  const isPageLoading = useIsFetching({ queryKey: [DIARY_KEY] });

  return (
    <>
      <DiaryList files={data?.files} />
      {isPageLoading && <PageLoadingSpinner />}
    </>
  );
}
