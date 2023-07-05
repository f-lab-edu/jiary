import {
  Dispatch,
  JSXElementConstructor,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react';
import Input from '@/features/common/components/dropdown/Input.tsx';
import Title from '@/features/common/components/dropdown/Title.tsx';
import SubmitButton from '@/features/common/components/dropdown/SubmitButton.tsx';
import List from '@/features/common/components/dropdown/List.tsx';
import Trigger from '@/features/common/components/dropdown/Trigger.tsx';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';

type DropdownContext = {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  triggerRef: MutableRefObject<HTMLButtonElement | null> | null;
  setTriggerRef: Dispatch<
    SetStateAction<MutableRefObject<HTMLButtonElement | null> | null>
  >;
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

export default function Dropdown({ children }: { children: ReactNode[] }) {
  // TODO: context 관련 value 모두 커스텀 훅으로 분리
  const [isShow, setIsShow] = useState(false);
  const [triggerRef, setTriggerRef] =
    useState<MutableRefObject<HTMLButtonElement | null> | null>(null);
  const containerRef = useRef(null);

  useClickOutSide(containerRef, () => {
    setIsShow(false);
  });

  const contextValue = {
    isShow,
    setIsShow,
    triggerRef,
    setTriggerRef,
  };
  const trigger = children?.find(child => {
    if (typeof child === 'object' && child !== null && 'type' in child) {
      return (
        (child?.type as JSXElementConstructor<unknown>)?.name === 'Trigger'
      );
    }
  });
  children = children.filter(child => {
    if (typeof child === 'object' && child !== null && 'type' in child) {
      return (
        (child?.type as JSXElementConstructor<unknown>)?.name !== 'Trigger'
      );
    }
  });

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={style.container} ref={containerRef}>
        {trigger}
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Input = Input;
Dropdown.Title = Title;
Dropdown.SubmitButton = SubmitButton;
Dropdown.List = List;
Dropdown.Trigger = Trigger;
