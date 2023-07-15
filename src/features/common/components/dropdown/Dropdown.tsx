import { ReactNode, useRef, useState } from 'react';
import Input from '@/features/common/components/dropdown/Input.tsx';
import Title from '@/features/common/components/dropdown/Title.tsx';
import SubmitButton from '@/features/common/components/dropdown/SubmitButton.tsx';
import List from '@/features/common/components/dropdown/List.tsx';
import Trigger from '@/features/common/components/dropdown/Trigger.tsx';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import DropdownContext from '@/features/common/components/dropdown/contexts/DropdownContext.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';

export default function Dropdown({ children }: { children: ReactNode[] }) {
  const containerRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null);

  const contextValue = {
    isShow,
    setIsShow,
    triggerRef,
    setTriggerRef,
  };

  useClickOutSide(containerRef, () => setIsShow(false));

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={style.container} ref={containerRef}>
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
