import { KeyboardEvent, useRef, useState } from 'react';
import * as style from '@/features/common/components/growingInput/GrowingInput.css.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';
import Image from 'next/image';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { COLORS } from '@/constants/colors.ts';
import { focusContentEditableTextToEnd } from '@/core/utils/uiUtils.ts';

type Props = {
  title: string | undefined;
  saveMethod: (value: string) => void;
  small?: boolean;
};

export default function GrowingInput({ title = '', saveMethod, small }: Props) {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const titleRef = useRef<string>(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const closeTitleInput = () => setIsOpenInput(false);

  const saveTitle = () => {
    const value = inputRef.current?.innerText;
    if (value && titleRef.current !== value) {
      saveMethod(value);
      titleRef.current = value;
    }
    closeTitleInput();
  };

  useClickOutSide(inputRef, saveTitle);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      closeTitleInput();
    }
    if (e.key === 'Enter') {
      saveTitle();
    }
  };

  return (
    <div
      className={style.titleWrapper}
      style={assignInlineVars({
        [style.padding]: small ? '0 1px' : '1px 2px',
      })}
    >
      {!isOpenInput ? (
        <button
          className={style.titleButton}
          onClick={() => setIsOpenInput(true)}
        >
          <div
            className={style.title}
            style={assignInlineVars({
              [style.fontWeight]: small ? '500' : '700',
              [style.fontSize]: small ? '18px' : '24px',
              [style.fontColor]: small ? COLORS.THIRD_TEXT_COLOR : '#000',
            })}
          >
            {titleRef.current}
          </div>
          <Image
            src="/icons/pencil.svg"
            width={small ? 12 : 16}
            height={small ? 12 : 16}
            alt="pencil icon"
            className={style.editIcon}
          />
        </button>
      ) : (
        <span
          contentEditable
          onKeyDown={handleKeyDown}
          className={style.titleInput}
          style={assignInlineVars({
            [style.fontWeight]: small ? '500' : '700',
            [style.fontSize]: small ? '18px' : '24px',
          })}
          ref={(element: HTMLInputElement) => {
            inputRef.current = element;
            if (!element) return;
            element.focus();
            element.innerText = titleRef.current;
            focusContentEditableTextToEnd(element);
          }}
        />
      )}
    </div>
  );
}
