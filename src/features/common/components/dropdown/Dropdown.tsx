import {
  Dispatch,
  ReactElement,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useRef,
} from 'react';
import Input from '@/features/common/components/dropdown/Input.tsx';
import Title from '@/features/common/components/dropdown/Title.tsx';
import SubmitButton from '@/features/common/components/dropdown/SubmitButton.tsx';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type Inputs = { inputValue: string; setInputValue: Dispatch<string> };

type DropdownContext = {
  inputs: Inputs | undefined;
  submitCallback?: (args?: unknown) => unknown;
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
  children: ReactNode[] | ReactNode;
  inputs?: Inputs;
  submitCallback?: (args?: unknown) => unknown;
  width?: string;
};

export default function Dropdown({
  target,
  children,
  control,
  inputs,
  submitCallback,
  width = 'fit-content',
}: DropdownProps) {
  const { isDropdownOpen, setIsDropdownOpen } = control;
  const { targetRef, targetElement } = target;
  const targetHeight = targetRef.current?.clientHeight || 0;
  const containerRef = useRef(null);

  useClickOutSide(containerRef, () => {
    setIsDropdownOpen(false);
    inputs?.setInputValue('');
  });

  return (
    <DropdownContext.Provider value={{ inputs, submitCallback }}>
      <div className={style.container} ref={containerRef}>
        {targetElement}
        {isDropdownOpen && (
          <div
            className={style.wrapper}
            style={assignInlineVars({
              [style.wrapperWidth]: width,
              [style.wrapperTop]: `${(targetHeight + 10).toString()}px`,
            })}
          >
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
// Dropdown.Button =
