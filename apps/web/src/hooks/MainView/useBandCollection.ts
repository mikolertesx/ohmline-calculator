import {
    Resistance as ResistanceModel,
    Tolerance as ToleranceModel,
} from "prisma-database";
import { useCallback, useMemo, useState } from "react";

type Nullable<T> = T | null;

export type BandCollection = [
    Nullable<ResistanceModel>,
    Nullable<ResistanceModel>,
    Nullable<ResistanceModel>,
    Nullable<ToleranceModel>,
];

export type BandCollectionIndex = 0 | 1 | 2 | 3;
export type BandCollectionResistanceSlice = 0 | 1 | 2;
export type BandCollectionToleranceSlice = 3;

// Creates a type safe function for update single band.
export type UpdateSingleBandArgs = <TPosition extends BandCollectionIndex, TBandType extends BandCollection[TPosition]>(position: TPosition, type: NonNullable<TBandType>) => void;
export type GetSingleBandArgs = <TPosition extends BandCollectionIndex, TBandType extends BandCollection[TPosition]>(position: TPosition) => Nullable<TBandType>;


const useBandCollection = () => {
    const [bandCollection, setBandCollection] = useState<BandCollection>([null, null, null, null]);
    const bandList = useMemo(() => {
        if (bandCollection === null) {
            return [null, null, null, null];
        }

        return bandCollection;
    }, [bandCollection]);

    const updateSingleBand: UpdateSingleBandArgs = useCallback((position, type) => {
        setBandCollection((prevData) => {
            prevData[position] = type;
            return prevData;
        });
    }, []);

    const getSingleBand = useCallback(<TPosition extends BandCollectionIndex, TBand extends BandCollection[TPosition]>(position: TPosition | null): Nullable<TBand> => {
        if (position === null) {
            return null;
        }

        return bandCollection[position] as Nullable<TBand>;
    }, []);

    const [resistanceA, resistanceB, resistanceC, tolerance] = bandList;

    return { resistanceA, resistanceB, resistanceC, tolerance, updateSingleBand, setBandCollection, getSingleBand };
}

export default useBandCollection;
