import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { Tolerance as ToleranceModel } from 'prisma-database';

import ColorBox from '../../ColorBox/ColorBox';

type TolerancePickerModalProps = {
  tolerances: ToleranceModel[];
  onPick: (tolerance?: ToleranceModel) => void;
  currentlySelected?: string;
  show: boolean;
};

// TODO Add styles to the resistance picker.
const TolerancePickerModal = ({
  tolerances,
  show,
  onPick,
  currentlySelected,
}: TolerancePickerModalProps) => {
  return (
    <Dialog open={show} onClose={() => onPick()}>
      <List
        sx={{
          maxHeight: 800,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        {tolerances.map((tolerance) => (
          <ListItem
            key={tolerance.name}
            onClick={() => onPick(tolerance)}
            sx={{
              cursor: 'pointer',
              paddingRight: 12,
              overflow: 'hidden'
            }}
            secondaryAction={<ColorBox color={tolerance.backgroundColor} />}
          >
            <ListItemButton sx={{ paddingRight: 12 }}>
              <ListItemIcon>
                {currentlySelected === tolerance.name && <StarIcon />}
              </ListItemIcon>

              <ListItemText
                primary={`Name: ${tolerance.name}`}
                secondary={`± ${tolerance.tolerance}%`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default TolerancePickerModal;
