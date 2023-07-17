import * as style from '@/features/diaryList/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diaryList/components/DiaryEditor/DiaryEditor';
import usePatchFile from '@/features/diaryList/apis/mutations/usePatchFile.ts';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';
import { isObjectEmpty } from '@/core/utils/objectUtils.ts';

type Props = {
  document: string;
  metaData: MetaData;
  diaryId: string;
};

export default function DiaryContentPage({
  document,
  metaData,
  diaryId,
}: Props) {
  const patchMutation = usePatchFile();

  const saveData = (value: string, metaData?: MetaData) => {
    const formData = new FormData();

    if (!isObjectEmpty(metaData)) {
      formData.append(
        'metadata',
        new Blob([JSON.stringify(metaData)], {
          type: 'application/json',
        })
      );
    }

    formData.append('media', new Blob([value], { type: 'text/plain' }));
    patchMutation.mutate({
      fileId: diaryId,
      multipartData: formData,
    });
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>{metaData?.name || ''}</h1>
      <DiaryEditor
        document={document}
        metaData={metaData}
        saveData={saveData}
      />
    </div>
  );
}
