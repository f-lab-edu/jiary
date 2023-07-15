import { ReactNode, useCallback, useContext } from 'react';
import DropdownContext from '@/features/common/components/dropdown/contexts/DropdownContext.ts';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Trigger({ children, className }: Props) {
  const { isShow, setIsShow, setTriggerRef } = useContext(DropdownContext);
  const triggerRef = useCallback(
    (node: HTMLButtonElement) => setTriggerRef(node),
    [setTriggerRef]
  );

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
