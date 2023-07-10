import { ReactNode, useContext, useEffect, useRef } from 'react';
import { DropdownContext } from '@/features/common/hooks/useDropdown.ts';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Trigger({ children, className }: Props) {
  const { isShow, setIsShow, setTriggerRef } = useContext(DropdownContext);
  const triggerRef = useRef(null);

  useEffect(() => {
    setTriggerRef(triggerRef);
  }, [setTriggerRef, triggerRef]);

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
