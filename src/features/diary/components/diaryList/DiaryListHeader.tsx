import * as style from '@/features/diary/components/diaryList/DiaryListHeader.css.ts';
import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import { useRef, useState } from 'react';

export default function DiaryListHeader({ count }: { count: number }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const control = { isDropdownOpen, setIsDropdownOpen };
  const targetRef = useRef(null);

  const handleOpenDropdown = () => {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
    return;
  };

  const handleCreateDoc = () => {
    console.log('title!', inputValue);
    setIsDropdownOpen(false);
  };

  const targetElement = (
    <button
      onClick={handleOpenDropdown}
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

      <Dropdown
        target={{ targetElement, targetRef }}
        control={control}
        inputs={{ inputValue, setInputValue }}
        submitCallback={handleCreateDoc}
      >
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
