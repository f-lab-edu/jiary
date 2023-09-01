import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  background: 'rgb(9, 9, 11)',
  color: 'rgb(250, 250, 250)',
});

export const titleSection = style({
  margin: '160px 0 20px',
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '6rem',
  fontWeight: 700,
  transition: '.15s all cubic-bezier(.4,0,.2,1)',
});

globalStyle('span.title-item', {
  background: 'linear-gradient(to right, #3b82f6, #bfdbfe);',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
});

export const imageSection = style({
  position: 'relative',
  padding: 44,
  margin: '100px 0 20px',
});

export const mainImage = style({
  borderRadius: 14,
  position: 'relative',
  zIndex: 1,
  // filter: 'brightness(0.9)',
});

export const imageSectionBackground = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  filter: 'blur(100px)',
  opacity: 0.5,
  width: 900,
  height: 590,
  backgroundColor: 'rgb(56, 130, 246)',
});

export const descriptionSection = style({
  fontSize: 18,
  display: 'flex',
  flexDirection: 'column',
  padding: '200px 0 120px',
});

export const paragraphSection = style({
  marginBottom: 32,
});

export const paragraph = style({
  marginBottom: 8,
});

export const ul = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const li = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  background: 'hsl(230 8% 10%);',
  borderRadius: 9,
  padding: '12px 24px 12px 16px',
  transition: 'all 0.3s ease',
  cursor: 'auto',
  ':hover': {
    background: 'hsl(230 8% 13%);',
  },
});

export const liTitle = style({
  color: 'hsl(230,4%,90%)',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '150%',
});

export const liDescription = style({
  color: 'hsl(230,4%,50%)',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '150%',
  marginTop: '1px',
});

export const descriptionIcon = style({
  width: 40,
  height: 40,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
});

export const mapIconWrapper = style({
  background: 'rgba(255,132,93,0.12)',
});
export const mapIcon = style({
  fill: '#FF845D',
});

export const cloudIconWrapper = style({
  background: 'rgba(255,104,212,0.12)',
});
export const cloudIcon = style({
  fill: '#FF68D4',
});

globalStyle('svg.cloud-icon > path', {
  fill: '#FF68D4',
});

export const lockIcons = style({
  background: 'rgba(254,190,65,0.12)',
});

export const footerSection = style({
  marginBottom: 200,
});

export const diaryLink = style({
  padding: '20px 36px',
  fontWeight: 700,
  borderRadius: '24px',
  display: 'block',
  outline: 'none',
  textDecoration: 'none',
  fontSize: '16px',
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

export const descriptionSection2 = style({
  fontSize: 18,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 220px 120px',
});
