import { createContext } from 'react';

type MapContext = {
  map: google.maps.Map | null;
  addMarker: (place: google.maps.places.PlaceResult) => void;
  removeMarker: (title: string) => void;
};

const MapContext = createContext<MapContext>({
  map: null,
  addMarker: () => {},
  removeMarker: () => {},
});

export default MapContext;
