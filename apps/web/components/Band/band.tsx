import { Tooltip } from '@mui/material';
import styles from './band.module.scss';

type BandProps = {
  color?: string;
  label?: string;
  textColor?: string;
  onClick?: () => void;
};

const Band = ({ color, label, onClick }: BandProps) => {
  return (
    <Tooltip title={label}>
      <div
        style={{ backgroundColor: color }}
        className={styles['band']}
        onClick={onClick}
      ></div>
    </Tooltip>
  );
};

export default Band;
