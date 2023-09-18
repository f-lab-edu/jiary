import Head from 'next/head';

import useGetFileList from '@/features/diary/apis/queries/useGetFileList.ts';
import DiaryCard from '@/features/diary/components/list/DiaryCard/DiaryCard.tsx';
import DiaryEmptyCard from '@/features/diary/components/list/DiaryEmptyCard/DiaryEmptyCard.tsx';
import DiaryListHeader from '@/features/diary/components/list/DiaryListHeader/DiaryListHeader.tsx';

import * as style from '@/features/diary/pages/root/DiaryPage.css.ts';

export default function DiaryPage() {
  const { data } = useGetFileList();
  const files = data?.files;

  return (
    <>
      <Head>
        <title>다이어리 리스트 - Jiary</title>
        <meta name="description" content="당신이 기록한 다이어리 목록" />
        <meta property="og:title" content="다이어리 리스트 - Jiary" />
        <meta property="og:description" content="당신의 여행 다이어리 리스트" />
      </Head>

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
