import { MetaData } from '@/features/diary/apis/interfaces.ts';
import * as style from '@/features/diary/components/content/ContentHeader/DiaryTitle/DiaryTitle.css.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';
import GrowingInput from '@/features/common/components/growingInput/GrowingInput.tsx';
import { useContext } from 'react';

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
