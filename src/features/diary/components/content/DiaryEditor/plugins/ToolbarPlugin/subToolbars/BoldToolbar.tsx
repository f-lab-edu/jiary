import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

type Props = {
  isBold: boolean;
};

export default function BoldToolbar({ isBold }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
      }}
      className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
      aria-label="Format Bold"
    >
      <i className="format bold" />
    </button>
  );
}
