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
import { $getSelection, SELECTION_CHANGE_COMMAND } from 'lexical';
import FloatInput from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/mapToolbar/FloatInput.tsx';

type Props = {
  setIsMap: Dispatch<SetStateAction<boolean>>;
};

export default function FloatingMapEditor({ setIsMap }: Props) {
  const [editor] = useLexicalComposerContext();
  const [isEditMode, setEditMode] = useState(false);
  const editorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const updateMapEditor = useCallback(() => {
    const selection = $getSelection();
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;
    if (editorElem === null) {
      return;
    }
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
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect();
      }
      attachPositionElement(editorElem, rect);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      attachPositionElement(editorElem, null);
    }

    return true;
  }, [editor]);

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
        <FloatInput isEditMode={isEditMode} setIsMap={setIsMap} />
      ) : (
        <>
          <div className="link-input">
            {/* TODO: 이전 값 들어가도록 작업 */}
            <button>{'이전 값이 들어가야 함'}</button>
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
