import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const userImage = style({
  borderRadius: '50%',
  opacity: 1,
  padding: 4,
  transition: '0.15s ease',
  ':hover': {
    opacity: 0.5,
  },
});

export const logoutButton = style({
  background: COLORS.RED_COLOR,
  width: 60,
  height: 30,
  borderRadius: 6,
  color: '#fff',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: '150%',
  transition: 'all 0.15s ease',
  ':hover': {
    background: COLORS.RED_LIGHT_COLOR,
  },
});
