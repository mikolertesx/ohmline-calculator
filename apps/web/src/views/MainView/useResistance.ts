import {
  PostCalculateRequest,
  PostCalculateResponse,
} from '@ohm-calculate/api-interface';
import { useEffect, useState } from 'react';

type useResistanceProps = {
  resistanceA?: string;
  resistanceB?: string;
  resistanceC?: string;
  tolerance?: string;
};

const useResistance = ({
  resistanceA,
  resistanceB,
  resistanceC,
  tolerance,
}: useResistanceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([NaN, NaN, NaN]);

  useEffect(() => {
    if (!resistanceA || !resistanceB || !resistanceC || !tolerance) {
      return;
    }

    const getResistanceValue = async () => {
      const requestBody: PostCalculateRequest = {
        bandAColor: resistanceA!,
        bandBColor: resistanceB!,
        bandCColor: resistanceC!,
        bandDColor: tolerance!,
      };

      setIsLoading(true);

      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const json = (await response.json()) as PostCalculateResponse;

      const { result } = json;

      setIsLoading(false);
      setValue(result);
    };

    getResistanceValue();
  }, [resistanceA, resistanceB, resistanceC, tolerance]);

  return { value, isLoading };
};

export default useResistance;
