import { style } from '@vanilla-extract/css';
import { COLORS } from '@/constants/colors.ts';

export const listHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  marginTop: 30,
  height: 50,
});

export const saveText = style({
  fontSize: 20,
  fontWeight: 600,
  color: '#000',
});

export const countText = style({
  display: 'inline-block',
  marginLeft: 8,
  fontSize: 18,
  padding: '2px 8px',
  color: '#000',
  border: `1px solid ${COLORS.BORDER_COLOR}`,
  borderRadius: 9,
  background: COLORS.TAG_BACKGROUND,
  verticalAlign: 'bottom',
  fontWeight: 500,
});

export const newButton = style({
  background: COLORS.BLUE_COLOR,
  width: 60,
  height: 30,
  borderRadius: 6,
  color: '#fff',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: '150%',
  transition: 'all 0.15s ease',
  ':hover': {
    background: COLORS.BLUE_LIGHT_COLOR,
  },
});
