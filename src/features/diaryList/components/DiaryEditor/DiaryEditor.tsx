import ExampleTheme from './themes/ExampleTheme.ts';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin.tsx';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import AutoLinkPlugin from './plugins/AutoLinkPlugin.tsx';
import InitalPlugin from '@/features/diaryList/components/DiaryEditor/plugins/InitialPlugin.tsx';
import { EditorState } from 'lexical/LexicalEditorState';
import { $getRoot } from 'lexical';
import * as style from '@/features/diaryList/components/DiaryEditor/DiaryEditor.css.ts';
import { KeyboardEvent, useRef } from 'react';
import { debounce } from '@/core/utils/eventUtils.ts';
import { PREVENT_KEYS } from '@/constants/keyboard.ts';
import { MetaData } from '@/features/diaryList/apis/interfaces.ts';

type Props = {
  document: string;
  metaData: MetaData;
  saveData: (value: string, metaData?: MetaData) => void;
};

export default function DiaryEditor2({ document, metaData, saveData }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const value = useRef<string>('');
  const debounceId = useRef<number | null>(null);

  const handleDebounceChange = debounce(saveData, 2000);
  const handleChange = (editorState: EditorState) => {
    // console.log('handleChange!!');
    editorState.read(() => {
      value.current = $getRoot().getTextContent() || '';
      debounceId.current = handleDebounceChange(value.current);
    });
  };

  const preventDebounce = () => {
    if (!debounceId.current) return;
    clearTimeout(debounceId.current);
    debounceId.current = null;
    saveData(value.current);
  };

  const handleClick = () => {
    // preventDebounce()
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // if (PREVENT_KEYS.indexOf(e.key) > -1) {
    //   preventDebounce();
    // }
  };

  return (
    <>
      <button onClick={() => saveData(value.current)}>click</button>
      <LexicalComposer
        initialConfig={{
          namespace: 'MyEditor',
          onError(error: Error) {
            throw error;
          },
          theme: ExampleTheme,
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
              contentEditable={
                <ContentEditable
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  className="editor-input"
                />
              }
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
    </>
  );
}
