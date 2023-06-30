import {
  Dispatch,
  ReactElement,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import Input from '@/features/common/components/dropdown/Input.tsx';
import Title from '@/features/common/components/dropdown/Title.tsx';
import SubmitButton from '@/features/common/components/dropdown/SubmitButton.tsx';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';

export type DropdownContext = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

export const DropdownContext = createContext<DropdownContext>({
  inputValue: '',
  setInputValue: () => {
    ('');
  },
});

type DropdownProps = {
  target: { targetElement: ReactElement; targetRef: RefObject<HTMLElement> };
  control: {
    isDropdownOpen: boolean;
    setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  };
  children: ReactNode[];
  className?: string;
};

export default function Dropdown({ target, children, control }: DropdownProps) {
  const [inputValue, setInputValue] = useState('');
  const { isDropdownOpen, setIsDropdownOpen } = control;
  const { targetRef, targetElement } = target;
  const targetHieght = targetRef.current?.clientHeight || 0;

  const ref = useClickOutSide(() => {
    setIsDropdownOpen(false);
    setInputValue('');
  });

  return (
    <DropdownContext.Provider value={{ inputValue, setInputValue }}>
      <div className={style.container} ref={ref}>
        {targetElement}
        {isDropdownOpen && (
          <div className={style.wrapper} style={{ top: targetHieght + 10 }}>
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Input = Input;
Dropdown.Title = Title;
Dropdown.SubmitButton = SubmitButton;
