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

    setMarkerList(prev => [...prev, newMarker]);
  };

  const removeMarker = (title: string) => {
    const findElement = markerList.find(v => v.getTitle() === title);
    findElement?.setMap(null);

    const filteredMarker = markerList.filter(v => v.getTitle() !== title);
    setMarkerList(filteredMarker);
  };

  return { addMarker, removeMarker };
};
