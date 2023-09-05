import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const deleteButton = style({
  width: 80,
  height: 30,
  fontSize: 12,
  background: 'hsla(32, 100%, 50%, 0.6)',
  borderRadius: 3,
  zIndex: 3,
  transition: 'all 0.15s ease',
  ':hover': {
    background: 'hsla(32, 100%, 55%, 0.6)',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  selectors: {
    '&:hover&:disabled': {
      background: 'hsla(32, 100%, 50%, 0.6)',
    },
  },
});

export const menuIcon = style({
  transition: 'all 0.3s ease',
  borderRadius: 6,
  ':hover': {
    background: COLORS.BORDER_COLOR,
  },
});
