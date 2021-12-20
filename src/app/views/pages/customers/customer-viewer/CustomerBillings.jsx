import {
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
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const ContentBox = styled(FlexBox)(() => ({
    flexDirection: 'column',
    alignItems: 'flex-start',
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

const CustomerBillings = () => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Billing</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    {customerInfo.map((item, ind) => (
                        <TableRow key={ind}>
                            <TableCell sx={{ pl: 2 }}>{item.title}</TableCell>
                            <TableCell>{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ContentBox px={2}>
                <StyledButton sx={{ mb: '4px' }}>
                    <Icon sx={{ mr: 1 }} fontSize="small">
                        attach_money
                    </Icon>
                    Create Invoice
                </StyledButton>

                <StyledButton>
                    <Icon sx={{ mr: 1 }} fontSize="small">
                        receipt
                    </Icon>
                    Resend Due Invoices
                </StyledButton>
            </ContentBox>
        </Card>
    )
}

const customerInfo = [
    {
        title: 'Credit Card',
        value: '**** **** **** **** 4242',
    },
    {
        title: 'Paid',
        value: '5 ($500.00)',
    },
    {
        title: 'Draft',
        value: '2 ($150.00)',
    },
    {
        title: 'Unpaid/Due',
        value: '1 ($355.00)',
    },
    {
        title: 'Refunded',
        value: '0 ($0.00)',
    },
    {
        title: 'Gross Income',
        value: '$2,100.00',
    },
]

export default CustomerBillings
