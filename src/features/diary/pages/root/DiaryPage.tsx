import * as style from '@/features/diary/pages/root/DiaryPage.css.ts';
import DiaryCard from '@/features/diary/components/list/DiaryCard/DiaryCard.tsx';
import DiaryListHeader from '@/features/diary/components/list/DiaryListHeader/DiaryListHeader.tsx';
import useGetFileList from '@/features/diary/apis/queries/useGetFileList.ts';

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
export default function DiaryPage() {
  const { data } = useGetFileList();
  const files = data?.files;

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
