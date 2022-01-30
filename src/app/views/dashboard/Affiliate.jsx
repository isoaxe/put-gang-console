import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import InvoicesList from './../list/InvoicesList';
import StatCard3 from './shared/StatCard3';
import { Breadcrumb } from './../../../app/components';
import { H3 } from './../../components/Typography';

const AnalyticsRoot = styled('div')(({ theme }) => ({
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
}))

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
}))

const Affiliate = () => {
    const { affiliateData } = useLocation().state;
    const { name, email } = affiliateData;

    return (
        <AnalyticsRoot>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Affiliates', path: '/dashboard/affiliates' },
                        { name: name || email },
                    ]}
                />
            </div>

            <FlexBox>
                <H3 sx={{ m: 0 }}>Overview</H3>
            </FlexBox>

            <StatCard3 userStats={affiliateData} />

            <H3 sx={{ marginTop: 8 }}>Invoices</H3>
            <InvoicesList />

        </AnalyticsRoot>
    )
}

export default Affiliate;
