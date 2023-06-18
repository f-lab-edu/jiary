import { ReactNode } from 'react';

const AppLayout = (props: { children: ReactNode }) => {
  return (
    <div>
      layout
      <div>{props.children}</div>
    </div>
  );
};

export default AppLayout;
