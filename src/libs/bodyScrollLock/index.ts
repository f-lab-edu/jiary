import {
  BodyScrollOptions,
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

export const disableScroll = (
  targetElement: HTMLElement | Element,
  options?: BodyScrollOptions,
) => {
  disableBodyScroll(targetElement, options);
};

export const enableScroll = (targetElement: HTMLElement | Element) => {
  enableBodyScroll(targetElement);
};

export const clearAllScrollLocks = () => {
  clearAllBodyScrollLocks();
};
