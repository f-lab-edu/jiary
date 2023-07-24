import { useEffect, useState } from 'react';

export const useMapAutocomplete = (inputRef: HTMLInputElement | null) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef) return;
    setAutocomplete(
      new google.maps.places.Autocomplete(inputRef as HTMLInputElement, {
        fields: ['address_components', 'geometry', 'icon', 'name'],
        strictBounds: false,
        types: ['establishment'],
      })
    );
  }, [inputRef]);

  return { autocomplete };
};
