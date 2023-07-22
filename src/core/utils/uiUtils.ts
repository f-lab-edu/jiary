export const freezeScroll = () => {
  if (!document.body.classList.contains('freeze-scroll')) {
    document.body.classList.add('freeze-scroll');
  }
};

export const releaseScroll = () => {
  if (document.body.classList.contains('freeze-scroll')) {
    document.body.classList.remove('freeze-scroll');
  }
};
