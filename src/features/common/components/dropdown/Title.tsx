import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';

export default function Title({ title }: { title: string }) {
  return <span className={style.title}>{title}</span>;
}
