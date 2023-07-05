import * as style from '@/features/common/components/dropdown/Dropdown.css.ts';
import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DropdownContext } from '@/features/common/components/dropdown/Dropdown.tsx';

type InputProps = {
  maxLength?: number;
  requiredText?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
};

export default function Input({
  maxLength,
  requiredText = undefined,
  value,
  onChange,
  onKeyUp,
}: InputProps) {
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);
  const { setIsShow } = useContext(DropdownContext);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement | null;
    input?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!requiredText) {
      return;
    }
    const input = inputRef.current as HTMLInputElement | null;
    setIsValid(!!input?.value);
    onChange(e);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyUp(e);
    if (e.key === 'Enter') {
      setIsShow(false);
    }
  };

  return (
    <>
      <input
        className={style.input}
        type="text"
        maxLength={maxLength}
        value={value}
        ref={inputRef}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {!isValid && <span className={style.requiredText}>{requiredText}</span>}
    </>
  );
}
