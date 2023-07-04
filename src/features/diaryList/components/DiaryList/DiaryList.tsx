import { File } from '@/features/diaryList/apis/interfaces.ts';
import * as style from '@/features/diaryList/components/DiaryList/DiaryList.css.ts';
import DiaryCard from '@/features/diaryList/components/DiaryCard/DiaryCard';
import DiaryListHeader from '@/features/diaryList/components/DiaryList/DiaryListHeader/DiaryListHeader';
import { useDispatch } from 'react-redux';
import { changeLoading } from '@/store/slices/uiSlice.ts';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { DIARY_KEY } from '@/features/diaryList/apis/index.ts';
import { useCallback, useEffect } from 'react';
/**
 * card list data
 * 1. 제목
 * 2. 생성 날짜
 * 3. location
 * 4. 삭제
 * 5. tag
 * 6. label 색상 선택기
 * https://www.eleken.co/cases/tendrx
 */
export default function DiaryList({ files }: { files: File[] | undefined }) {
  const dispatch = useDispatch();

  const isFetching = useIsFetching({ queryKey: [DIARY_KEY] });
  const isMuatating = useIsMutating({ mutationKey: [DIARY_KEY] });

  const dispatchLoading = useCallback(() => {
    dispatch(changeLoading(isFetching || isMuatating));
  }, [isFetching, isMuatating, dispatch]);

  useEffect(() => {
    dispatchLoading();
  }, [dispatchLoading]);

  return (
    <>
      <div className={style.container}>
        <DiaryListHeader count={files?.length || 0} />
        <ul className={style.ul}>
          {files?.map(file => (
            <DiaryCard key={file.id} file={file} />
          ))}
        </ul>
      </div>
    </>
  );
}
