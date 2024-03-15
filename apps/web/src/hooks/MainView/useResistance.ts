import { useEffect, useState } from 'react';
import { trpc } from '../../router';

type Nullable<T> = T | null;

type useResistanceProps = {
  resistanceA: Nullable<string>;
  resistanceB: Nullable<string>;
  resistanceC: Nullable<string>;
  tolerance: Nullable<string>;
};

const useResistance = ({
  resistanceA,
  resistanceB,
  resistanceC,
  tolerance,
}: useResistanceProps) => {
  const [value, setValue] = useState<[string, string, string]>(['NaN', 'NaN', 'NaN']);
  const resistance = trpc.postCalculate.useMutation();

  useEffect(() => {
    if (!resistanceA || !resistanceB || !resistanceC || !tolerance) {
      return;
    }

    const getResistanceValue = async () => {
      const requestBody = {
        bandAColor: resistanceA!,
        bandBColor: resistanceB!,
        bandCColor: resistanceC!,
        bandDColor: tolerance!,
      };

      const response = await resistance.mutateAsync({
        bandAColor: requestBody.bandAColor,
        bandBColor: requestBody.bandBColor,
        bandCColor: requestBody.bandCColor,
        bandDColor: requestBody.bandDColor,
      });

      setValue(response);
    };

    getResistanceValue();
  }, [resistanceA, resistanceB, resistanceC, tolerance]);

  return { value, loading: resistance.isLoading };
};

export default useResistance;
