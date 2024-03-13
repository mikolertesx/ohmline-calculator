import {
  ResistanceColors,
  IOhmValueCalculator,
  ToleranceColors,
} from 'api-interface';

import {Resistance, Tolerance} from 'prisma-database';

type TResistanceDictionary = Record<ResistanceColors, {modifier: number;}>;
type TToleranceDictionary = Record<ToleranceColors, {tolerance: number;}>;

class OhmValueCalculator implements IOhmValueCalculator {
  resistanceDictionary: TResistanceDictionary;
  toleranceDictionary: TToleranceDictionary;

  static createResistanceDictionary(resistance: Resistance[]) {
    return resistance.reduce(
      (prev, cur) => ({ ...prev, [cur.name]: cur }),
      {} as TResistanceDictionary);
  }

  static createToleranceDictionary(tolerance: Tolerance[]) {
    return tolerance.reduce(
      (prev, cur) => ({ ...prev, [cur.name]: cur }),
      {} as TToleranceDictionary);
  }

  constructor(resistance: Resistance[], tolerance: Tolerance[]) {
    const resistanceDictionary = OhmValueCalculator.createResistanceDictionary(resistance);
    const toleranceDictionary = OhmValueCalculator.createToleranceDictionary(tolerance);

    this.resistanceDictionary = resistanceDictionary;
    this.toleranceDictionary = toleranceDictionary;
  };

  getToleranceFromColor(tolerance: string) {
    if (tolerance in this.toleranceDictionary) {
      return this.toleranceDictionary[tolerance as ToleranceColors].tolerance;
    }

    return NaN;
  }

  getResistanceFromColor(color: string) {
    if (color in this.resistanceDictionary) {
      return this.resistanceDictionary[color as ResistanceColors].modifier;
    }

    return NaN;
  }

  CalculateOhmValue(
    bandAColor: string,
    bandBColor: string,
    bandCColor: string,
    bandDColor: string
  ): [number, number, number] {
    // TODO Write a proper algorithm to calculate resistances.
    // Naive algorithm.
    const colorCodes = [bandAColor, bandBColor, bandCColor];
    const [firstColorValue, secondColorValue, multiplier] = colorCodes.map(
      (colorCode) => this.getResistanceFromColor(colorCode)
    );

    const tolerance = this.getToleranceFromColor(bandDColor);

    let zeroString = '';

    for (let i = 0; i < multiplier; i++) {
      zeroString += '0';
    }

    const totalValue = Number(
      `${firstColorValue}${secondColorValue}${zeroString}`
    );

    const percentage = tolerance / 100;
    const maxValue = totalValue * (1 + percentage);
    const minValue = totalValue * (1 - percentage);

    return [minValue, totalValue, maxValue];
  }
}

export default OhmValueCalculator;
