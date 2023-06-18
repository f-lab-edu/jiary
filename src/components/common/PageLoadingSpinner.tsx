import * as style from '@/components/common/PageLoadingSpinner.css.ts';

export default function PageLoadingSpinner() {
  return (
    <div className={style.loadingSpinnerContainer}>
      <div className={style.loadingSpinner}>
        <div className={style.div1}></div>
        <div className={style.div2}></div>
        <div className={style.div3}></div>
      </div>
    </div>
  );
}
