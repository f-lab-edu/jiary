import { keyframes, style } from '@vanilla-extract/css';

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

export const title = style({
  background: 'hsl(230, 25%, 97%)',
  width: 'calc(100% - 10px)',
  height: '18px',
  borderRadius: '10px',
  marginBottom: '18px',
});

export const subTitle = style({
  background: 'hsl(230, 25%, 97%)',
  width: 'calc(100% - 180px)',
  height: '18px',
  borderRadius: '10px',
});

export const header = style({
  background: 'hsl(230, 25%, 97%)',
  width: '100px',
  height: '18px',
  borderRadius: '10px',
});

const skeletonKeyframe = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '50%': { transform: 'translateX(100%)' },
  '100%': { transform: 'translateX(100%)' },
});

export const skeleton = style({
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
  ':after': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'translateX(-100%)',
    background: `linear-gradient(90deg, transparent, hsla(230, 25%, 85%, 0.8), transparent)`,
    animation: `${skeletonKeyframe} 1.6s linear 0.5s infinite`,
    content: '',
  },
});
