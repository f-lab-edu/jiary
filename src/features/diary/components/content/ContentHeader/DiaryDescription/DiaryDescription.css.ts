import { globalStyle, style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const container = style({
  display: 'flex',
  gap: 4,
  marginTop: 18,
  marginBottom: 18,
  height: '20px',
  alignItems: 'center',
});

globalStyle('svg.earth-icon > path', {
  fill: COLORS.THIRD_TEXT_COLOR,
});
globalStyle('svg.earth-icon > circle', {
  stroke: COLORS.THIRD_TEXT_COLOR,
});
