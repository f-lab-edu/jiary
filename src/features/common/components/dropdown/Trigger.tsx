import { ReactNode, useContext, useRef } from 'react';
import { DropdownContext } from '@/features/common/components/dropdown/Dropdown.tsx';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Trigger({ children, className }: Props) {
  const { isShow, setIsShow, setTriggerRef } = useContext(DropdownContext);
  const triggerRef = useRef(null);
  if (triggerRef) {
    setTriggerRef(triggerRef);
  }

  return (
    <button
      className={className}
      onClick={() => setIsShow(!isShow)}
      ref={triggerRef}
    >
      {children}
    </button>
  );
}
