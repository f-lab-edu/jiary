import { style } from '@vanilla-extract/css';

export const container = style({
  padding: 50,
});

export const title = style({
  fontWeight: 700,
  fontSize: 24,
});

export const content = style({
  whiteSpace: 'pre-wrap',
  border: '2px solid black',
  padding: 15,
  ':focus-visible': {
    outline: 'none',
  },
});
