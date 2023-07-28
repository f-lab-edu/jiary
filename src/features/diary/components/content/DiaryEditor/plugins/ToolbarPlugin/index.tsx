import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
  RangeSelection,
} from 'lexical';
import { $isCodeNode } from '@lexical/code';
import { $isLinkNode } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  BlockToolbar,
  BoldToolbar,
  DirectionToolbar,
  ItalicToolbar,
  LinkToolbar,
  StrikethroughToolbar,
  UnderlineToolbar,
  UndoToolbar,
  MapToolbar,
} from '@/features/diary/components/content/DiaryEditor/plugins/ToolbarPlugin/subToolbars/index.ts';

const LOW_PRIORITY = 1;

const getSelectedNode = (selection: RangeSelection) => {
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
};

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [disabledUndo, setDisabledUndo] = useState(true);
  const [disabledRedo, setDisabledRedo] = useState(true);
  const [blockType, setBlockType] = useState('paragraph');
  const [isLink, setIsLink] = useState(false);
  const [isMap, setIsMap] = useState(false);
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
          if ($isCodeNode(element)) {
            return;
          }
        }
      }

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsMap(selection.hasFormat('code'));

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
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setDisabledUndo(!payload);
          return false;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setDisabledRedo(!payload);
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [editor, updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <UndoToolbar disabledUndo={disabledUndo} disabledRedo={disabledRedo} />
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
      <MapToolbar
        isMap={isMap}
        setIsMap={setIsMap}
        getSelectedNode={getSelectedNode}
      />
    </div>
  );
}
