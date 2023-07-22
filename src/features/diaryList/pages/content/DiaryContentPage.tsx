import * as style from '@/features/diaryList/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diaryList/components/DiaryEditor/DiaryEditor.tsx';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';

type Props = {
  document: string;
  metaData: MetaData;
  diaryId: string;
};

export type DiaryValue = {
  value: string;
  metaData: MetaData;
};

export default function DiaryContentPage({
  document,
  metaData,
  diaryId,
}: Props) {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{metaData?.name || ''}</h1>
      <DiaryEditor diaryId={diaryId} document={document} metaData={metaData} />
    </div>
  );
}
