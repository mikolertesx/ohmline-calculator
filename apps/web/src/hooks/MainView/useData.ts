import { trpc } from '../../router';

// Extracted to a separate hook to hide configuration logic.
const useData = () => {
  const resistances = trpc.getResistances.useQuery(undefined, {
    refetchOnMount: false,
    refetchInterval: 0,
    refetchOnWindowFocus: false
  });

  const tolerances = trpc.getTolerances.useQuery(undefined, {
    refetchOnMount: false,
    refetchInterval: 0,
    refetchOnWindowFocus: false
  });

  return { resistances: resistances, tolerances: tolerances };
};

export default useData;
