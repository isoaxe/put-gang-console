import React from 'react';
import { styled } from '@mui/system';
import SimpleLineChart from './shared/SimpleLineChart';
import SimpleCard from 'app/components/cards/SimpleCard';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}));

const Charts = () => {
    return (
        <Container>
            <SimpleCard title="simple line chart">
                <SimpleLineChart />
            </SimpleCard>
        </Container>
    )
}

export default Charts;
