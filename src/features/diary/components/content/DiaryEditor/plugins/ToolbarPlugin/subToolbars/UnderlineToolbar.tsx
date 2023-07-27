import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

type Props = {
  isUnderline: boolean;
};

export function UnderlineToolbar({ isUnderline }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
      }}
      className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
      aria-label="Format Underline"
    >
      <i className="format underline" />
    </button>
  );
}
