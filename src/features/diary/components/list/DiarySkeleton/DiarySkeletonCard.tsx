import * as style from '@/features/diary/components/list/DiarySkeleton/DiarySkeletonCard.css.ts';

export default function DiarySkeletonCard() {
  return (
    <li className={style.li}>
      <div className={style.link}>
        <div className={style.footer}>
          <div className={style.date}>
            <div className={`${style.header} ${style.skeleton}`}></div>
          </div>
        </div>
        <div className={style.contentWrapper}>
          <div className={`${style.title} ${style.skeleton}`}></div>
          <div className={`${style.subTitle} ${style.skeleton}`}></div>
        </div>
      </div>
    </li>
  );
}
