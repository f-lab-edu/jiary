import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '800px',
  margin: '60px auto 0',
  minHeight: '80%',
  display: 'flex',
  flexDirection: 'column',
});

export const article = style({
  paddingBottom: '60px',
});

export const title = style({
  fontSize: '3rem',
  fontWeight: 500,
  color: '#000',
  marginBottom: 52,
});

globalStyle('.privacy-container p', {
  margin: '10px 0',
});

export const footer = style({
  marginTop: 52,
  fontSize: 24,
  fontWeight: 700,
  textAlign: 'right',
});

export const backButton = style({
  padding: '14px 18px',
  fontWeight: 700,
  borderRadius: '24px',
  outline: 'none',
  textDecoration: 'none',
  fontSize: '12px',
  letterSpacing: '0.5px',
  background: '#275efe',
  color: '#fff',
  boxShadow: '0 2px 8px -1px rgba(39, 94, 254, 0.32)',
  transform: 'translateY(0) translateZ(0)',
  transition: 'transform 0.32s ease, box-shadow 0.32s ease',
  ':hover': {
    transform: 'translateY(-4px) translateZ(0)',
    boxShadow: '0 4px 20px -2px rgba(39, 94, 254, 0.5)',
  },
});
