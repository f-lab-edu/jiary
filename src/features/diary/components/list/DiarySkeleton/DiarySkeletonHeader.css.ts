import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const listHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  marginTop: 30,
  height: 50,
});

export const textWrapper = style({
  display: 'flex',
});

export const saveText = style({
  fontSize: 20,
  fontWeight: 600,
  color: '#000',
  marginTop: '3px',
});

export const countText = style({
  display: 'inline-block',
  marginLeft: 14,
  color: '#000',
  borderRadius: 9,
  background: COLORS.TAG_BACKGROUND,
  width: '26px',
  height: '32px',
});
