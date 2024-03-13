export type ResistanceColors =
  | 'black'
  | 'brown'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet'
  | 'grey'
  | 'white';

export type ToleranceColors = 'gold' | 'silver' | 'none';

export interface IOhmValueCalculator {
  /**
   * @function CalculateOhmValue
   * @param bandAColor The color of the first figure of component value band.
   * @param bandBColor The color of the second significant figure band.
   * @param bandCColor The color of the decimal multiplier band.
   * @param bandDColor The color of the tolerance value band.
   **/

  CalculateOhmValue(
    bandAColor: string,
    bandBColor: string,
    bandCColor: string,
    bandDColor: string
  ): [number, number, number];
}
