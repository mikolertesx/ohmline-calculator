"use client";
import styles from './main-view.module.scss';

import React, { useEffect, useState } from "react";

import {
  Resistance as ResistanceModel,
  Tolerance as ToleranceModel,
} from "prisma-database";


import Resistance from "../../components/Resistance/resistance";
import ResistancePickerModal from "../../components/Modals/ResistancePickerModal/resistance-picker-modal";
import TolerancePickerModal from "../../components/Modals/TolerancePickerModal/tolerance-picker-modal";

import useResistance from "./useResistance";
import Display from "../../components/Display/Display";
import { Card, CardContent, Typography } from '@mui/material';
import { trpc } from '../../router';

export type ColorCollection = [
  ResistanceModel?,
  ResistanceModel?,
  ResistanceModel?,
  ToleranceModel?,
];

const MainView = () => {
  const [colorCollection, setColorCollection] =
    useState<ColorCollection | null>();

  const resistances = trpc.getResistances.useQuery();
  const tolerances = trpc.getTolerances.useQuery();


  const [selectedResistance, setSelectedResistance] = useState<number | null>(
    null
  );
  const [showColorModal, setShowColorModal] = useState(false);
  const [showToleranceModal, setShowToleranceModal] = useState(false);

  const { value: [minimumResistance, baseResistance, maximumResistance] } = useResistance({
    resistanceA: colorCollection?.[0]?.name,
    resistanceB: colorCollection?.[1]?.name,
    resistanceC: colorCollection?.[2]?.name,
    tolerance: colorCollection?.[3]?.name,
  });

  // Pick default values.
  useEffect(() => {
    if (!resistances.data || !tolerances.data) return;

    const [first, second, third] = resistances.data;
    const defaultTolerance = tolerances.data?.[0];

    setColorCollection([first, second, third, defaultTolerance]);
  }, [resistances.data, tolerances.data]);

  const pickColorHandler = (color?: ResistanceModel) => {
    if (color && colorCollection) {
      setColorCollection((prevData) => {
        (prevData as ColorCollection)[selectedResistance as number] = color;

        return prevData;
      });
    }
    setShowColorModal(false);
  };

  const pickResistanceHandler = (tolerance?: ToleranceModel) => {
    if (tolerance && colorCollection) {
      setColorCollection((prevData) => {
        (prevData as ColorCollection)[3] = tolerance;

        return prevData;
      });
    }

    setShowToleranceModal(false);
  };

  const clickResistanceHandler = (position: number) => {
    setShowColorModal(true);
    setSelectedResistance(position);
  };

  const clickToleranceHandler = () => {
    setShowToleranceModal(true);
  };

  if (!colorCollection) {
    return null;
  }

  const [resistanceA, resistanceB, resistanceC, tolerance] = colorCollection;

  const currentlySelectedResistance =
    selectedResistance !== null
      ? colorCollection[selectedResistance]?.name
      : undefined;


  return (
    <div className={styles['main']}>
      <ResistancePickerModal
        resistances={resistances.data}
        show={showColorModal}
        onPick={pickColorHandler}
        currentlySelected={currentlySelectedResistance}
      />

      <TolerancePickerModal
        tolerances={tolerances.data}
        show={showToleranceModal}
        onPick={pickResistanceHandler}
        currentlySelected={tolerance?.name}
      />
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h1' mt={2} textAlign='center'>
            Click on the bands to select values.
          </Typography>
        </CardContent>
      </Card>

      <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Resistance
          resistanceA={resistanceA}
          resistanceB={resistanceB}
          resistanceC={resistanceC}
          tolerance={tolerance}
          onClickResistance={clickResistanceHandler}
          onClickTolerance={clickToleranceHandler}
        />
      </div>


      <Display
        base={baseResistance}
        maximum={maximumResistance}
        minimum={minimumResistance}
        tolerance={tolerance?.tolerance}
      />


    </div>
  );
};

export default MainView;
