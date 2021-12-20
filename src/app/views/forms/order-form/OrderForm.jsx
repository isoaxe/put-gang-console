import React from 'react'
import InvoiceOverview from './InvoiceOverview'
import InvoiceCustomer from './InvoiceCustomer'
import { IconButton, Icon, Button, Grid } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H3 } from 'app/components/Typography'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const LeftContent = styled('div')(() => ({
    flexWrap: 1,
    display: 'flex',
    marginBottom: '24px',
    justifyContent: 'space-between',
}))

const TextBox = styled('div')(({ bgColor }) => ({
    color: '#fff',
    fontSize: '11px',
    padding: '3px 12px',
    borderRadius: '4px',
    background: bgColor,
}))

const Invoice2 = () => {
    const { palette } = useTheme()
    const bgSecondary = palette.secondary.main

    return (
        <Container>
            <LeftContent>
                <div>
                    <H3
                        sx={{
                            mb: 2,
                            fontSize: '28px',
                            fontWeight: '500',
                        }}
                    >
                        Order #1028
                    </H3>
                    <Box display="flex">
                        <TextBox bgColor={'#08ad6c'} sx={{ mr: '12px' }}>
                            Paid
                        </TextBox>
                        <TextBox bgColor={bgSecondary}>Unfulfilled</TextBox>
                    </Box>
                </div>

                <div>
                    <IconButton sx={{ mr: 1 }}>
                        <Icon>more_horiz</Icon>
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'capitalize' }}
                    >
                        Fulfill Order
                    </Button>
                </div>
            </LeftContent>

            <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                    <InvoiceOverview />
                </Grid>
                <Grid item md={4} xs={12}>
                    <InvoiceCustomer />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Invoice2
