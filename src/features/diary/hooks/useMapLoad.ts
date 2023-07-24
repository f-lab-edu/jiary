import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { POTISION, ZOOM } from '@/constants/map.ts';

type HookType = (mapRef: RefObject<HTMLDivElement>) => {
  map: MutableRefObject<google.maps.Map | null>;
};

export const useMapLoad: HookType = mapRef => {
  const map = useRef<google.maps.Map | null>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const initMap = useCallback(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
      version: 'weekly',
      libraries: ['maps', 'marker', 'places'],
    });

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      map.current = new Map(mapRef.current as HTMLDivElement, {
        center: POTISION,
        zoom: ZOOM,
      });
    });
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return { map, autocomplete };
};
