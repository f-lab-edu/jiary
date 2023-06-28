import { globalStyle, style } from '@vanilla-extract/css';

export const header = style({
  position: 'fixed',
  height: 56,
  left: 0,
  minWidth: 300,
  top: 0,
  transition: 'top .3s',
  width: '100%',
  zIndex: 4000,
  background: '#1a1b1e',
});

export const nav = style({
  height: '100%',
});

export const ul = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  maxWidth: 800,
  margin: '0 auto',
});

export const sideDiv = style({
  display: 'flex',
  alignItems: 'center',
  height: 35,
});

export const li = style({
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
});

export const a = style({
  display: 'flex',
  padding: 4,
  color: '#fff',
  transition: '0.15s ease',
  opacity: 1,
  height: 22,
  lineHeight: '24px',
  selectors: {
    [`${li}:hover &`]: {
      opacity: 0.5,
    },
  },
});

globalStyle(`${ul} li:not(:first-child)`, {
  marginLeft: 20,
});

export const imageLogoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  borderRadius: '50%',
  width: 35,
  height: 35,
  boxShadow: 'inset 0 0 0 3px hsl(230deg 6% 23%)',
});
