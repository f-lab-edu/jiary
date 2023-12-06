import * as style from '@/features/diary/components/list/DiarySkeleton/DiarySkeletonHeader.css.ts';

export default function DiarySkeletonHeader() {
  return (
    <>
      <div className={style.listHeader}>
        <div className={style.textWrapper}>
          <span className={style.saveText}>Saved </span>
          <span className={style.countText}></span>
        </div>
      </div>
    </>
  );
}
