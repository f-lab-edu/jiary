import { useCallback, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { POTISION, ZOOM } from '@/constants/map.ts';

export const useMapLoad = (mapRef: HTMLDivElement | null) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initMap = useCallback(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
      version: 'weekly',
      libraries: ['maps', 'marker'],
    });

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;

      if (mapRef) {
        setMap(
          new Map(mapRef, {
            center: POTISION,
            zoom: ZOOM,
          })
        );
      }
    });
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return { map };
};
