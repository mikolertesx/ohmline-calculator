import React from 'react';
import { Resistance as ResistanceModel, Tolerance as ToleranceModel } from 'prisma-database';

import Band from '../Band/band';

import styles from './resistance.module.scss';
import { Box } from '@mui/material';

type ResistanceProps = {
  resistanceA?: ResistanceModel;
  resistanceB?: ResistanceModel;
  resistanceC?: ResistanceModel;
  tolerance?: ToleranceModel;

  onClickResistance: (position: number) => void;
  onClickTolerance: () => void;
};

const Resistance = ({
  resistanceA,
  resistanceB,
  resistanceC,
  tolerance,
  onClickResistance,
  onClickTolerance,
}: ResistanceProps) => {
  const resistances: [ResistanceModel?, ResistanceModel?, ResistanceModel?] = [
    resistanceA,
    resistanceB,
    resistanceC,
  ];

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      padding='10px'
    >
      <div className={styles['resistance']}>
        {resistances.map((resistance, index) => (
          <Band
            key={`${resistance?.name}-${index}`}
            color={resistance?.backgroundColor}
            label={resistance?.name}
            textColor={resistance?.textColor}
            onClick={() => onClickResistance(index)}
          />
        ))}

        <Band
          color={tolerance?.backgroundColor}
          label={tolerance?.name}
          textColor={tolerance?.textColor}
          onClick={onClickTolerance}
        />
      </div>
    </Box>
  );
};

export default Resistance;
