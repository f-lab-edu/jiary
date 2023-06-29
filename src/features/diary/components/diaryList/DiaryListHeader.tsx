import * as style from '@/features/diary/components/diaryList/DiaryListHeader.css.ts';

export default function DiaryListHeader({ count }: { count: number }) {
  const handleCreateDoc = () => {
    return;
  };

  return (
    <div className={style.listHeader}>
      <div>
        <span className={style.saveText}>Saved </span>
        <span className={style.countText}>{count}</span>
      </div>

      <button onClick={handleCreateDoc} className={style.newButton}>
        New
      </button>
    </div>
  );
}
