import { isObjectEmpty } from '@/core/utils/objectUtils.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import usePatchFile from '@/features/diary/apis/mutations/usePatchFile.ts';
import { MutableRefObject } from 'react';

type RequestMedatData = {
  [key: string]: string;
};

export const useSaveDiary = (diaryId: string) => {
  const patchMutation = usePatchFile();

  const saveDiary = (saveData: {
    value?: MutableRefObject<string> | null;
    metaData?: MetaData;
  }) => {
    const { value, metaData } = saveData;
    const formData = new FormData();

    if (!isObjectEmpty(metaData)) {
      const requestMedatData: RequestMedatData = {};
      if (metaData?.name) {
        requestMedatData['name'] = metaData.name;
      }
      if (metaData?.description) {
        requestMedatData['description'] = metaData.description;
      }

      formData.append(
        'metadata',
        new Blob([JSON.stringify(requestMedatData)], {
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
