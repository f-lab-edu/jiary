import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

type Props = {
  isStrikethrough: boolean;
};

export function StrikethroughToolbar({ isStrikethrough }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      }}
      className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
      aria-label="Format Strikethrough"
    >
      <i className="format strikethrough" />
    </button>
  );
}
