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

function revenueData (rawData) {
    const revenues = [];
    rawData.forEach(month => {
        const monthData = {};
        const keyName = Object.keys(month)[0];
        const { totalRevenues, netRevenues, joined, cancelled } = month[keyName];
        const affiliateRevenues = totalRevenues - netRevenues;
        const netMovement = joined - cancelled;
        const label = monthName(keyName.split('-')[1]);
        monthData["name"] = label;
        monthData["Net Revenues"] = netRevenues;
        monthData["Affiliate Revenues"] = affiliateRevenues;
        monthData["Subscriptions"] = joined;
        monthData["Cancellations"] = cancelled;
        monthData["Net Movement"] = netMovement;
        revenues.push(monthData);
    });
    return revenues;
}

const Charts = () => {
    const [revenues, setRevenues] = useState([]);

    useEffect(() => {
      setRevenues(revenueData(rawData));
    }, []);

    return (
        <Container>
            <SimpleCard title="Revenues">
                <StackedAreaChart revenues={revenues} />
            </SimpleCard>
            <SimpleCard title="simple line chart">
                <SimpleLineChart />
            </SimpleCard>
        </Container>
    )
}

export default Charts;
