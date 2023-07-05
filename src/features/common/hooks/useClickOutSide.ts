import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutSide = (
  ref: RefObject<HTMLElement> | null,
  callback: () => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const containerElement = ref?.current || null;

      if (!containerElement?.contains(target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleClickOutside);
    return () => window.removeEventListener('mouseup', handleClickOutside);
  }, [handleClickOutside]);
};
