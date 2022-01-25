import React from 'react'
import CustomerList from './../list/CustomerList';
import { styled } from '@mui/system'


const AnalyticsRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Console = () => {

    return (
        <AnalyticsRoot>
            <CustomerList />
        </AnalyticsRoot>
    )
}

export default Console
