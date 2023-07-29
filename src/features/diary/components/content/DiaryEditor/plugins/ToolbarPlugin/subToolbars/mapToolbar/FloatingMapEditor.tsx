import { mergeRegister } from '@lexical/utils';
import { attachPositionElement } from '@/core/utils/uiUtils.ts';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  ElementNode,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
  TextNode,
} from 'lexical';
import FloatInput from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/mapToolbar/FloatInput.tsx';
import * as style from '@/features/diary/components/content/DiaryEditor/DiaryEditor.css.ts';

type Props = {
  setIsMap: Dispatch<SetStateAction<boolean>>;
  getSelectedNode: (selection: RangeSelection) => TextNode | ElementNode;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export default function FloatingMapEditor({
  setIsMap,
  getSelectedNode,
  buttonRef,
}: Props) {
  const [editor] = useLexicalComposerContext();
  const [isEditMode, setEditMode] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [selectedNode, setSelectedNode] = useState<
    TextNode | ElementNode | null
  >(null);
  const editorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const updateMapEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      setSelectedNode(node);
      setPlaceName(node?.__text || '');
    }

    const editorElem = editorRef.current;
    if (!editorElem) return;

    const nativeSelection = window.getSelection();
    // const activeElement = document.activeElement;
    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      nativeSelection &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);

      let rect: DOMRect | undefined;
      if (nativeSelection?.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild !== null) {
          inner = inner.firstElementChild as HTMLElement;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect();
      }
      attachPositionElement(editorElem, rect);
    } else if (
      nativeSelection?.isCollapsed &&
      nativeSelection?.anchorNode?.hasChildNodes()
    ) {
      attachPositionElement(
        editorElem,
        buttonRef.current?.getBoundingClientRect()
      );
    } else {
      attachPositionElement(editorElem, null);
    }
    setEditMode(false);

    return true;
  }, [editor, getSelectedNode, buttonRef]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateMapEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateMapEditor();
          return true;
        },
        1
      )
    );
  }, [editor, updateMapEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateMapEditor();
    });
  }, [editor, updateMapEditor]);

  const closeFloating = useCallback(
    (e: Event) => {
      const event = e as unknown as KeyboardEvent;
      if (event.key === 'Escape') {
        setIsMap(false);
      }
    },
    [setIsMap]
  );
  useEffect(() => {
    window.addEventListener('keydown', closeFloating);
    return () => window.removeEventListener('keydown', closeFloating);
  }, [closeFloating]);

  return (
    <div ref={editorRef} className="link-editor map">
      {isEditMode ? (
        <FloatInput
          isEditMode={isEditMode}
          setIsMap={setIsMap}
          selectedNode={selectedNode}
          placeName={placeName}
        />
      ) : (
        <>
          <div className="link-input">
            <button
              className={style.inputButton}
              onClick={() => setEditMode(true)}
            >
              {placeName}
            </button>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
