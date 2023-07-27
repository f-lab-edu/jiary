export const attachPositionElement = (
  editor: HTMLElement,
  rect: DOMRect | undefined | null
) => {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    if (rect?.top && rect.height) {
      editor.style.opacity = '1';
      editor.style.top = `${
        rect.top + rect.height + window.pageYOffset + 10
      }px`;
      const left =
        rect.left +
        window.pageXOffset -
        editor.offsetWidth / 2 +
        rect.width / 2;
      editor.style.left = `${left >= 0 ? left : 10}px`;
    }
  }
};
