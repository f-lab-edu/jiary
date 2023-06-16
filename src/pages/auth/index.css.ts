import { style } from '@vanilla-extract/css';
import loginBackground from '@/static/auth/open-peeps.png';

export const root = style({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: `rgba(0,0,0,0.3) url(${loginBackground.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'darken',

  ':before': {
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
