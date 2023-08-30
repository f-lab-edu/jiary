import { MetaData } from '@/features/diary/apis/interfaces.ts';
import Image from 'next/image';
import { KeyboardEvent, useContext, useRef, useState } from 'react';
import * as style from '@/features/diary/components/content/ContentHeader/DiaryTitle/DiaryTitle.css.ts';
import { useClickOutSide } from '@/features/common/hooks/useClickOutSide.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';

type Props = {
  metaData: MetaData | undefined;
};

export default function DiaryTitle({ metaData }: Props) {
  const [isOpenTitleInput, setIsOpenTitleInput] = useState(false);
  const title = useRef<string>(metaData?.name || '');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { saveDiary } = useContext(MapContext);

  const closeTitleInput = () => setIsOpenTitleInput(false);
  const saveTitle = () => {
    const value = inputRef.current?.value;
    if (value && title.current !== value) {
      saveDiary({ metaData: { name: value } });
      title.current = value;
    }
    closeTitleInput();
  };
  const changeInputWidth = () => {
    if (!inputRef.current) return;
    const $div = document.createElement('div');
    $div.style.display = 'inline-block';
    $div.style.fontWeight = '600';
    $div.style.fontSize = '24px';
    $div.style.border = 'none';
    $div.style.padding = '20px';
    $div.style.visibility = 'none';
    $div.innerText = inputRef.current.value;

    document.body.appendChild($div);
    inputRef.current.style.width = `${$div.offsetWidth}px`;

    document.body.removeChild($div);
  };

  useClickOutSide(inputRef, saveTitle);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    changeInputWidth();
    if (e.key === 'Escape') {
      closeTitleInput();
    }
    if (e.key === 'Enter') {
      saveTitle();
    }
  };

  return (
    <div className={style.titleWrapper}>
      {!isOpenTitleInput ? (
        <button
          className={style.titleButton}
          onClick={() => setIsOpenTitleInput(true)}
        >
          <h1 className={style.title}>{title.current}</h1>
          <Image
            src="/icons/pencil.svg"
            width={18}
            height={18}
            alt="pencil icon"
            className={style.editIcon}
          />
        </button>
      ) : (
        <input
          onKeyDown={handleKeyDown}
          className={style.titleInput}
          ref={(element: HTMLInputElement) => {
            inputRef.current = element;
            if (!element) return;
            element.value = title.current;
            changeInputWidth();
            element.focus();
          }}
        />
      )}
    </div>
  );
}
