import {
  PostCalculateRequest,
  PostCalculateResponse,
} from 'api-interface';
import { useEffect, useState } from 'react';
import { trpc } from '../../router';

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
  const [value, setValue] = useState<[string, string, string]>(['NaN', 'NaN', 'NaN']);
  const resistance = trpc.postCalculate.useMutation();

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

      const response = await resistance.mutateAsync({
        bandAColor: requestBody.bandAColor,
        bandBColor: requestBody.bandBColor,
        bandCColor: requestBody.bandCColor,
        bandDColor: requestBody.bandDColor,
      });

      setIsLoading(false);
      setValue(response);
    };

    getResistanceValue();
  }, [resistanceA, resistanceB, resistanceC, tolerance]);

  return { value, isLoading };
};

export default useResistance;
