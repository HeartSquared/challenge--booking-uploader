import { style } from '@vanilla-extract/css';

export const timeline = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(144, 1fr)', // render with granularity of 10 minutes
  backgroundColor: '#ccc',
  width: '100%',
  height: '1rem',
});
