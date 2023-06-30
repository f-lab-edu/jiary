import { useCallback, useEffect, useRef } from 'react';

export const useClickOutSide = (callback: () => void) => {
  const containerRef = useRef(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const containerElement =
        containerRef.current as unknown as HTMLButtonElement;

      if (containerRef && !containerElement?.contains(target)) {
        callback();
      }
    },
    [containerRef, callback]
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return containerRef;
};
