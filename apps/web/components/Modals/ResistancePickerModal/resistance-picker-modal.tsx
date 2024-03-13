import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';

import { ColorModel } from '@ohm-calculate/api-interface';
import ColorBox from '../../ColorBox/ColorBox';

type ResistancePickerModalProps = {
  colors: ColorModel[];
  onPick: (color?: ColorModel) => void;
  currentlySelected?: string;
  show: boolean;
};

// TODO Add styles to the resistance picker.
// TODO Add virtualization to the list (Fixed Size List)
const ResistancePickerModal = ({
  colors,
  show,
  onPick,
  currentlySelected,
}: ResistancePickerModalProps) => {
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
        {colors.map((color) => (
          <ListItem
            key={color.name}
            onClick={() => onPick(color)}
            sx={{
              cursor: 'pointer',
            }}
            secondaryAction={<ColorBox color={color.backgroundColor} />}
          >
            <ListItemButton>
              <ListItemIcon>
                {currentlySelected === color.name && <StarIcon />}
              </ListItemIcon>

              <ListItemText
                primary={`Name: ${color.name}`}
                secondary={`Value: ${color.modifier}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default ResistancePickerModal;
