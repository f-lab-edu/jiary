import * as style from '@/features/diary/components/content/DiaryMap/DiaryMap.css';
import { useMapMarker } from '@/features/diary/hooks/useMapMarker.ts';
import { MutableRefObject } from 'react';

type Props = {
  map: google.maps.Map | null;
  mapRef: MutableRefObject<HTMLDivElement | null>;
};

export default function DiaryMap({ map, mapRef }: Props) {
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
        ref={(node: HTMLDivElement) => (mapRef.current = node)}
        className={style.mapSection}
      />
    </div>
  );
}
