import { MetaData } from '@/features/diary/apis/interfaces.ts';
import Image from 'next/image';
import { KeyboardEvent, useContext, useRef, useState } from 'react';
import * as style from '@/features/diary/pages/content/DiaryContentPage.css.ts';
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
      saveDiary(null, { name: value });
      title.current = value;
    }
    closeTitleInput();
  };

  useClickOutSide(inputRef, saveTitle);
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      closeTitleInput();
    }
    if (e.key === 'Enter') {
      saveTitle();
    }
  };

  return (
    <>
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
          onKeyUp={handleKeyUp}
          className={style.titleInput}
          ref={(element: HTMLInputElement) => {
            inputRef.current = element;
            if (!element) return;
            element.value = title.current;
            element.focus();
          }}
        />
      )}
    </>
  );
}
