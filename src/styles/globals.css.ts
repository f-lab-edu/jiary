import { globalStyle } from '@vanilla-extract/css';

/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle(
  'blockquote,body,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,html,iframe,legend,li,ol,p,pre,textarea,ul',
  {
    margin: 0,
    padding: 0,
  }
);

globalStyle('h1,h2,h3,h4,h5,h6', {
  fontSize: '100%',
  fontWeight: 400,
});

globalStyle('ul', {
  listStyle: 'none',
});

globalStyle('button,input, select', {
  margin: 0,
});

globalStyle('*:after', {
  boxSizing: 'inherit',
});

globalStyle('*:before', {
  boxSizing: 'inherit',
});

globalStyle('img, video', {
  display: 'block',
  height: 'auto',
  maxWidth: '100%',
});

globalStyle('iframe', {
  border: 0,
});

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

globalStyle('td, th', {
  padding: 0,
});

globalStyle(':root', {
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
});

globalStyle('button', {
  background: 'inherit',
  border: 'none',
  boxShadow: 'none',
  borderRadius: 0,
  padding: 0,
  overflow: 'visible',
  cursor: 'pointer',
});

globalStyle('a', {
  textDecoration: 'none',
});

globalStyle('textarea', {
  fontFamily: 'sans-serif',
});

globalStyle('body.freeze-scroll', {
  overflow: 'hidden',
  touchAction: 'none',
});
// 사파리에서만 동작(css safari hack)
// @media not all and (min-resolution:.001dpcm) {
//     @supports (-webkit-appearance:none) {
//         padding-right: 6px,
//     }
// }
// &.is--mobile {
//     padding-right: initial;
// }
