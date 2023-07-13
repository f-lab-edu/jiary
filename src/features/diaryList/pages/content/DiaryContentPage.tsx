import { Doc } from '@/features/diaryList/apis/interfaces.ts';
import { getConvertedDocContent } from '@/core/utils/docUtils.ts';
import * as style from '@/features/diaryList/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diaryList/components/DiaryEditor/DiaryEditor';

export default function DiaryContentPage({ doc }: { doc: Doc | undefined }) {
  const docId = doc?.documentId as string;
  const title = doc?.title?.includes('jiary-')
    ? doc?.title?.slice(6)
    : doc?.title;
  const contentWithTag = getConvertedDocContent(doc);

  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      <DiaryEditor docId={docId} content={contentWithTag} />
    </div>
  );
}
