// import {
//   $createMapNode,
//   $getMapNode,
// } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { $getRoot } from 'lexical';
import { MutableRefObject, useEffect } from 'react';

type Props = {
  initValue: string;
  editorRef: MutableRefObject<HTMLElement | null>;
};

export function InitalPlugin({ editorRef }: Props) {
  const [editor] = useLexicalComposerContext();

  editor.update(() => {
    // TODO: editor의 가장 끝 부분에 map 정보를 담은 node를 추가하려 함.
    // const root = $getRoot();
    // if (!$getMapNode()) {
    //   const mapNode = $createMapNode();
    //   root.append(mapNode);
    // }
  });

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = editor._rootElement;
    }
  }, [editor, editorRef]);

  return null;
}
