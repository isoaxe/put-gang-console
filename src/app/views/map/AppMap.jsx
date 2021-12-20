import React from 'react'
import BasicMap from './BasicMap'
import MarkerMap from './MarkerMap'
import { Card } from '@mui/material'
import { Breadcrumb } from 'app/components'
import { Box, styled } from '@mui/system'

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

const AppMap = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Map' }]} />
            </div>
            <Card>
                <BasicMap />
            </Card>
            <Box py="12px" />
            <Card>
                <MarkerMap />
            </Card>
        </Container>
    )
}

export default AppMap
