import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  flex: 1,
  background: '#fff',
  borderRadius: 10,
});

export const mapSection = style({
  height: 'calc(100vh - 200px)',
});
