import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: 900,
  margin: '0 auto',
  padding: '40px 0',
});

export const ul = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 280px)',
  gridGap: 30,
});
