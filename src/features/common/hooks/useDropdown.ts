import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';

type DropdownContext = {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  triggerRef: HTMLButtonElement | null;
  setTriggerRef: Dispatch<SetStateAction<HTMLButtonElement | null>>;
};

export const DropdownContext = createContext<DropdownContext>({
  isShow: false,
  triggerRef: null,
  setIsShow: () => {
    ('');
  },
  setTriggerRef: () => {
    ('');
  },
});

export const useDropdown = (containerRef: RefObject<HTMLElement> | null) => {
  const [isShow, setIsShow] = useState(false);
  const [triggerRef, setTriggerRef] =
    useState<MutableRefObject<HTMLButtonElement | null> | null>(null);

  useClickOutSide(containerRef, () => {
    setIsShow(false);
  });

  return {
    DropdownContext,
    contextValue: {
      isShow,
      setIsShow,
      triggerRef,
      setTriggerRef,
    },
  };
};
