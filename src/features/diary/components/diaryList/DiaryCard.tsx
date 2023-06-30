import Link from 'next/link';
import Image from 'next/image';
import { File } from '@/features/diary/apis/interfaces.ts';
import * as style from '@/features/diary/components/diaryList/DiaryCard.css';
import menu from '@/static/diary/menu.svg';
import earth from '@/static/diary/earth2.svg';
import calendar from '@/static/diary/calendar.svg';

export default function DiaryCard({ file }: { file: File }) {
  const title = file.name.includes('jiary-') ? file.name.slice(6) : file.name;

  return (
    <li key={file.id} className={style.li}>
      <Link href={`diary/${file.id}`} className={style.link}>
        <div className={style.header}>
          <div className={style.location}>
            <Image src={earth} width={20} height={20} alt="earth icon" />
            {/* TODO: 하드 코딩 remove */}
            <span className={style.locationText}>Unitied State</span>
          </div>
          <button>
            <Image src={menu} width={30} height={30} alt="menu" />
          </button>
        </div>
        <div className={style.contentWrapper}>
          <span className={style.title}>{title}</span>
          <div className={style.tag}>{/* TODO: 하드 코딩 remove */}</div>
        </div>
        <div className={style.footer}>
          <Image src={calendar} width={20} height={20} alt="calendar icon" />
          {/* TODO: 하드 코딩 remove */}
          <span>May 12, 2020</span>
        </div>
      </Link>
    </li>
  );
}
