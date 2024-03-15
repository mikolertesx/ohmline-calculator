import { Box, Tooltip } from '@mui/material';
import styles from './band.module.scss';

type BandProps = {
  id: number;
  color?: string;
  label?: string;
  textColor?: string;
  onClick?: () => void;
  showLabel?: boolean;
  selectedId?: number;
};

// Calculates the Y position.
const generateModifiers = (id: number) => {
  const BASEY = -30;
  let ypos: number;

  switch (id) {
    default:
      ypos = BASEY;
      break;
    case 1:
      ypos = BASEY + 22;
      break;
  }

  if (id === 3) {
    ypos = BASEY;
  }

  return {
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, ypos]
      }
    }]
  }
};

const Band = ({ color, label, onClick, showLabel, id }: BandProps) => {
  const finalLabel = !color ? `Click here` : label;

  return (
    <Tooltip title={finalLabel} open={showLabel || !color} slotProps={{
      popper: generateModifiers(id)
    }}>
      <Box
        style={{ backgroundColor: color }}
        className={styles['band']}
        onClick={onClick}
      ></Box>
    </Tooltip>
  );
};

export default Band;
