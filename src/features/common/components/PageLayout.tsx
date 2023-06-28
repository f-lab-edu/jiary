import { ReactNode } from 'react';
import * as style from '@/features/common/components/PageLayout.css.ts';
import PageHeader from '@/features/common/components/header/PageHeader.tsx';

export default function PageLayout(props: { children: ReactNode }) {
  return (
    <>
      <PageHeader />
      <main className={style.main}>{props.children}</main>
    </>
  );
}
