import { trpc } from '../../router';

const useData = () => {
  const resistances = trpc.getResistances.useQuery();
  const tolerances = trpc.getTolerances.useQuery();
  // const [colors, setColors] = useState<ResistanceModel[]>([]);
  // const [tolerances, setTolerances] = useState<ToleranceModel[]>([]);

  // useEffect(() => {
  //   // Update setData
  //   const updateData = async () => {
  //     const response = await fetch('/api/resistance-colors');
  //     const jsonData = (await response.json()) as GetResistanceColorsResponse;
  //     setColors(jsonData.data);
  //   };

  //   updateData();
  // }, []);

  // useEffect(() => {
  //   const updateData = async () => {
  //     const response = await fetch('/api/tolerance-colors');
  //     const jsonData = (await response.json()) as GetToleranceColorsResponse;
  //     setTolerances(jsonData.data);
  //   };

  //   updateData();
  // }, []);

  return { colors: resistances.data, tolerances: tolerances.data };
};

export default useData;
