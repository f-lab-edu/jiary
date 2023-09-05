import { ElementNode, RangeSelection, TextNode } from 'lexical';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import FloatingMapEditor from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/mapToolbar/FloatingMapEditor.tsx';

type Props = {
  isMap: boolean;
  changeIsMapState: (isMap: boolean) => void;
  getSelectedNode: (selection: RangeSelection) => TextNode | ElementNode;
};

export function MapToolbar({
  isMap,
  changeIsMapState,
  getSelectedNode,
}: Props) {
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => changeIsMapState(true)}
        className={'toolbar-item spaced map ' + (isMap ? 'active' : '')}
        aria-label="Insert Map"
      >
        <i className="format map" />
      </button>

      {isMap &&
        createPortal(
          <FloatingMapEditor
            changeIsMapState={changeIsMapState}
            getSelectedNode={getSelectedNode}
            buttonRef={buttonRef}
          />,
          document.body,
        )}
    </>
  );
}
