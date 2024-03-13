import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';

import { ToleranceModel } from '@ohm-calculate/api-interface';
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
          width: 450,
          overflow: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        {tolerances.map((tolerance) => (
          <ListItem
            key={tolerance.name}
            onClick={() => onPick(tolerance)}
            sx={{
              cursor: 'pointer',
            }}
            secondaryAction={<ColorBox color={tolerance.backgroundColor} />}
          >
            <ListItemButton>
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
