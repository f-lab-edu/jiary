import * as style from '@/features/diary/components/diaryList/DiaryListHeader.css.ts';
import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import { useRef, useState } from 'react';

export default function DiaryListHeader({ count }: { count: number }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const control = { isDropdownOpen, setIsDropdownOpen };
  const targetRef = useRef(null);

  const handleCreateDoc = () => {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
    return;
  };

  const targetElement = (
    <button
      onClick={handleCreateDoc}
      className={style.newButton}
      ref={targetRef}
    >
      New
    </button>
  );

  return (
    <div className={style.listHeader}>
      <div>
        <span className={style.saveText}>Saved </span>
        <span className={style.countText}>{count}</span>
      </div>

      <Dropdown target={{ targetElement, targetRef }} control={control}>
        <Dropdown.Title title="제목을 입력해주세요" />
        <Dropdown.Input
          maxLength={30}
          requiredText="👋 제목 입력은 필수 입니다."
        />
        <Dropdown.SubmitButton text="제출" />
      </Dropdown>
    </div>
  );
}
