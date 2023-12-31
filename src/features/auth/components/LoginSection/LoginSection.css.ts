import { style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const container = style({
  position: 'relative',
  width: 420,
  height: 660,
  backgroundColor: 'rgba(255, 255, 255, 0.97)',
  boxShadow: '18px 40px 30px rgba(0, 0, 0, 0.3)',
  borderRadius: 20,
  marginBottom: 20,
  padding: '30px 50px',
  lineHeight: 1.5,
  boxSizing: 'content-box',
  zIndex: 1,
});

export const logo = style({
  margin: '30px auto',
  width: 'fit-content',
});

export const ul = style({
  fontSize: 18,
  marginBottom: 44,
});

export const li = style({
  listStyle: 'initial',
  marginLeft: 10,
});

export const subText = style({
  marginBottom: 10,
  wordBreak: 'keep-all',
});

export const description = style({
  color: COLORS.THIRD_TEXT_COLOR,
  fontSize: 14,
});

export const emphasis = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 700,
  marginBottom: 40,
});

export const buttonWrapper = style({
  position: 'absolute',
  bottom: 50,
  left: 0,
  width: '100%',
  margin: '0 auto',
});

export const loginButton = style({
  padding: '10px',
  backgroundColor: '#fff',
  border: '2px solid hsl(230,25%,94%)',
  borderRadius: 6,
  width: 220,
  height: 60,
  fontSize: 16,
  margin: '0 auto',
  display: 'block',
  transition: 'all 0.15s',
  ':hover': {
    transform: 'translate3d(0,-2px,0)',
    boxShadow: '0 8px 18px 0 hsla(218,53%,10%,0.05)',
  },
});

export const googleLogo = style({
  content: '',
  display: 'inline-block',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  marginRight: 10,
  verticalAlign: 'middle',
});

export const links = style({
  display: 'flex',
  justifyContent: 'center',
  gap: 12,
});

export const subLink = style({
  color: COLORS.BLUE_COLOR,
  fontSize: 14,
  padding: 10,
  ':hover': {
    textDecoration: 'underline',
  },
});
