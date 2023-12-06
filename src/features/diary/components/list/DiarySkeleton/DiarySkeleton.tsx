import DiaryCardSkeletonCard from '@/features/diary/components/list/DiarySkeleton/DiarySkeletonCard.tsx';
import DiarySkeletonHeader from '@/features/diary/components/list/DiarySkeleton/DiarySkeletonHeader.tsx';

import * as style from '@/features/diary/pages/root/DiaryPage.css.ts';

type Props = {
  count?: number;
};
export default function DiaryCardSkeleton({ count = 9 }: Props) {
  if (count === 0) {
    return null;
  }

  const list = Array.from(Array(count), (v, i) => i);

  return (
    <>
      <DiarySkeletonHeader />
      <ul className={style.ul}>
        {list.map(v => (
          <DiaryCardSkeletonCard key={v} />
        ))}
      </ul>
    </>
  );
}
