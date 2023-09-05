import Image from 'next/image';
import * as style from '@/features/diary/components/list/DiaryEmptyCard/DiaryEmptyCard.css.ts';

export default function DiaryEmptyCard() {
  return (
    <div className={style.container}>
      <Image
        src="/background/empty-box.png"
        width={420}
        height={420}
        alt="empty box image"
      />
      <h2 className={style.title}>다이어리를 찾을 수 없습니다 🥲</h2>
      <span className={style.description}>
        New 버튼을 클릭해서 새로운 카드를 만들어보세요.
      </span>
    </div>
  );
}
