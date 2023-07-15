import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  // background: 'rgba(0, 0, 0, 0.1)',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  // backdropFilter: 'blur(1px)',
});

const load8 = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const loader = style({
  margin: 4,
  position: 'absolute',
  top: 80,
  right: '50%',
  textIndent: '-9999em',
  // outer
  borderTop: '3px solid hsla(230, 4%, 10%, 0.8)',
  borderRight: '3px solid hsla(230, 4%, 10%, 0.8)',
  borderBottom: '3px solid hsla(230, 4%, 10%, 0.8)',
  // inner
  borderLeft: '3px solid hsla(230, 4%, 10%, 0.2)',
  WebkitTransform: 'translateZ(0)',
  transform: 'translateZ(0)',
  WebkitAnimation: `${load8} 1.1s infinite linear`,
  animation: `${load8} 1.1s infinite linear`,
  width: 24,
  height: 24,
  borderRadius: '50%',
  ':after': {
    content: '',
    borderRadius: '50%',
    width: 24,
    height: 24,
  },
});
