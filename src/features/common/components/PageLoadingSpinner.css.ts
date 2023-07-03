import { keyframes, style } from '@vanilla-extract/css';

export const loadingSpinnerContainer = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: 80,
  height: 80,
});

const rotate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const loadingSpinnerDiv = style({
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  width: 64,
  height: 64,
  margin: 8,
  border: '8px solid #000',
  borderRadius: '50%',
  animation: `${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
  borderColor: '#000 transparent transparent transparent',
});

export const div1 = style([
  loadingSpinnerDiv,
  {
    animationDelay: '-0.45s',
  },
]);

export const div2 = style([
  loadingSpinnerDiv,
  {
    animationDelay: '-0.3s',
  },
]);
export const div3 = style([
  loadingSpinnerDiv,
  {
    animationDelay: '-0.15s',
  },
]);
