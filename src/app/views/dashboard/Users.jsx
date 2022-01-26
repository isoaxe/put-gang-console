import React from 'react'
import UserTable from './../list/UserTable';
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
            <UserTable />
        </AnalyticsRoot>
    )
}

export default Console
