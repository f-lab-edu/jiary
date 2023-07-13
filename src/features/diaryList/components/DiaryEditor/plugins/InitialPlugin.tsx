import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createTextNode, LexicalNode } from 'lexical';
import { MutableRefObject, useEffect } from 'react';

type Props = {
  initValue: string;
  editorRef: MutableRefObject<HTMLElement | null>;
};

function InitalPlugin({ initValue, editorRef }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = editor._rootElement;
    }
  }, [editor, editorRef]);

  useEffect(() => {
    editor.update(() => {
      if (!initValue) return;

      const root = $getRoot();
      const paragraphNode = root.getFirstChild() as LexicalNode;
      const textNode = $createTextNode(initValue);
      paragraphNode.append(textNode);
      root.append(paragraphNode);
    });
    editor.focus();
  }, [editor, initValue]);

  return null;
}

export default InitalPlugin;
