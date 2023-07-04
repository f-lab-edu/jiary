import menu from '@/static/diary/menu.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import useDeleteDoc from '@/features/diaryList/apis/mutations/useDeleteDoc.ts';
import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import * as style from '@/features/diaryList/components/DiaryCardDropdown/DiaryCardDropdown.css.ts';

export default function DiaryCardDropdown({ id }: { id: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const targetRef = useRef(null);
  const deleteMutation = useDeleteDoc();

  const handleDeleteButton = () => {
    deleteMutation.mutate(id);
    setIsDropdownOpen(false);
  };

  const targetElement = (
    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} ref={targetRef}>
      <Image
        src={menu}
        width={30}
        height={30}
        alt="menu"
        className={style.menuIcon}
      />
    </button>
  );

  return (
    <Dropdown
      target={{ targetElement, targetRef }}
      control={{ isDropdownOpen, setIsDropdownOpen }}
    >
      <button onClick={handleDeleteButton} className={style.deleteButton}>
        삭제
      </button>
    </Dropdown>
  );
}
