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
import { debounce } from '@/core/utils/eventUtils.ts';
import { MetaData } from '@/features/diary/apis/interfaces.ts';
import editorTheme from '@/features/diary/components/content/DiaryEditor/themes/editorTheme.ts';

import * as style from '@/features/diary/components/content/DiaryEditor/DiaryEditor.css.ts';
import { memo, useCallback, useContext, useRef } from 'react';
import { MapInfoNode } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';
import { MarkerSetPlugin } from '@/features/diary/components/content/DiaryEditor/plugins/MarkerSetPlugin.tsx';
import MapContext from '@/features/diary/contexts/MapContext.ts';

type Props = {
  documentData: string;
  metaData: MetaData;
};

export default memo(function DiaryEditor({ documentData, metaData }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const value = useRef<string>(documentData);
  const { saveDiary } = useContext(MapContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounceChange = useCallback(debounce(saveDiary, 1000), []);
  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      value.current = JSON.stringify(editorState.toJSON());
      handleDebounceChange(value, metaData);
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
});
