import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

type Props = {
  canUndo: boolean;
  canRedo: boolean;
};

export function UndoToolbar({ canUndo, canRedo }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
    </>
  );
}
