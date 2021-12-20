import React from 'react'
import TwoListDnD from './TwoListDnD'
import { Box, styled } from '@mui/system'
import SimpleListDnD from './SimpleListDnD'
import SimpleHorizontalList from './SimpleHorizontalList'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'
import SimpleCard from 'app/components/cards/SimpleCard'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    "& .breadcrumb": {
        margin: '30px',
        [theme.breakpoints.down('sm')]: {
            margin: '16px',
        },
    }
}))

const AppDragAndDrop = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'others', path: '/drag-and-drop' },
                        { name: 'Drag and Drop' },
                    ]}
                />
            </div>
            <SimpleCard title="Simple List Drag and Drop">
                <SimpleListDnD />
            </SimpleCard>
            <Box sx={{ py: '12px' }} />
            <SimpleCard title="Simple Horizontal List Drag and Drop">
                <SimpleHorizontalList />
            </SimpleCard>
            <Box sx={{ py: '12px' }} />
            <SimpleCard title="Simple Two List Drag and Drop">
                <TwoListDnD />
            </SimpleCard>
        </Container>
    )
}

export default AppDragAndDrop
