import React, { useState } from 'react';
import { Resistance as ResistanceModel, Tolerance as ToleranceModel } from 'prisma-database';

import Band from '../Band/band';

import styles from './resistance.module.scss';
import { Box, Tooltip } from '@mui/material';

type Nullable<T> = T | null;

type ResistanceProps = {
  resistanceA: Nullable<ResistanceModel>;
  resistanceB: Nullable<ResistanceModel>;
  resistanceC: Nullable<ResistanceModel>;
  tolerance: Nullable<ToleranceModel>;

  onClickResistance: (position: number) => void;
  onClickTolerance: () => void;
};

const bandIndexes = [
  '1st Digit',
  '2nd Digit',
  'Multiplier',
  'Tolerance'
] as const;

const Resistance = ({
  resistanceA,
  resistanceB,
  resistanceC,
  tolerance,
  onClickResistance,
  onClickTolerance,
}: ResistanceProps) => {
  const resistances = [
    resistanceA,
    resistanceB,
    resistanceC,
  ] as const;

  const [showLabels, setShowLabels] = useState(false);

  const hoverHandler = () => {
    setShowLabels(true);
  };
  const leaveHandler = () => {
    setShowLabels(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
      }}
    >
      <Box className={styles['resistance']} onMouseEnter={hoverHandler} onMouseLeave={leaveHandler}>
        {resistances.map((resistance, index) => (
          <Band
            id={index}
            key={`${resistance?.name}-${index}`}
            color={resistance?.backgroundColor}
            label={`${bandIndexes[index]}`}
            textColor={resistance?.textColor}
            onClick={() => onClickResistance(index)}

            // onHover={hoverHandler}
            // onLeave={leaveHandler}

            showLabel={showLabels}
          />
        ))}

        <Band
          id={3}
          color={tolerance?.backgroundColor}
          label={bandIndexes[3]}
          textColor={tolerance?.textColor}
          onClick={onClickTolerance}

          // onHover={hoverHandler}
          // onLeave={leaveHandler}
          showLabel={showLabels}
        />
      </Box>
    </Box>
  );
};

export default Resistance;
