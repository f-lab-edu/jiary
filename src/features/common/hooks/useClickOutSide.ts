import { useCallback, useEffect, useRef } from 'react';

export const useClickOutSide = (callback: () => void) => {
  const ref = useRef(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const containerElement = ref.current as unknown as HTMLButtonElement;

      if (ref && !containerElement?.contains(target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};
