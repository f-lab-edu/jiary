import * as style from '@/features/diary/components/content/DiaryMap/DiaryMap.css';
import { MutableRefObject } from 'react';

type Props = {
  mapRef: MutableRefObject<HTMLDivElement | null>;
};

export default function DiaryMap({ mapRef }: Props) {
  return (
    <div className={style.container}>
      <div
        ref={(node: HTMLDivElement) => (mapRef.current = node)}
        className={style.mapSection}
      />
    </div>
  );
}
