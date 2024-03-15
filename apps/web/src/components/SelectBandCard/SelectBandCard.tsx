import { Card, CardContent, Typography } from "@mui/material";

type SelectBandCardProps = {
    visible?: boolean;
};

const SelectBandCard = ({ visible }: SelectBandCardProps) => {
    if (!visible) {
        return null;
    }

    return <Card variant='outlined'>
        <CardContent>
            <Typography variant='h1' mt={2} textAlign='center'>
                Click on the bands to select values.
            </Typography>
        </CardContent>
    </Card>;
};

export default SelectBandCard;
