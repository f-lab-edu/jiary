import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical/LexicalEditorState';

import {
  InitalPlugin,
  PlaygroundAutoLinkPlugin as AutoLinkPlugin,
  ToolbarPlugin,
} from '@/features/diary/components/content/DiaryEditor/plugins/index.ts';
import usePatchFile from '@/features/diary/apis/mutations/usePatchFile.ts';
import { debounce } from '@/core/utils/eventUtils.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import editorTheme from '@/features/diary/components/content/DiaryEditor/themes/editorTheme.ts';

import * as style from '@/features/diary/components/content/DiaryEditor/DiaryEditor.css.ts';
import { useRef } from 'react';
import { MapInfoNode } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';
import { MarkerSetPlugin } from '@/features/diary/components/content/DiaryEditor/plugins/MarkerSetPlugin.tsx';

type Props = {
  documentData: string;
  metaData: MetaData;
  diaryId: string;
};

export default function DiaryEditor({
  documentData,
  metaData,
  diaryId,
}: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const debounceId = useRef<number | null>(null);
  const value = useRef<string>(documentData);
  const patchMutation = usePatchFile();

  const saveData = () => {
    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob([JSON.stringify({ name: metaData.name })], {
        type: 'application/json',
      }),
    );
    formData.append('media', new Blob([value.current], { type: 'text/plain' }));

    patchMutation.mutate({
      fileId: diaryId,
      multipartData: formData,
    });
  };

  const handleDebounceChange = debounce(saveData, 1000);
  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      value.current = JSON.stringify(editorState.toJSON());
      debounceId.current = handleDebounceChange();
    });
  };

  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'MyEditor',
        onError(error: Error) {
          throw error;
        },
        editorState: documentData ? JSON.stringify(documentData) : null,
        theme: editorTheme,
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          AutoLinkNode,
          LinkNode,
          CodeNode,
          MapInfoNode,
        ],
        // editable: false,
      }}
    >
      <div className={`${style.wrapper} editor-container`}>
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
          <HistoryPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <InitalPlugin initValue={documentData} editorRef={editorRef} />
          <MarkerSetPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
