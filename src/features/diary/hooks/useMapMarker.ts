import { useEffect, useState } from 'react';

export const useMapMarker = (map: google.maps.Map | null) => {
  const [markerList, setMarkerList] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (markerList.length === 0) return;
    const bounds = new google.maps.LatLngBounds();

    markerList.forEach(marker => {
      bounds.extend(marker.getPosition() as google.maps.LatLng);
    });
    map?.fitBounds(bounds);
  }, [markerList, map]);

  const addMarker = (place: google.maps.places.PlaceResult) => {
    const location = place.geometry?.location;
    const newMarker = new google.maps.Marker({
      map,
      position: location,
      animation: google.maps.Animation.DROP,
      optimized: true,
      title: place.name,
    });

    setMarkerList([...markerList, newMarker]);
  };

  // TODO: index로 marker 지우기
  // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
  // const removeMarker = (markIndex: number) => {
  const removeMarker = () => {
    const findElement = markerList.find(v => v.getTitle() === 'Hello World!');
    findElement?.setMap(null);

    const filteredMarker = markerList.filter(
      v => v.getTitle() !== 'Hello World!',
    );
    setMarkerList(filteredMarker);
  };

  return { addMarker, removeMarker };
};
