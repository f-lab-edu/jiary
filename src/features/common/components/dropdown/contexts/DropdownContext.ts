import { createContext, Dispatch, SetStateAction } from 'react';

type DropdownContext = {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  triggerRef: HTMLButtonElement | null;
  setTriggerRef: Dispatch<SetStateAction<HTMLButtonElement | null>>;
};

const DropdownContext = createContext<DropdownContext>({
  isShow: false,
  triggerRef: null,
  setIsShow: () => {},
  setTriggerRef: () => {},
});

export default DropdownContext;
