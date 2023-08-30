import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '40px 60px',
  height: 'calc(100vh - 56px)',
});

export const sectionDivision = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  minHeight: 'calc(100vh - 400px)',
});
