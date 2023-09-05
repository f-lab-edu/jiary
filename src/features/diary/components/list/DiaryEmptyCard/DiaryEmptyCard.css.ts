import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const container = style({
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100vh - 350px)',
});

export const title = style({
  fontWeight: 700,
  fontSize: 44,
  marginBottom: 32,
});

export const description = style({
  fontSize: 22,
  color: COLORS.THIRD_TEXT_COLOR,
  fontWeight: 600,
});
