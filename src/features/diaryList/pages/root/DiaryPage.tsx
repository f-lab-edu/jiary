import { File } from '@/features/diaryList/apis/interfaces.ts';
import * as style from '@/features/diaryList/pages/root/DiaryPage.css.ts';
import DiaryCard from '@/features/diaryList/components/DiaryCard/DiaryCard';
import DiaryListHeader from '@/features/diaryList/components/DiaryListHeader/DiaryListHeader';
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
export default function DiaryPage({ files }: { files: File[] | undefined }) {
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
