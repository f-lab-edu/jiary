import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  // ChangeEvent,
  // ChangeEventHandler,
  useCallback,
  useEffect,
  // useMemo,
  useRef,
  useState,
} from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  RangeSelection,
} from 'lexical';
import { $isLinkNode } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import BlockToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/BlockToolbar';
import LinkToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/LinkToolbar';
import UndoToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/UndoToolbar.tsx';
import BoldToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/BoldToolbar.tsx';
import ItalicToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/ItalicToolbar.tsx';
import UnderlineToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/UnderlineToolbar.tsx';
import StrikethroughToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/StrikethroughToolbar.tsx';
import DirectionToolbar from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/DirectionToolbar.tsx';

const LowPriority = 1;

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  // const [showMapDropDown, setShowMapDropDown] = useState(false);

  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <UndoToolbar canUndo={canUndo} canRedo={canRedo} />
      <div className="divider" />
      <BlockToolbar blockType={blockType} toolbarRef={toolbarRef} />
      <div className="divider" />
      <BoldToolbar isBold={isBold} />
      <ItalicToolbar isItalic={isItalic} />
      <UnderlineToolbar isUnderline={isUnderline} />
      <StrikethroughToolbar isStrikethrough={isStrikethrough} />
      <LinkToolbar isLink={isLink} getSelectedNode={getSelectedNode} />
      <div className="divider" />
      <DirectionToolbar />

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
        className={'toolbar-item spaced map'}
        aria-label="Insert Map"
      >
        <i className="format map" />
      </button>
    </div>
  );
}
