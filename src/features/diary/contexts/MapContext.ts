import { MutableRefObject, createContext } from 'react';

type MapContext = {
  map: MutableRefObject<google.maps.Map | null> | null;
};

const MapContext = createContext<MapContext>({
  map: null,
});

export default MapContext;
