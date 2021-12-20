import {
    Avatar,
    Button,
    Card,
    Divider,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material'
import React from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { H4, H5, Small } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const ContentBox = styled(FlexBox)(() => ({
    flexDirection: 'column',
}))

const StyedSmall = styled(Small)(() => ({
    padding: '2px 4px',
    color: '#08ad6c',
    borderRadius: '4px',
    background: 'rgba(9, 182, 109, 0.15)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '13px',
    marginBottom: '16px',
    color: theme.palette.text.primary,
    '& span, svg': {
        fontSize: '1.25rem',
        marginRight: '16px',
    },
}))

const CustomerInfo = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const textMuted = palette.text.secondary

    return (
        <Card sx={{ pt: 3 }} elevation={3}>
            <ContentBox mb={3} alignContent="center">
                <Avatar
                    sx={{ width: 84, height: 84 }}
                    src="/assets/images/faces/10.jpg"
                />
                <H4 sx={{ mt: '16px', mb: '8px' }}>Ben Peterson</H4>
                <Small sx={{ color: textMuted }}>CEO, Brack Ltd.</Small>
            </ContentBox>

            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ pl: 2 }}>Email</TableCell>
                        <TableCell>
                            <div>ui-lib@example.com</div>
                            <StyedSmall>EMAIL VERIFIED</StyedSmall>
                        </TableCell>
                    </TableRow>
                    {customerInfo.map((item, ind) => (
                        <TableRow key={ind}>
                            <TableCell sx={{ pl: 2 }}>{item.title}</TableCell>
                            <TableCell>{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ContentBox sx={{ alignItems: 'flex-start' }} px={2}>
                <StyledButton sx={{ mb: '4px' }}>
                    <Icon>lock_open</Icon>
                    Reset & Send Password
                </StyledButton>

                <StyledButton>
                    <Icon>person</Icon>
                    Login as Customer
                </StyledButton>
            </ContentBox>
        </Card>
    )
}

const customerInfo = [
    {
        title: 'Phone',
        value: '+1 439 327 546',
    },
    {
        title: 'Country',
        value: 'USA',
    },
    {
        title: 'State/Region',
        value: 'New York',
    },
    {
        title: 'Address 1',
        value: 'Street Tailwood, No. 17',
    },
    {
        title: 'Address 2',
        value: 'House #19',
    },
]

export default CustomerInfo
