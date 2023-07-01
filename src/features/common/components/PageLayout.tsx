import { ReactNode } from 'react';
import * as style from '@/features/common/components/PageLayout.css.ts';
import PageHeader from '@/features/common/components/header/PageHeader.tsx';
import PageLoadingSpinner from '@/features/common/components/spinner/PageLoadingSpinner.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store.ts';

export default function PageLayout(props: { children: ReactNode }) {
  const isLoading = useSelector((state: RootState) => state.ui.isPageLoading);

  return (
    <>
      <PageHeader />
      <main className={style.main}>{props.children}</main>
      {isLoading && <PageLoadingSpinner />}
    </>
  );
}
