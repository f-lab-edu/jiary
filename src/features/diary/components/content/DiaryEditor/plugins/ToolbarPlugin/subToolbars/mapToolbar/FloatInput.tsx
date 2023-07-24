import { useMapAutocomplete } from '@/features/diary/hooks/useMapAutocomplete.ts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type FlotInputProps = {
  isEditMode: boolean;
  setIsMap: Dispatch<SetStateAction<boolean>>;
};

export default function FloatInput({ isEditMode, setIsMap }: FlotInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const { autocomplete } = useMapAutocomplete(inputRef);

  useEffect(() => {
    if (isEditMode && inputRef) {
      inputRef.focus();
    }
  }, [isEditMode, inputRef]);

  useEffect(() => {
    if (!autocomplete) return;
    autocomplete?.addListener('place_changed', () => {
      // TODO: 데이터 가공
      // const place = autocomplete?.getPlace();
    });
  }, [autocomplete]);

  return (
    <input
      ref={node => setInputRef(node)}
      className="link-input"
      onKeyDown={event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          setIsMap(false);
          // autocomplete?.unbind();
        }
      }}
    />
  );
}
