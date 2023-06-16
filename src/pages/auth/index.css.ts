import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const backgroundImage = style({
  position: 'absolute',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const backgroundAfter = style({
  backgroundColor: `rgba(0,0,0,0.3)`,
  backgroundBlendMode: 'darken',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  ':after': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(2px)',
    background: 'transparent',
  },
});
