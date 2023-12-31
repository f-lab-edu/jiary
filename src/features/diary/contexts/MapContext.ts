import { createContext, MutableRefObject } from 'react';

import { MetaData } from '@/features/diary/apis/interfaces.ts';

type MapContext = {
  map: google.maps.Map | null;
  addMarker: (place: google.maps.places.PlaceResult) => void;
  removeMarker: (title: string) => void;
  saveDiary: (saveData: {
    value?: MutableRefObject<string> | null;
    metaData?: MetaData;
  }) => void;
};

const MapContext = createContext<MapContext>({
  map: null,
  addMarker: () => {},
  removeMarker: () => {},
  saveDiary: () => {},
});

export default MapContext;
