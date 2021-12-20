import React, { Fragment } from 'react'
import StatCard5 from './StatCard5'
import TopSellingTable from './TopSellingTable'
import InventoryLineChart from './InventoryLineChart'
import InventoryDoughnutChart from './InventoryDoughnutChart'
import { Card, Divider, Grid, MenuItem, Select } from '@mui/material'
import { H5, H4 } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'

const StyledCard = styled(Card)(() => ({
    height: '100%',
    display: 'flex',
    padding: '20px',
    marginBottom: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const FlexBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Heading = styled(H4)(({ theme }) => ({
    marginBottom: '16px',
    color: theme.palette.text.secondary,
}))

const InventoryDashboard = () => {
    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <Heading>Sales Activity</Heading>
                    <StatCard5 />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Box height="100%" display="flex" flexDirection="column">
                        <Heading>Inventory Summary</Heading>
                        <StyledCard sx={{ mb: 2 }} elevation={3}>
                            <span>QUANTITY IN HAND</span>
                            <H4>540</H4>
                        </StyledCard>

                        <StyledCard elevation={3}>
                            <span>QUANTITY TO BE RECEIVED</span>
                            <H4>120</H4>
                        </StyledCard>
                    </Box>
                </Grid>

                <Grid item sm={6} xs={12}>
                    <Card sx={{ px: 3, py: 2 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item sm={7} xs={12}>
                                <FlexBox sx={{ py: '12px' }}>
                                    <H5
                                        sx={{
                                            fontWeight: '500',
                                            color: textError,
                                        }}
                                    >
                                        Stockout Items
                                    </H5>
                                    <H5 sx={{ color: textError }}>234</H5>
                                </FlexBox>
                                <FlexBox sx={{ py: '12px' }}>
                                    <H5 sx={{ fontWeight: '500' }}>
                                        Low Stock Items
                                    </H5>
                                    <h5>123</h5>
                                </FlexBox>
                                <FlexBox sx={{ py: '12px' }}>
                                    <H5 sx={{ fontWeight: '500' }}>
                                        Available Items
                                    </H5>
                                    <h5>3432</h5>
                                </FlexBox>
                            </Grid>
                            <Grid item sm={5} xs={12}>
                                <InventoryDoughnutChart />
                            </Grid>
                        </Grid>

                        <Divider sx={{ mt: 3 }} />

                        <FlexBox sx={{ p: 2 }}>
                            <H5 sx={{ m: 0 }}>Purchase Order</H5>
                            <Select
                                size="small"
                                defaultValue="this_year"
                                disableUnderline
                            >
                                <MenuItem value="this_year">This Year</MenuItem>
                                <MenuItem value="last_year">Last Year</MenuItem>
                            </Select>
                        </FlexBox>

                        <Box display="flex" justifyContent="space-around">
                            <Box py="12px" textAlign="center">
                                <p>Quantity Ordered</p>
                                <H4 sx={{ color: textPrimary }}>432</H4>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box py="12px" textAlign="center">
                                <p>Total Cost</p>
                                <H4 sx={{ color: textPrimary }}>
                                    ${(432432).toLocaleString()}
                                </H4>
                            </Box>
                        </Box>
                    </Card>
                </Grid>

                <Grid item sm={6} xs={12}>
                    <TopSellingTable />
                </Grid>
            </Grid>

            <Card sx={{ mt: '20px', mb: 3 }} elevation={3}>
                <FlexBox sx={{ p: 2 }}>
                    <H4>Sales Order Summery</H4>
                    <Select
                        size="small"
                        defaultValue="this_year"
                        disableUnderline
                    >
                        <MenuItem value="this_year">This Year</MenuItem>
                        <MenuItem value="last_year">Last Year</MenuItem>
                    </Select>
                </FlexBox>
                <InventoryLineChart />
            </Card>
        </Fragment>
    )
}

export default InventoryDashboard
