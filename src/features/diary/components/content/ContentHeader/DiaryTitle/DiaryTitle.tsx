import { useContext } from 'react';

import GrowingInput from '@/features/common/components/growingInput/GrowingInput.tsx';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';

import * as style from '@/features/diary/components/content/ContentHeader/DiaryTitle/DiaryTitle.css.ts';

type Props = {
  metaData: MetaData | undefined;
};

export default function DiaryTitle({ metaData }: Props) {
  const { saveDiary } = useContext(MapContext);

  const saveMethod = (value: string) =>
    saveDiary({ metaData: { name: value } });

  return (
    <div className={style.container}>
      <GrowingInput title={metaData?.name} saveMethod={saveMethod} />
    </div>
  );
}
