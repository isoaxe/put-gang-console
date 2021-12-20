import React from 'react'
import { styled, Box } from '@mui/system'
import SimpleLineChart from './SimpleLineChart'
import StackedAreaChart from './StackedAreaChart'
import SimpleBarChart from './SimpleBarChart'
import LineBarAreaComposedChart from './LineBarAreaComposedChart'
import SimpleScatterChart from './SimpleScatterChart'
import TwoSimplePieChart from './TwoSimplePieChart'
import SimpleRadarChart from './SimpleRadarChart'
import SimpleRadialBar from './SimpleRadialBar'
import SimpleTreeMap from './SimpleTreeMap'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'
import SimpleCard from 'app/components/cards/SimpleCard'

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
}))

const AppRechart = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Charts', path: '/charts' },
                        { name: 'Recharts' },
                    ]}
                />
            </div>
            <SimpleCard title="simple line chart">
                <SimpleLineChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="stacked area chart">
                <StackedAreaChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="simple bar Chart">
                <SimpleBarChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="line bar area composed Chart">
                <LineBarAreaComposedChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="simple scatter Chart">
                <SimpleScatterChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="two simple pie chart">
                <TwoSimplePieChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="simple radar chart">
                <SimpleRadarChart />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="simple radial chart">
                <SimpleRadialBar />
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="simple tree map">
                <SimpleTreeMap />
            </SimpleCard>
        </Container>
    )
}

export default AppRechart
