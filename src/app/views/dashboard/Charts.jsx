import React from 'react';
import { useTheme, styled } from '@mui/system';
import SimpleCard from 'app/components/cards/SimpleCard';
import SimpleLineChart from './shared/SimpleLineChart';
import StackedAreaChart from './shared/StackedAreaChart';
import AdvanceLineChart from './shared/AdvanceLineChart';
import { monthName } from 'app/utils/helpers';


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

function revenueData (rawData) {
    const revenues = [];
    rawData.forEach(month => {
        const monthData = {};
        const keyName = Object.keys(month)[0];
        const { totalRevenues, netRevenues } = month[keyName];
        const affiliateRevenues = totalRevenues - netRevenues;
        const label = monthName(keyName.split('-')[1]);
        monthData["name"] = label;
        monthData["Net Revenues"] = netRevenues;
        monthData["Affiliate Revenues"] = affiliateRevenues;
        revenues.push(monthData);
    });
    return revenues;
}

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
