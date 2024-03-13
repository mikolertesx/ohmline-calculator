import {Tolerance as ToleranceModel} from '@prisma/client';

export type Tolerance = 'gold' | 'silver' | 'none';

const tolerances: ToleranceModel[] = [
  {
    id: 0,
    name: 'gold',
    tolerance: 5,
    backgroundColor: '#c0891f',
    textColor: '#FFFFFF',
  },
  {
    id: 1,
    name: 'silver',
    tolerance: 10,
    backgroundColor: '#818382',
    textColor: '#FFFFFF',
  },
  {
    id: 2,
    name: 'no color',
    tolerance: 20,
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
];

type ToleranceDictionary = Record<Tolerance, ToleranceModel>;

export const ToleranceDictionary: ToleranceDictionary = tolerances.reduce(
  (prev, cur) => ({ ...prev, [cur.name]: cur }),
  {} as ToleranceDictionary
);

export default tolerances;
