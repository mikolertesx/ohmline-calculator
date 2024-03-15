import { useState } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import styles from './Display.module.scss';

type DisplayProps = {
    minimum: string;
    base: string;
    maximum: string;
    tolerance?: number;
};

type Mode = 'detailed' | 'simple';

const bigNumberWriting = (text: string) => {
    if (isNaN(Number(text))) {
        return NaN;
    }


    return new Intl.NumberFormat('en-us', {
        notation: 'compact'
    }).format(Number(text));
};

const commaWriting = (text: string) => {
    if (isNaN(Number(text))) {
        return NaN;
    }


    return new Intl.NumberFormat().format(Number(text));
};

const Display = ({ base, maximum, minimum, tolerance }: DisplayProps) => {
    const [mode, setMode] = useState<Mode>('simple');
    const [tutorial, setTutorial] = useState(true);

    if (Number.isNaN(base) || Number.isNaN(maximum) || Number.isNaN(minimum)) {
        return <p>
            Loading
        </p>
    }

    const switchMode = () => {
        setTutorial(false);
        setMode(prevMode => prevMode === 'detailed' ? 'simple' : 'detailed');
    };

    let baseContent = <p className={styles['big']}>{bigNumberWriting(base)} Ω {tolerance}%  &plusmn;</p>;

    if (mode === 'detailed') {
        baseContent = <>
            <p className={styles['small']}>{commaWriting(minimum)} Ω</p>
            <p className={styles['big']}>{commaWriting(base)} Ω</p>
            <p className={styles['small']}>{commaWriting(maximum)} Ω</p>
        </>
    }

    return (
        <Card variant="outlined" onClick={switchMode} sx={{ userSelect: 'none', cursor: 'pointer' }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                }}
                    className={styles['display']}>
                    {baseContent}
                </Box>
                {tutorial && <Box>
                    <Typography>Click on this bar to toggle modes</Typography>
                </Box>}
            </CardContent>
        </Card>
    );
};

export default Display;
