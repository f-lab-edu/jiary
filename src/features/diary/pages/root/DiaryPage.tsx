import * as style from '@/features/diary/pages/root/DiaryPage.css.ts';
import DiaryCard from '@/features/diary/components/list/DiaryCard/DiaryCard.tsx';
import DiaryListHeader from '@/features/diary/components/list/DiaryListHeader/DiaryListHeader.tsx';
import useGetFileList from '@/features/diary/apis/queries/useGetFileList.ts';
import DiaryEmptyCard from '@/features/diary/components/list/DiaryEmptyCard/DiaryEmptyCard.tsx';

export default function DiaryPage() {
  const { data } = useGetFileList();
  const files = data?.files;

  return (
    <>
      <div className={style.container}>
        <DiaryListHeader count={files?.length || 0} />
        {files && files.length > 0 ? (
          <ul className={style.ul}>
            {files?.map(file => <DiaryCard key={file.id} file={file} />)}
          </ul>
        ) : (
          <DiaryEmptyCard />
        )}
      </div>
    </>
  );
}
