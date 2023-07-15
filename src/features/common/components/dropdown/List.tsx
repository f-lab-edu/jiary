import { ReactNode, useContext } from 'react';
import DropdownContext from '@/features/common/components/dropdown/contexts/DropdownContext.ts';
import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type Props = {
  children: ReactNode;
  width?: string;
};

export default function List({ children, width = 'fit-content' }: Props) {
  const { isShow, triggerRef } = useContext(DropdownContext);
  const targetHeight = triggerRef?.clientHeight || 0;

  return (
    <>
      {isShow && (
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
    </>
  );
}
