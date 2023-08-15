import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { DEFAULT_POTISION, ZOOM } from '@/constants/map.ts';

type HookType = (mapRef: RefObject<HTMLDivElement>) => {
  map: google.maps.Map | null;
  autocomplete: MutableRefObject<google.maps.places.Autocomplete | null>;
};

export const useMapLoad: HookType = mapRef => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const initMap = useCallback(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
      version: 'weekly',
      libraries: ['maps', 'marker', 'places'],
    });

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps',
      )) as google.maps.MapsLibrary;
      const newMap = new Map(mapRef.current as HTMLDivElement, {
        center: DEFAULT_POTISION,
        zoom: ZOOM,
      });
      setMap(newMap);
    });
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return { map, autocomplete };
};
