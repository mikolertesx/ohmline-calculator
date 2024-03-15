"use client";

import React, { useEffect, useState } from "react";

import { Box } from '@mui/material';

import {
  Resistance as ResistanceModel,
  Tolerance as ToleranceModel,
} from "prisma-database";

// Components
import Resistance from "../../components/Resistance/resistance";
import ResistancePickerModal from "../../components/Modals/ResistancePickerModal/resistance-picker-modal";
import TolerancePickerModal from "../../components/Modals/TolerancePickerModal/tolerance-picker-modal";
import Display from "../../components/Display/Display";
import SelectBandCard from '../../components/SelectBandCard/SelectBandCard';

// Hooks
import useResistance from "../../hooks/MainView/useResistance";
import useData from '../../hooks/MainView/useData';
import useDefaultValues from "../../hooks/MainView/useDefaultValues";
import useBandCollection, { BandCollectionIndex, BandCollectionResistanceSlice, BandCollectionToleranceSlice } from "../../hooks/MainView/useBandCollection";


export type ColorCollection = [
  ResistanceModel?,
  ResistanceModel?,
  ResistanceModel?,
  ToleranceModel?,
];

const MainView = () => {
  const { resistanceA, resistanceB, resistanceC, tolerance, updateSingleBand, setBandCollection, getSingleBand } = useBandCollection();
  // const [colorCollection, setColorCollection] =
  //   useState<ColorCollection | null>();
  const [tutorialMode, setTutorialMode] = useState(true);
  const { resistances, tolerances } = useData();
  const [selectedResistance, setSelectedResistance] = useState<BandCollectionResistanceSlice | null>(
    null
  );

  const [showColorModal, setShowColorModal] = useState(false);
  const [showToleranceModal, setShowToleranceModal] = useState(false);

  // useDefaultValues({
  //   resistances: resistances.data,
  //   tolerances: tolerances.data,
  //   setDefault: setBandCollection
  // });

  const { value: [minimumResistance, baseResistance, maximumResistance] } = useResistance({
    resistanceA: resistanceA !== null ? resistanceA.name : null,
    resistanceB: resistanceB !== null ? resistanceB.name : null,
    resistanceC: resistanceC !== null ? resistanceC.name : null,
    tolerance: tolerance !== null ? tolerance.name : null,
  });

  const pickResistanceHandler = (resistance: ResistanceModel | null) => {
    setTutorialMode(false);
    if (resistance !== null) {
      updateSingleBand(selectedResistance as BandCollectionResistanceSlice, resistance);
    }

    setShowColorModal(false);
  };

  const pickToleranceHandler = (tolerance: ToleranceModel | null) => {
    setTutorialMode(false);

    if (tolerance !== null) {
      updateSingleBand(3, tolerance);
    }

    setShowToleranceModal(false);
  };

  const clickResistanceHandler = (position: number) => {
    setShowColorModal(true);
    setSelectedResistance(position as BandCollectionResistanceSlice);
  };

  const clickToleranceHandler = () => {
    setShowToleranceModal(true);
  };

  const currentlySelectedResistance = getSingleBand(selectedResistance);

  return (
    <Box component='main'>
      <ResistancePickerModal
        resistances={resistances.data}
        show={showColorModal}
        onPick={pickResistanceHandler}
        currentlySelected={currentlySelectedResistance !== null ? currentlySelectedResistance.name : null}
      />
      <TolerancePickerModal
        tolerances={tolerances.data}
        show={showToleranceModal}
        onPick={pickToleranceHandler}
        currentlySelected={tolerance?.name}
      />
      <SelectBandCard visible={tutorialMode} />
      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Resistance
          resistanceA={resistanceA}
          resistanceB={resistanceB}
          resistanceC={resistanceC}
          tolerance={tolerance}
          onClickResistance={clickResistanceHandler}
          onClickTolerance={clickToleranceHandler}
        />
      </Box>
      <Display
        base={baseResistance}
        maximum={maximumResistance}
        minimum={minimumResistance}
        tolerance={tolerance?.tolerance}
      />
    </Box>
  );
};

export default MainView;
