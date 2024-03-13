import React from 'react';
import { ColorModel, ToleranceModel } from '@ohm-calculate/api-interface';

import Band from '../Band/band';

import styles from './resistance.module.scss';

type ResistanceProps = {
  resistanceA?: ColorModel;
  resistanceB?: ColorModel;
  resistanceC?: ColorModel;
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
  const resistances: [ColorModel?, ColorModel?, ColorModel?] = [
    resistanceA,
    resistanceB,
    resistanceC,
  ];

  return (
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
  );
};

export default Resistance;
