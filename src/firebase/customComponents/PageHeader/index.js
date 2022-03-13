import Card from '../Card';
import { Grid } from '@material-ui/core';

export default function PageHeader(props) {
    const {title} = props;
    return (
        <Card>
            <Grid container>
                <Grid item xs={5} md={5}>
                    <h2>{title}</h2>
                </Grid>
            </Grid>
        </Card>
    );
}