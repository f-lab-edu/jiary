import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutSide = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
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
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);
};
