import React from 'react'
import ActivityList from './../list/ActivityList';
import StatCard3 from './shared/StatCard3'
import StatCard4 from './shared/StatCard4'
import FollowerCard from './shared/FollowerCard'
import FollowerCard2 from './shared/FollowerCard2'
import ComparisonChart2 from './shared/ComparisonChart2'
import GaugeProgressCard from './shared/GuageProgressCard'
import { H3, Span } from './../../components/Typography';
import { styled, useTheme } from '@mui/system'
import {
    Card,
    TextField,
    MenuItem,
    IconButton,
    Icon,
    Grid,
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
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    return (
        <AnalyticsRoot>
            <FlexBox>
                <H3 sx={{ m: 0 }}>Overview</H3>
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

            <StatCard3 />

            <H3 sx={{ marginTop: 8 }}>Activity</H3>
            <ActivityList />

            <Card sx={{ mt: '20px', mb: '24px' }} elevation={3}>
                <FlexBox
                    sx={{
                        px: 2,
                        py: '12px',
                        background: 'rgba(0, 0, 0, 0.01)',
                    }}
                >
                    <Span sx={{ fontWeight: '500', color: textMuted }}>
                        STATISTICS
                    </Span>
                </FlexBox>
                <ComparisonChart2 height={400} />
            </Card>

        </AnalyticsRoot>
    )
}

export default Console
