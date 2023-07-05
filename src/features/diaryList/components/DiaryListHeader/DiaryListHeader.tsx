import * as style from '@/features/diaryList/components/DiaryListHeader/DiaryListHeader.css.ts';
import Dropdown from '@/features/common/components/dropdown/Dropdown.tsx';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import useCreateDoc from '@/features/diaryList/apis/mutations/useCreateDoc.ts';
import { useRouter } from 'next/router';

export default function DiaryListHeader({ count }: { count: number }) {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const createDocMutation = useCreateDoc();
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
    setIsDisabled(!target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInputValue('');
      handleCreateDoc();
    }
  };

  const handleCreateDoc = () => {
    createDocMutation.mutate(inputValue, {
      onSuccess({ documentId }) {
        router.push(`/diary/${documentId}`);
      },
    });
  };

  return (
    <div className={style.listHeader}>
      <div>
        <span className={style.saveText}>Saved </span>
        <span className={style.countText}>{count}</span>
      </div>

      <Dropdown>
        <Dropdown.Trigger className={style.newButton}>New</Dropdown.Trigger>
        <Dropdown.List width="200px">
          <Dropdown.Title title="제목을 입력해주세요" />
          <Dropdown.Input
            maxLength={30}
            requiredText="👋 제목 입력은 필수 입니다."
            value={inputValue}
            onChange={handleOnChange}
            onKeyUp={handleKeyUp}
          />
          <Dropdown.SubmitButton
            onClick={handleCreateDoc}
            disabled={isDisabled}
          >
            제출
          </Dropdown.SubmitButton>
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
