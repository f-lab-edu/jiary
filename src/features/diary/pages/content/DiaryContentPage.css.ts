import { COLORS } from '@/constants/colors.ts';
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: 50,
});

export const titleWrapper = style({
  display: 'inline-block',
  height: 36,
  padding: 1,
  marginBottom: 20,
  transition: '0.15s ease',
  borderRadius: '8px',
  ':hover': {
    background: COLORS.TAG_BACKGROUND,
  },
});

export const titleButton = style({
  display: 'flex',
  alignItems: 'center',
  margin: 2,
});

export const title = style({
  display: 'inline-block',
  fontWeight: 700,
  fontSize: 24,
});

export const editIcon = style({
  display: 'inline-block',
  marginLeft: 10,
});

export const titleInput = style({
  background: COLORS.TAG_BACKGROUND,
  fontWeight: 600,
  fontSize: 24,
  minWidth: 220,
  maxWidth: 692,
  width: 'fit-content',
  border: 'none',
  padding: 2,
});

export const content = style({
  whiteSpace: 'pre-wrap',
  border: '2px solid black',
  padding: 15,
  ':focus-visible': {
    outline: 'none',
  },
});

export const sectionDivision = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  minHeight: 'calc(100vh - 200px)',
});
