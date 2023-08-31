import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import * as style from '@/features/diary/components/content/DiaryEditor/plugins/EditablePlugin.css.ts';

type Props = {
  documentData: string;
};

export function EditablePlugin({ documentData }: Props) {
  const [editor] = useLexicalComposerContext();
  const [isEditable, setIsEditable] = useState(false);

  const setEditable = (isEdit: boolean) => {
    editor.setEditable(isEdit);
    setIsEditable(isEdit);
  };

  useEffect(() => {
    if (!documentData) {
      setEditable(true);
      return;
    }
    editor.setEditable(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={`${style.toolbarCover} ${!isEditable ? 'none-edit' : ''}`}
      ></div>
      <button
        className={`${style.editButton} ${!isEditable ? 'none-edit' : ''}`}
        onClick={() => setEditable(!isEditable)}
      >
        {!isEditable ? '편집하기' : '완료하기'}
      </button>
    </>
  );
}
