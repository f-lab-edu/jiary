import * as style from '@/features/diary/components/content/DiaryMap/DiaryMap.css';
import { useMapLoad } from '@/features/diary/hooks/useMapLoad.ts';
import { useMapMarker } from '@/features/diary/hooks/useMapMarker.ts';
import { useState } from 'react';

export default function DiaryMap() {
  const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
  const { map } = useMapLoad(mapRef);
  const { addMarker, removeMarker } = useMapMarker(map);

  const setMap = () => {
    if (!map) return;
    addMarker({
      position: {
        lat: 37.51175556,
        lng: 127.1079306,
      },
    });
  };

  return (
    <div className={style.container}>
      <button onClick={setMap}> click!</button>
      <button onClick={removeMarker}> remove!</button>
      <div
        ref={(node: HTMLDivElement) => setMapRef(node)}
        className={style.mapSection}
      />
    </div>
  );
}
