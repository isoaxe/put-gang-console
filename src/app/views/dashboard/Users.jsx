import React from 'react'
import UserList from './../list/UserList';
import { H3 } from './../../components/Typography';
import { styled } from '@mui/system'
import {
    TextField,
    MenuItem,
} from '@mui/material'

const AnalyticsRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
}))

const Console = () => {

    return (
        <AnalyticsRoot>
            <FlexBox>
                <H3 sx={{ m: 0 }}>Users</H3>
                <TextField
                    defaultValue="1"
                    variant="outlined"
                    size="small"
                    select
                >
                    <MenuItem value="1">This Month</MenuItem>
                    <MenuItem value="2">Last Month</MenuItem>
                    <MenuItem value="3">Six Month</MenuItem>
                    <MenuItem value="4">Last Year</MenuItem>
                </TextField>
            </FlexBox>

            <UserList />
        </AnalyticsRoot>
    )
}

export default Console
