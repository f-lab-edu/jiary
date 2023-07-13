import { $isAtNodeEnd } from '@lexical/selection';
import { RangeSelection } from 'lexical/LexicalSelection';
import { ElementNode, TextNode, $isParagraphNode } from 'lexical';

const useCaret = () => {
  // 항상 paragraphNode만 반환한다.
  function getSelectedParagraphNode(selection: RangeSelection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    let targetNode: TextNode | ElementNode;
    if (anchorNode === focusNode) {
      targetNode = anchorNode;
    } else {
      // 드래그 했을 경우.
      const isBackward = selection.isBackward();
      if (isBackward) {
        targetNode = $isAtNodeEnd(focus) ? anchorNode : focusNode;
      } else {
        targetNode = $isAtNodeEnd(anchor) ? focusNode : anchorNode;
      }
    }

    while (!$isParagraphNode(targetNode)) {
      targetNode = targetNode.getParent() as TextNode | ElementNode;
    }
    return targetNode;
  }

  const getCaretIndex = (element: HTMLDivElement | null) => {
    if (!element) return 0;

    let position = 0;
    const isSupported = typeof window.getSelection !== 'undefined';
    if (isSupported) {
      const selection = window.getSelection();
      if (selection && selection?.rangeCount !== 0) {
        const range = selection.getRangeAt(0);

        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);

        position = preCaretRange.toString().length;
      }
    }
    return position;
  };

  return { getSelectedParagraphNode, getCaretIndex };
};

export default useCaret;
