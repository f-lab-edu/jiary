import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const editButton = style({
  position: 'absolute',
  right: '0',
  top: -42,
  zIndex: 10,
  padding: 8,
  borderRadius: 6,
  color: '#fff',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: '150%',
  transition: 'all 0.15s ease',
  background: COLORS.GREEN_COLOR,
  ':hover': {
    background: COLORS.GREEN_LIGHT_COLOR,
  },
  selectors: {
    '&.none-edit': {
      background: COLORS.BLUE_COLOR,
    },
    '&.none-edit:hover': {
      background: COLORS.BLUE_LIGHT_COLOR,
    },
  },
});

export const toolbarCover = style({
  position: 'absolute',
  height: 44,
  width: '100%',
  zIndex: 10,
  transition: '0.15s ease',
  transform: 'translateY(-44px)',
  pointerEvents: 'none',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  opacity: 0,
  selectors: {
    '&.none-edit': {
      background: '#fff',
      pointerEvents: 'initial',
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
});
