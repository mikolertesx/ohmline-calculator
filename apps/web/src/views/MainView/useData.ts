import { useState, useEffect } from 'react';

import {
  Resistance as ResistanceModel,
  Tolerance as ToleranceModel,
} from 'prisma-database';

import { 
  GetResistanceColorsResponse,
  GetToleranceColorsResponse,
} from 'api-interface';

const useData = () => {
  const [colors, setColors] = useState<ResistanceModel[]>([]);
  const [tolerances, setTolerances] = useState<ToleranceModel[]>([]);

  useEffect(() => {
    // Update setData
    const updateData = async () => {
      const response = await fetch('/api/resistance-colors');
      const jsonData = (await response.json()) as GetResistanceColorsResponse;
      setColors(jsonData.data);
    };

    updateData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      const response = await fetch('/api/tolerance-colors');
      const jsonData = (await response.json()) as GetToleranceColorsResponse;
      setTolerances(jsonData.data);
    };

    updateData();
  }, []);

  return { colors, tolerances };
};

export default useData;
