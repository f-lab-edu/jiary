import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import { useContext } from 'react';
import { DropdownContext } from '@/features/common/components/dropdown/Dropdown.tsx';

export default function SubmitButton({ text }: { text: string }) {
  const { inputs, submitCallback } = useContext(DropdownContext);

  return (
    <button
      onClick={submitCallback}
      disabled={!inputs?.inputValue}
      className={style.submitButton}
    >
      {text}
    </button>
  );
}
