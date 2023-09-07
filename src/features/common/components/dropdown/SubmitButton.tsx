import { MouseEvent, MouseEventHandler, ReactNode, useContext } from 'react';

import DropdownContext from '@/features/common/components/dropdown/contexts/DropdownContext.ts';

import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';

type Props = {
  children?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

export default function SubmitButton({
  children,
  onClick,
  disabled,
  className,
}: Props) {
  const { setIsShow } = useContext(DropdownContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsShow(false);
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${className ? className : style.submitButton} dropdown-item`}
    >
      {children}
    </button>
  );
}
