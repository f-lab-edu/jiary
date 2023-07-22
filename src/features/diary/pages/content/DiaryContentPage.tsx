import * as style from '@/features/diary/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diary/components/content/DiaryEditor/DiaryEditor.tsx';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import useGetFile from '@/features/diary/apis/queries/useGetFile.ts';
import useGetFileMetaData from '@/features/diary/apis/queries/useGetFileMetaData.ts';

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

  return (
    <div className={style.container}>
      <h1 className={style.title}>{metaData?.name || ''}</h1>
      <DiaryEditor
        diaryId={diaryId}
        document={document || ''}
        metaData={metaData || {}}
      />
    </div>
  );
}
