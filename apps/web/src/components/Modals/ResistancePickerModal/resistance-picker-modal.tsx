import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';

import { Resistance as ResistanceModel } from 'prisma-database';
import ColorBox from '../../ColorBox/ColorBox';

type ResistancePickerModalProps = {
  resistances?: ResistanceModel[];
  onPick: (resistance: ResistanceModel | null ) => void;
  currentlySelected: string | null;
  show: boolean;
};

// TODO Add styles to the resistance picker.
// TODO Add virtualization to the list (Fixed Size List)
const ResistancePickerModal = ({
  resistances = [],
  show,
  onPick,
  currentlySelected,
}: ResistancePickerModalProps) => {
  return (
    <Dialog open={show} onClose={() => onPick(null)}>
      <List
        sx={{
          maxHeight: 800,
          bgcolor: 'background.paper',
        }}
      >
        {resistances.map((resistance) => (
          <ListItem
            key={resistance.name}
            onClick={() => onPick(resistance)}
            sx={{
              cursor: 'pointer',
            }}
            secondaryAction={<ColorBox color={resistance.backgroundColor} />}
          >
            <ListItemButton>
              <ListItemIcon>
                {currentlySelected === resistance.name && <StarIcon />}
              </ListItemIcon>

              <ListItemText
                primary={`Name: ${resistance.name}`}
                secondary={`Value: ${resistance.modifier}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default ResistancePickerModal;
