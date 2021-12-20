import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/lab'
import { Divider, Card, Avatar } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H4, Paragraph } from 'app/components/Typography'

const FlexBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 100,
    marginBottom: 3,
    boxShadow: theme.shadows[3],
    border: '4px solid rgba(var(--body), 0.03)',
}))

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main
}))

const InvoiceCustomer = () => {
    const { palette } = useTheme()
    const textPrimary = palette.primary.main

    return (
        <Card sx={{ p: 2 }}>
            <FlexBox sx={{ mb: 2 }}>
                <H4 sx={{ fontWeight: '500' }}>Customer</H4>
                <StyledLink to="/">
                    View Details
                </StyledLink>
            </FlexBox>

            <Divider sx={{ mb: 3 }} />

            <FlexBox
                sx={{
                    mb: 3,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <StyledAvatar src="/assets/images/faces/5.jpg" />
                <h5>Devid Templehov</h5>
                <Paragraph sx={{ mt: 0, mb: 1, color: textPrimary }}>
                    davidtempletone@gmail.com
                </Paragraph>
                <Paragraph sx={{ mt: 0 }}>+21 (050) 071-91-58</Paragraph>
                <Rating readOnly={true} value={4} />
            </FlexBox>

            <Divider sx={{ mb: 3 }} />

            <Box mb={3}>
                <Paragraph sx={{ mb: '12px', fontWeight: '500' }}>
                    Shipping Address
                </Paragraph>
                <Paragraph sx={{ mb: '4px' }}>39, Hilbert Store</Paragraph>
                <Paragraph>New York, NY, United States</Paragraph>
            </Box>

            <div>
                <Paragraph sx={{ mb: '12px', fontWeight: '500' }}>
                    Billing Address
                </Paragraph>
                <Paragraph sx={{ mb: '4px' }}>39, Hilbert Store</Paragraph>
                <Paragraph>New York, NY, United States</Paragraph>
            </div>
        </Card >
    )
}

export default InvoiceCustomer
