import { JSXElementConstructor, ReactNode, useRef } from 'react';
import Input from '@/features/common/components/dropdown/Input.tsx';
import Title from '@/features/common/components/dropdown/Title.tsx';
import SubmitButton from '@/features/common/components/dropdown/SubmitButton.tsx';
import List from '@/features/common/components/dropdown/List.tsx';
import Trigger from '@/features/common/components/dropdown/Trigger.tsx';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { useDropdown } from '@/features/common/hooks/useDropdown.ts';

export default function Dropdown({ children }: { children: ReactNode[] }) {
  const containerRef = useRef(null);
  const { DropdownContext, contextValue } = useDropdown(containerRef);

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
