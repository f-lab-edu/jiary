import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { MouseEvent, MouseEventHandler, ReactNode, useContext } from 'react';
import DropdownContext from '@/features/common/components/dropdown/contexts/DropdownContext.ts';

type Props = {
  children?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function SubmitButton({ children, onClick, disabled }: Props) {
  const { setIsShow } = useContext(DropdownContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsShow(false);
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={style.submitButton}
    >
      {children}
    </button>
  );
}
