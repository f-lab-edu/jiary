import Earth from 'public/icons/earth.svg';
import { useContext } from 'react';

import GrowingInput from '@/features/common/components/growingInput/GrowingInput.tsx';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';

import * as style from '@/features/diary/components/content/ContentHeader/DiaryDescription/DiaryDescription.css.ts';

type Props = {
  metaData: MetaData | undefined;
};

export default function DiaryDescription({ metaData }: Props) {
  const { saveDiary } = useContext(MapContext);

  const saveMethod = (value: string) =>
    saveDiary({ metaData: { description: value } });

  return (
    <div className={style.container}>
      <Earth className="earth-icon" />
      <GrowingInput
        title={metaData?.description}
        saveMethod={saveMethod}
        small
      />
    </div>
  );
}
