import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import { File } from '@/features/diary/apis/interfaces.ts';
import DiaryCardDropdown from '@/features/diary/components/list/DiaryCardDropdown/DiaryCardDropdown.tsx';

import * as style from '@/features/diary/components/list/DiaryCard/DiaryCard.css.ts';

export default function DiaryCard({ file }: { file: File }) {
  const [isLoading, setIsLoading] = useState(false);
  const title = file.name.includes('jiary-') ? file.name.slice(6) : file.name;
  const datetime = format(new Date(file.createdTime), 'yyyy-MM-dd');

  const handleLinkClick = (e: MouseEvent) => {
    const { className } = e.target as HTMLElement;
    if (className.toLowerCase().includes('dropdown-item')) {
      e.preventDefault();
    }
  };

  return (
    <li key={file.id} className={style.li}>
      <Link
        href={`diary/${file.id}`}
        className={style.link}
        onClick={handleLinkClick}
      >
        <div className={style.footer}>
          <div className={style.date}>
            <Image
              src="/icons/calendar.svg"
              width={20}
              height={20}
              alt="calendar icon"
            />
            <span>{datetime}</span>
          </div>
          <div>
            <DiaryCardDropdown id={file.id} setIsLoading={setIsLoading} />
          </div>
        </div>
        <div className={style.contentWrapper}>
          <span className={style.title}>{title}</span>
        </div>
      </Link>

      {isLoading && <div className={style.disabled}></div>}
    </li>
  );
}
