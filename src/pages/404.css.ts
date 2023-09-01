import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: '#000084',
  color: '#bbb',
  fontSize: '20px',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const notfound = style({
  width: '70ch',
  height: '25ch',
  backgroundColor: '#000084',
});

export const row = style({
  textAlign: 'left',
});

export const centered = style({
  textAlign: 'center',
});

export const inverted = style({
  backgroundColor: '#bbb',
  color: '#000084',
});

export const shadow = style({
  backgroundColor: '#000',
  color: '#000084',
});

const blinkingText = keyframes({
  '0%': {
    opacity: 0,
  },

  '49%': {
    opacity: 0,
  },

  '50%': {
    opacity: 1,
  },
});

export const blink = style({
  animation: `${blinkingText} .8s infinite`,
});
