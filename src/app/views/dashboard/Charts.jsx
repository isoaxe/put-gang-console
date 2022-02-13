import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import SimpleCard from 'app/components/cards/SimpleCard';
import SimpleLineChart from './shared/SimpleLineChart';
import StackedAreaChart from './shared/StackedAreaChart';
import { monthName } from 'app/utils/helpers';
import { rawData } from './shared/dummyData';


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

function formatData (rawData) {
    const chartData = [];
    rawData.forEach(month => {
        const monthData = {};
        const keyName = Object.keys(month)[0];
        const { totalRevenues, netRevenues, joined, cancelled } = month[keyName];
        const affiliateRevenues = totalRevenues - netRevenues;
        const netMovement = joined - cancelled;
        const label = monthName(keyName.split('-')[1]);
        monthData["month"] = label;
        monthData["Net Revenues"] = netRevenues;
        monthData["Affiliate Revenues"] = affiliateRevenues;
        monthData["Subscriptions"] = joined;
        monthData["Cancellations"] = cancelled;
        monthData["Net Movement"] = netMovement;
        chartData.push(monthData);
    });
    return chartData;
}

const Charts = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      setChartData(formatData(rawData));
    }, []);

    return (
        <Container>
            <SimpleCard title="Revenues">
                <StackedAreaChart data={chartData} />
            </SimpleCard>
            <SimpleCard title="Subscribers">
                <SimpleLineChart data={chartData} />
            </SimpleCard>
        </Container>
    )
}

export default Charts;
