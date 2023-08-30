import * as style from '@/features/diary/pages/content/DiaryContentPage.css.ts';
import DiaryEditor from '@/features/diary/components/content/DiaryEditor/DiaryEditor.tsx';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import useGetFile from '@/features/diary/apis/queries/useGetFile.ts';
import useGetFileMetaData from '@/features/diary/apis/queries/useGetFileMetaData.ts';
import { useEffect, useRef } from 'react';
import DiaryMap from '@/features/diary/components/content/DiaryMap/DiaryMap.tsx';
import Head from 'next/head';
import { useMapLoad } from '@/features/diary/hooks/useMapLoad.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';
import { disableScroll, enableScroll } from '@/libs/bodyScrollLock/index.ts';
import { isSSR } from '@/core/utils/objectUtils.ts';
import { useMapMarker } from '@/features/diary/hooks/useMapMarker.ts';
import { useSaveDiary } from '@/features/diary/hooks/useSaveDiary.ts';
import DiaryTitle from '@/features/diary/components/content/ContentHeader/DiaryTitle/DiaryTitle.tsx';
import DiaryDescription from '@/features/diary/components/content/ContentHeader/DiaryDescription/DiaryDescription.tsx';

type Props = {
  documentData: string;
  metaData: MetaData;
  diaryId: string;
};

export type DiaryValue = {
  value: string;
  metaData: MetaData;
};

export default function DiaryContentPage({ diaryId }: Props) {
  const { data: documentData } = useGetFile(diaryId);
  const { data: metaData } = useGetFileMetaData(diaryId);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const { map } = useMapLoad(mapRef);
  const { addMarker, removeMarker } = useMapMarker(map);
  const saveDiary = useSaveDiary(diaryId);

  useEffect(() => {
    if (isSSR) return;
    disableScroll(document.body);
    () => enableScroll(document.body);
  }, []);

  return (
    <>
      <Head>
        <title>{`${metaData?.name || ''} 다이어리 📔`}</title>
      </Head>

      <MapContext.Provider value={{ map, addMarker, removeMarker, saveDiary }}>
        <div className={style.container}>
          <DiaryTitle metaData={metaData} />
          <DiaryDescription metaData={metaData} />

          <section className={style.sectionDivision}>
            <DiaryEditor documentData={documentData || ''} />
            <DiaryMap mapRef={mapRef} />
          </section>
        </div>
      </MapContext.Provider>
    </>
  );
}
