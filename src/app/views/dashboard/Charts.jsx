import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import { styled, Box } from '@mui/system';
import SimpleCard from 'app/components/cards/SimpleCard';
import SimpleLineChart from './shared/SimpleLineChart';
import StackedAreaChart from './shared/StackedAreaChart';
import { H4 } from 'app/components/Typography';
import { monthName } from 'app/utils/helpers';
import { rawData } from './shared/dummyData';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}));

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
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
            <FlexBox>
                <H4>Discrete</H4>
                <Switch />
                <H4>Cumulative</H4>
            </FlexBox>
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
