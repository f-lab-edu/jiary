import { Dispatch, SetStateAction, useRef } from 'react';
import { createPortal } from 'react-dom';
import FloatingMapEditor from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/mapToolbar/FloatingMapEditor.tsx';
import { ElementNode, RangeSelection, TextNode } from 'lexical';

type Props = {
  isMap: boolean;
  setIsMap: Dispatch<SetStateAction<boolean>>;
  getSelectedNode: (selection: RangeSelection) => TextNode | ElementNode;
};

export function MapToolbar({ isMap, setIsMap, getSelectedNode }: Props) {
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsMap(true)}
        className={'toolbar-item spaced map ' + (isMap ? 'active' : '')}
        aria-label="Insert Map"
      >
        <i className="format map" />
      </button>

      {isMap &&
        createPortal(
          <FloatingMapEditor
            setIsMap={setIsMap}
            getSelectedNode={getSelectedNode}
            buttonRef={buttonRef}
          />,
          document.body
        )}
    </>
  );
}
