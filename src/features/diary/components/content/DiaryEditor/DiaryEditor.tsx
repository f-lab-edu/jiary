import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical/LexicalEditorState';

import ToolbarPlugin from './plugins/ToolbarPlugin.tsx';
import * as style from '@/features/diary/components/content/DiaryEditor/DiaryEditor.css.ts';
import AutoLinkPlugin from './plugins/AutoLinkPlugin.tsx';
import InitalPlugin from '@/features/diary/components/content/DiaryEditor/plugins/InitialPlugin.tsx';
import usePatchFile from '@/features/diary/apis/mutations/usePatchFile.ts';
import { debounce } from '@/core/utils/eventUtils.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import editorTheme from '@/features/diary/components/content/DiaryEditor/themes/editorTheme.ts';

import { useRef } from 'react';

type Props = {
  document: string;
  metaData: MetaData;
  diaryId: string;
};

export default function DiaryEditor({ document, metaData, diaryId }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const debounceId = useRef<number | null>(null);
  const value = useRef<string>(document);
  const patchMutation = usePatchFile();

  const saveData = () => {
    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob([JSON.stringify({ name: metaData.name })], {
        type: 'application/json',
      })
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
        editorState: document ? JSON.stringify(document) : null,
        theme: editorTheme,
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          AutoLinkNode,
          LinkNode,
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
          <InitalPlugin initValue={document} editorRef={editorRef} />
        </div>
      </div>
    </LexicalComposer>
  );
}
