import {Resistance, Tolerance} from 'prisma-database'

export type GetResistanceColorsResponse = {
  data: Resistance[];
};

export type GetToleranceColorsResponse = {
  data: Tolerance[];
};

export type PostCalculateResponse = {
  result: [minTolerance: string, baseTolerance: string, maxTolerance: string];
};
