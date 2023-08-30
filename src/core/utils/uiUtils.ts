export const attachPositionElement = (
  editor: HTMLElement,
  rect: DOMRect | undefined | null,
) => {
  if (!rect) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    const left =
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2;
    editor.style.left = `${left >= 0 ? left : 10}px`;
  }
};

export const focusContentEditableTextToEnd = (element: HTMLElement) => {
  if (element.innerText.length === 0) {
    element.focus();
    return;
  }
  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
