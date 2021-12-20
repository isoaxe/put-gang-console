import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import RecentUpdates from './shared/RecentUpdates'
import InventoryDashboard from './shared/InventoryDashboard'
import { styled } from '@mui/system'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const InventoryManagement = () => {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Container className="analytics">
            <Tabs
                sx={{ mt: 2, mb: 3 }}
                value={tabIndex}
                onChange={(e, value) => setTabIndex(value)}
                indicatorColor="primary"
                textColor="primary"
            >
                {['Dashboard', 'Recent Updates'].map((item, ind) => (
                    <Tab
                        key={ind}
                        value={ind}
                        label={item}
                        sx={{
                            px: '35px',
                            textTransform: 'capitalize',
                        }}
                    />
                ))}
            </Tabs>

            {tabIndex === 0 && <InventoryDashboard />}
            {tabIndex === 1 && <RecentUpdates />}
        </Container>
    )
}

export default InventoryManagement
