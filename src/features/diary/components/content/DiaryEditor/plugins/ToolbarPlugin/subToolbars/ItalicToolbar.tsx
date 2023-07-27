import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {
  isItalic: boolean;
};

export function ItalicToolbar({ isItalic }: Props) {
  const [editor] = useLexicalComposerContext();
  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
      }}
      className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
      aria-label="Format Italics"
    >
      <i className="format italic" />
    </button>
  );
}
