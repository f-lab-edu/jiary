import Link from 'next/link';
import Image from 'next/image';
import { File } from '@/features/diary/apis/interfaces.ts';
import * as style from '@/features/diary/components/list/DiaryCard/DiaryCard.css.ts';
import earth from '@/static/diary/earth2.svg';
import calendar from '@/static/diary/calendar.svg';
import DiaryCardDropdown from '@/features/diary/components/list/DiaryCardDropdown/DiaryCardDropdown.tsx';
import { MouseEvent } from 'react';
import { format } from 'date-fns';

export default function DiaryCard({ file }: { file: File }) {
  const title = file.name.includes('jiary-') ? file.name.slice(6) : file.name;
  const datetime = format(new Date(file.createdTime), 'yyyy-MM-dd');

  const handleLinkClick = (e: MouseEvent) => {
    const { className } = e.target as HTMLElement;
    if (className.toLowerCase().includes('dropdown')) {
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
        <div className={style.header}>
          <div className={style.location}>
            <Image src={earth} width={20} height={20} alt="earth icon" />
            {/* TODO: 하드 코딩 remove */}
            <span className={style.locationText}>Unitied State</span>
          </div>
          <DiaryCardDropdown id={file.id} />
        </div>
        <div className={style.contentWrapper}>
          <span className={style.title}>{title}</span>
        </div>
        <div className={style.footer}>
          <Image src={calendar} width={20} height={20} alt="calendar icon" />
          <span>{datetime}</span>
        </div>
      </Link>
    </li>
  );
}
