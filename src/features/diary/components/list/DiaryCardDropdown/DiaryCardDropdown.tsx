import Image from 'next/image';

import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import useDeleteFile from '@/features/diary/apis/mutations/useDeleteFile.ts';

import * as style from '@/features/diary/components/list/DiaryCardDropdown/DiaryCardDropdown.css.ts';

export default function DiaryCardDropdown({ id }: { id: string }) {
  const deleteMutation = useDeleteFile();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Image
          src="/icons/menu.svg"
          width={30}
          height={30}
          alt="menu"
          className={style.menuIcon}
        />
      </Dropdown.Trigger>
      <Dropdown.List width="100px">
        <Dropdown.SubmitButton onClick={() => deleteMutation.mutate(id)}>
          삭제
        </Dropdown.SubmitButton>
      </Dropdown.List>
    </Dropdown>
  );
}
