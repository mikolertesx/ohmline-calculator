import { Resistance, Tolerance } from 'prisma-database';
import { useEffect } from 'react';

type UseDefaultValuesProps = {
    resistances?: Resistance[];
    tolerances?: Tolerance[];
    setDefault: (props: [arg: Resistance, arg: Resistance, arg: Resistance, arg: Tolerance]) => void;
};

const useDefaultValues = ({ resistances, tolerances, setDefault }: UseDefaultValuesProps) => {
    // Pick default values.
    useEffect(() => {
        if (!resistances || !tolerances) return;

        const [first, second, third] = resistances;
        const defaultTolerance = tolerances?.[0];

        setDefault([first, second, third, defaultTolerance]);
    }, [resistances, tolerances]);

};

export default useDefaultValues;
