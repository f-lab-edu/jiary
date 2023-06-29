import { File } from '@/features/diary/apis/interfaces.ts';
import * as style from '@/features/diary/components/diaryList/DiaryList.css.ts';
import DiaryCard from '@/features/diary/components/diaryList/DiaryCard';
import DiaryListHeader from '@/features/diary/components/diaryList/DiaryListHeader.tsx';

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
// export default function DiaryList({ files }: { files: File[] | undefined }) {
export default function DiaryList() {
  const files = [
    {
      id: '1',
      mimeType: '',
      name: 'External Logistics Services For Medical Supplies',
      kind: '',
    },
    { id: '2', mimeType: '', name: '다낭 여행 기록', kind: '' },
    { id: '3', mimeType: '', name: '세계 일주 여행 기록', kind: '' },
    { id: '4', mimeType: '', name: '4', kind: '' },
    { id: '5', mimeType: '', name: '5', kind: '' },
    { id: '6', mimeType: '', name: '6', kind: '' },
    { id: '7', mimeType: '', name: '7', kind: '' },
    { id: '8', mimeType: '', name: '8', kind: '' },
    { id: '9', mimeType: '', name: '9', kind: '' },
    { id: '10', mimeType: '', name: '10', kind: '' },
    { id: '11', mimeType: '', name: '11', kind: '' },
    { id: '12', mimeType: '', name: '12', kind: '' },
    { id: '13', mimeType: '', name: '13', kind: '' },
    { id: '14', mimeType: '', name: '14', kind: '' },
    { id: '15', mimeType: '', name: '15', kind: '' },
    { id: '16', mimeType: '', name: '16', kind: '' },
  ];
  return (
    <>
      <div className={style.container}>
        <DiaryListHeader count={files.length || 0} />
        <ul className={style.ul}>
          {files?.map(file => (
            <DiaryCard key={file.id} file={file} />
          ))}
        </ul>
      </div>
    </>
  );
}
