import { isObjectEmpty } from '@/core/utils/objectUtils.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import usePatchFile from '@/features/diary/apis/mutations/usePatchFile.ts';
import { MutableRefObject } from 'react';

export const useSaveDiary = (diaryId: string) => {
  const patchMutation = usePatchFile();

  const saveDiary = (
    value?: MutableRefObject<string> | null,
    metaData?: MetaData,
  ) => {
    const formData = new FormData();

    if (!isObjectEmpty(metaData)) {
      formData.append(
        'metadata',
        new Blob([JSON.stringify({ name: metaData?.name })], {
          type: 'application/json',
        }),
      );
    }

    if (value?.current) {
      formData.append(
        'media',
        new Blob([value.current], { type: 'text/plain' }),
      );
    }

    if (!isObjectEmpty(metaData) || value?.current) {
      patchMutation.mutate({
        fileId: diaryId,
        multipartData: formData,
      });
    }
  };

  return saveDiary;
};
