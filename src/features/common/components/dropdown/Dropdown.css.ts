import { createVar, style } from '@vanilla-extract/css';
import { COLORS } from '@/constants/colors.ts';

export const wrapperWidth = createVar();
export const wrapperTop = createVar();

export const container = style({
  position: 'relative',
});

export const wrapper = style({
  position: 'absolute',
  zIndex: 50,
  width: wrapperWidth,
  top: wrapperTop,
  background: '#fff',
  padding: '8px',
  borderRadius: 6,
  boxShadow:
    'rgba(9, 30, 66, 0.15) 0px 8px 12px 0px, rgba(9, 30, 66, 0.31) 0px 0px 1px 0px',
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '0 4px 12px',
  fontSize: 14,
  fontWeight: 500,
  borderBottom: `1px solid ${COLORS.BORDER_COLOR}`,
});

export const input = style({
  width: '100%',
  height: 28,
  background: 'hsl(230,25%,97%)',
  borderRadius: 2,
  border: 'none',
  padding: '2px 12px',
  boxShadow: 'inset 0 0 0 1px hsl(230,25%,94%)',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: 400,
  boxSizing: 'border-box',
  margin: '12px 0',
});

export const submitButton = style({
  width: '100%',
  height: 28,
  fontSize: 12,
  position: 'relative',
  background: 'hsla(32, 100%, 50%, 0.6)',
  borderRadius: 3,
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

export const requiredText = style({
  display: 'block',
  fontSize: 12,
  marginBottom: 12,
  color: COLORS.RED_COLOR,
});
