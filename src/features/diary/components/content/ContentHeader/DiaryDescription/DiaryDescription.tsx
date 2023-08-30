import { MetaData } from '@/features/diary/apis/interfaces.ts';
import * as style from '@/features/diary/components/content/ContentHeader/DiaryDescription/DiaryDescription.css.ts';
import Earth from 'public/icons/earth.svg';
import { useContext } from 'react';
import MapContext from '@/features/diary/contexts/MapContext.ts';
import GrowingInput from '@/features/common/components/growingInput/GrowingInput.tsx';

type Props = {
  metaData: MetaData | undefined;
};

export default function DiaryDescription({ metaData }: Props) {
  const { saveDiary } = useContext(MapContext);

  const saveMethod = (value: string) =>
    saveDiary({ metaData: { description: value } });

  return (
    <div className={style.container}>
      {/* <Image src={earth} width={20} height={20} alt="earth icon" /> */}
      <Earth className="earth-icon" />
      <GrowingInput
        title={metaData?.description}
        saveMethod={saveMethod}
        small
      />
    </div>
  );
}
