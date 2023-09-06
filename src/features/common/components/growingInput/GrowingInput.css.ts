import { createVar, style } from '@vanilla-extract/css';

import { COLORS } from '@/constants/colors.ts';

export const fontWeight = createVar();
export const fontSize = createVar();
export const padding = createVar();
export const fontColor = createVar();

export const titleWrapper = style({
  display: 'inline-block',
  padding: padding,
  transition: '0.15s ease',
  borderRadius: '8px',
  maxWidth: 692,
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
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
  maxWidth: 692,
  fontWeight: fontWeight,
  fontSize: fontSize,
  color: fontColor,
});

export const editIcon = style({
  display: 'inline-block',
  marginLeft: 10,
  visibility: 'hidden',
  selectors: {
    [`${titleWrapper}:hover &`]: {
      visibility: 'visible',
    },
  },
});

export const titleInput = style({
  background: COLORS.TAG_BACKGROUND,
  fontWeight: fontWeight,
  fontSize: fontSize,
  maxWidth: 692,
  border: 'none',
  padding: 2,
});
