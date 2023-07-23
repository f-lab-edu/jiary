import { useState } from 'react';

type Marker = {
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
};

export const useMapMarker = (map: google.maps.Map | null) => {
  const [markerList, setMarkerList] = useState<google.maps.Marker[]>([]);

  const addMarker = (marker: Marker) => {
    setMarkerList([
      ...markerList,
      new google.maps.Marker({
        map,
        position: marker.position,
        animation: google.maps.Animation.DROP,
        label: 'abcasdfasdfawef ewv wef',
        title: 'Hello World!',
      }),
    ]);
  };

  // TODO: index로 marker 지우기
  // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
  // const removeMarker = (markIndex: number) => {
  const removeMarker = () => {
    const findElement = markerList.find(v => v.getTitle() === 'Hello World!');
    findElement?.setMap(null);

    const filteredMarker = markerList.filter(
      v => v.getTitle() !== 'Hello World!'
    );
    setMarkerList(filteredMarker);
  };

  return { addMarker, removeMarker };
};
