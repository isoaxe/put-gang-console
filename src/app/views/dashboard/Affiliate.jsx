import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import { getData } from './../../utils/helpers';
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
    const [invoices, setInvoices] = useState([]);
    const { affiliateData } = useLocation().state;
    const { uid, name, email } = affiliateData;

    useEffect(() => {
      if (uid) {
        getData(`/payments/invoices/${uid}`, setInvoices);
      }
    }, [uid]);

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
