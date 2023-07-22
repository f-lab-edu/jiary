import * as style from '@/features/diary/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diary/components/content/DiaryEditor/DiaryEditor.tsx';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import useGetFile from '@/features/diary/apis/queries/useGetFile.ts';
import useGetFileMetaData from '@/features/diary/apis/queries/useGetFileMetaData.ts';
import { useEffect } from 'react';
import { freezeScroll, releaseScroll } from '@/core/utils/uiUtils.ts';
import DiaryMap from '@/features/diary/components/content/DiaryMap/DiaryMap.tsx';

type Props = {
  document: string;
  metaData: MetaData;
  diaryId: string;
};

export type DiaryValue = {
  value: string;
  metaData: MetaData;
};

export default function DiaryContentPage({ diaryId }: Props) {
  const { data: document } = useGetFile(diaryId);
  const { data: metaData } = useGetFileMetaData(diaryId);

  useEffect(() => {
    freezeScroll();
    () => releaseScroll();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>{metaData?.name || ''}</h1>
      <section className={style.sectionDivision}>
        <DiaryEditor
          diaryId={diaryId}
          document={document || ''}
          metaData={metaData || {}}
        />
        <DiaryMap />
      </section>
    </div>
  );
}
