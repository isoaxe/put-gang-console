import {
    Button,
    Card,
    Divider,
    Icon,
    MenuItem,
    TextField,
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
    marginBottom: '16px',
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

const CustomerEmailSender = () => {
    const bgGrey = 'rgb(0, 0, 0, 0.15)'

    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Send Email</H4>
            <Divider sx={{ mb: 2 }} />

            <ContentBox px={2}>
                <TextField
                    sx={{ mb: 2 }}
                    defaultValue="Resend Last Invoice"
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                >
                    {menuItemList.map((item) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    ))}
                </TextField>

                <StyledButton sx={{ px: 2, background: bgGrey }}>
                    <Icon>mail_outline</Icon>
                    Send Email
                </StyledButton>
            </ContentBox>

            <Table>
                <TableBody>
                    {customerInfo.map((item, ind) => (
                        <TableRow key={ind}>
                            <TableCell sx={{ pl: 2 }}>{item.title}</TableCell>
                            <TableCell>{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}

const menuItemList = [
    'Resend Last Invoice',
    'Send Password Reset Email',
    'Send Verification Email',
]

const customerInfo = [
    {
        title: '27/10/2020 | 12:23',
        value: 'Order Received',
    },
    {
        title: '11/05/2020 | 01:19',
        value: 'Order Confirmation',
    },
]

export default CustomerEmailSender
