import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

type Props = {
  disabledUndo: boolean;
  disabledRedo: boolean;
};

export function UndoToolbar({ disabledUndo, disabledRedo }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <button
        disabled={disabledUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={disabledRedo}
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
