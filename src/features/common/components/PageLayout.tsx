import { ReactNode } from 'react';
import * as style from '@/features/common/components/PageLayout.css.ts';
import PageHeader from '@/features/common/components/header/PageHeader.tsx';
import PageLoadingSpinner from '@/features/common/components/spinner/PageLoadingSpinner.tsx';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export default function PageLayout(props: { children: ReactNode }) {
  const isFetching = useIsFetching();
  const isMuatating = useIsMutating();

  return (
    <>
      <PageHeader />
      <div className={style.main}>{props.children}</div>
      {Boolean(isFetching || isMuatating) && <PageLoadingSpinner />}
    </>
  );
}
