import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import FloatingMapEditor from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/mapToolbar/FloatingMapEditor.tsx';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

type Props = {
  isMap: boolean;
  setIsMap: Dispatch<SetStateAction<boolean>>;
};

export function MapToolbar({ isMap, setIsMap }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        className={'toolbar-item spaced map ' + (isMap ? 'active' : '')}
        aria-label="Insert Map"
      >
        <i className="format map" />
      </button>

      {isMap &&
        createPortal(<FloatingMapEditor setIsMap={setIsMap} />, document.body)}
    </>
  );
}
