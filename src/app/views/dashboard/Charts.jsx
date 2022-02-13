import React from 'react';
import { useTheme, styled } from '@mui/system';
import SimpleCard from 'app/components/cards/SimpleCard';
import SimpleLineChart from './shared/SimpleLineChart';
import StackedAreaChart from './shared/StackedAreaChart';
import AdvanceLineChart from './shared/AdvanceLineChart';


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
    const { palette } = useTheme();
    const textPrimary = palette.primary.main;

    return (
        <Container>
            <SimpleCard title="apex line chart">
                <AdvanceLineChart
                    chartData={[
                        {
                            name: 'A',
                            data: [40, 80, 20, 90, 145, 80, 125, 60, 120, 70],
                        },
                    ]}
                    colors={[textPrimary]}
                    height={300}
                />
            </SimpleCard>
            <SimpleCard title="stacked area chart">
                <StackedAreaChart />
            </SimpleCard>
            <SimpleCard title="simple line chart">
                <SimpleLineChart />
            </SimpleCard>
        </Container>
    )
}

export default Charts;
