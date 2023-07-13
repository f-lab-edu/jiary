import ExampleTheme from './themes/ExampleTheme.ts';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
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
import { $getRoot, $getSelection, RangeSelection } from 'lexical';
import * as style from '@/features/diaryList/components/DiaryEditor/DiaryEditor.css.ts';
import { KeyboardEvent, useEffect, useRef } from 'react';
import useCaret from '@/features/diaryList/components/DiaryEditor/hooks/useCaret.tsx';
import { callDiffApi } from '@/core/utils/docUtils.ts';
import { debounce } from '@/core/utils/eventUtils.ts';
import { PREVENT_KEYS } from '@/constants/keyboard.ts';

type Props = {
  docId: string;
  content: string;
};
export default function DiaryEditor2({ docId, content }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const value = useRef<string>('');
  const oldValue = useRef<string>('');
  const debounceId = useRef<number | null>(null);
  const caretLocation = useRef<number | null>(null);
  const { getSelectedParagraphNode, getCaretIndex } = useCaret();

  useEffect(() => {
    oldValue.current = content;
  }, [content]);

  const callApi = () => {
    if (!caretLocation.current || !value.current) return;
    callDiffApi({
      oldValue: oldValue.current,
      newValue: value.current,
      caretLocation: caretLocation.current,
      docId,
    });

    oldValue.current = value.current;
  };

  // const handleDebounceChange = debounce(callApi, 2000);
  const handleDebounceChange = debounce(callApi, 2000);
  const handleChange = (editorState: EditorState) => {
    const caretLoction = getCaretIndex(editorRef.current);

    editorState.read(() => {
      const allContent = $getRoot().getTextContent() || '';
      const selection = $getSelection() as RangeSelection;
      const paragraphNode = getSelectedParagraphNode(selection);
      const previous = paragraphNode.getPreviousSiblings();

      value.current = allContent;
      caretLocation.current = caretLoction + previous.length + 1;
      debounceId.current = handleDebounceChange();
    });
  };

  const preventDebounce = () => {
    if (!debounceId.current) return;
    clearTimeout(debounceId.current);
    debounceId.current = null;
    callApi();
  };

  const handleClick = () => preventDebounce();
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (PREVENT_KEYS.indexOf(e.key) > -1) {
      preventDebounce();
    }
  };

  return (
    <>
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
            <OnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <InitalPlugin initValue={content} editorRef={editorRef} />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
