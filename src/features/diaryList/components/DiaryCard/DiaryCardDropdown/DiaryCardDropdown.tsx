import menu from '@/static/diary/menu.svg';
import Image from 'next/image';
import useDeleteFile from '@/features/diaryList/apis/mutations/useDeleteFile.ts';
import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import * as style from '@/features/diaryList/components/DiaryCard/DiaryCardDropdown/DiaryCardDropdown.css.ts';

export default function DiaryCardDropdown({ id }: { id: string }) {
  const deleteMutation = useDeleteFile();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Image
          src={menu}
          width={30}
          height={30}
          alt="menu"
          className={style.menuIcon}
        />
      </Dropdown.Trigger>
      <Dropdown.List>
        <button
          onClick={() => deleteMutation.mutate(id)}
          className={style.deleteButton}
        >
          삭제
        </button>
      </Dropdown.List>
    </Dropdown>
  );
}
