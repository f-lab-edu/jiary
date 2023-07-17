import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { MutableRefObject, useEffect } from 'react';

type Props = {
  initValue: string;
  editorRef: MutableRefObject<HTMLElement | null>;
};

function InitalPlugin({ editorRef }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = editor._rootElement;
    }
  }, [editor, editorRef]);

  return null;
}

export default InitalPlugin;
