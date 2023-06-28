import { ReactNode } from 'react';
import PageHeader from '@/features/common/components/header/PageHeader.tsx';

export default function PageLayout(props: { children: ReactNode }) {
  return (
    <div>
      <PageHeader />
      {props.children}
    </div>
  );
}
