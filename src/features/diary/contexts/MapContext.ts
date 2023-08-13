import { createContext } from 'react';

type MapContext = {
  map: google.maps.Map | null;
  addMarker: (place: google.maps.places.PlaceResult) => void;
};

const MapContext = createContext<MapContext>({
  map: null,
  addMarker: () => {},
});

export default MapContext;
