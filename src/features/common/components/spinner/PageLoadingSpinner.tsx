import * as style from '@/features/common/components/spinner/PageLoadingSpinner.css.ts';

export default function PageLoadingSpinner() {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
    </div>
  );
}
