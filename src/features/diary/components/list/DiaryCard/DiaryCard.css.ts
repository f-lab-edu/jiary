import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const li = style({
  width: '100%',
  height: 200,
  backgroundColor: '#fff',
  borderRadius: 8,
  position: 'relative',
  ':before': {
    content: '',
    boxShadow: '10px 20px 30px hsla(218,53%,10%,6%)',
    width: '100%',
    position: 'absolute',
    display: 'block',
    height: '100%',
    pointerEvents: 'none',
  },
});

export const link = style({
  display: 'block',
  padding: '20px 16px',
  height: '100%',
});

export const contentWrapper = style({
  marginTop: 14,
  height: '60%',
});

export const title = style({
  display: '-webkit-box',
  width: '100%',
  wordWrap: 'break-word',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  fontSize: '16px',
  fontWeight: 600,
  color: '#000',
});

export const footer = style({
  marginBottom: 24,
  paddingBottom: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: COLORS.SECOND_TEXT_COLOR,
  fontSize: 14,
  borderBottom: `1px solid ${COLORS.BORDER_COLOR}`,
});

export const date = style({
  display: 'flex',
  alignItems: 'center',
  gap: 13,
});

export const memu = style({});
