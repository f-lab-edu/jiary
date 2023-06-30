import {
  Dispatch,
  ReactElement,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
} from 'react';
import Input from '@/features/common/components/dropdown/Input.tsx';
import Title from '@/features/common/components/dropdown/Title.tsx';
import SubmitButton from '@/features/common/components/dropdown/SubmitButton.tsx';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';

type Inputs = { inputValue: string; setInputValue: Dispatch<string> };

type DropdownContext = {
  inputs: Inputs | undefined;
  submitCallback?: Dispatch<SetStateAction<unknown>>;
};

export const DropdownContext = createContext<DropdownContext>({
  inputs: {
    inputValue: '',
    setInputValue: () => {
      ('');
    },
  },
  submitCallback: () => {
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
  inputs?: Inputs;
  submitCallback?: (args: unknown) => unknown;
};

export default function Dropdown({
  target,
  children,
  control,
  inputs,
  submitCallback,
}: DropdownProps) {
  const { isDropdownOpen, setIsDropdownOpen } = control;
  const { targetRef, targetElement } = target;
  const targetHieght = targetRef.current?.clientHeight || 0;

  const containerRef = useClickOutSide(() => {
    setIsDropdownOpen(false);
    inputs?.setInputValue('');
  });

  return (
    <DropdownContext.Provider value={{ inputs, submitCallback }}>
      <div className={style.container} ref={containerRef}>
        {targetElement}
        {isDropdownOpen && (
          // TODO: targetRef가 필요없음. 높이값은, children 으로 할 수 있는거 아님?
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
