import { style } from '@vanilla-extract/css';
import { COLORS } from '@/constants/colors';

export const li = style({
  width: '100%',
  height: 280,
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

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${COLORS.BORDER_COLOR}`,
  paddingBottom: 10,
});

export const location = style({
  display: 'flex',
  alignItems: 'center',
});

export const locationText = style({
  color: COLORS.SECOND_TEXT_COLOR,
  fontSize: 12,
  marginLeft: 10,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: 162,
});

export const tag = style({});

export const contentWrapper = style({
  marginTop: 14,
  height: '60%',
  borderBottom: `1px solid ${COLORS.BORDER_COLOR}`,
});

export const title = style({
  display: '-webkit-box',
  width: '100%',
  wordWrap: 'break-word',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  fontSize: '16px',
  fontWeight: 600,
  color: '#000',
});

export const footer = style({
  marginTop: 14,
  display: 'flex',
  alignItems: 'center',
  gap: 13,
  color: COLORS.SECOND_TEXT_COLOR,
  fontSize: 14,
});

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
