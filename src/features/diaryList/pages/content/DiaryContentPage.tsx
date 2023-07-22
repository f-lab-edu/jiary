import * as style from '@/features/diaryList/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diaryList/components/DiaryEditor/DiaryEditor.tsx';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';
import useGetFile from '@/features/diaryList/apis/queries/useGetFile.ts';
import useGetFileMetaData from '@/features/diaryList/apis/queries/useGetFileMetaData.ts';

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
