import { useGetDocList } from '@/features/diary/apis/queries.ts';
import DiaryList from '@/features/diary/components/diaryList/DiaryList.tsx';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { DIARY_KEY } from '@/features/diary/apis/index.ts';
import PageLoadingSpinner from '@/features/common/components/spinner/PageLoadingSpinner.tsx';

export default function DiaryPage() {
  const { data } = useGetDocList();

  const isFetching = useIsFetching({ queryKey: [DIARY_KEY] });
  const isMuatating = useIsMutating({ mutationKey: [DIARY_KEY] });
  const isPageLoading = isFetching || isMuatating;

  return (
    <>
      <DiaryList files={data?.files} />
      {isPageLoading && <PageLoadingSpinner />}
    </>
  );
}
