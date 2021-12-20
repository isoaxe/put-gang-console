import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Card,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getAllInvoice, deleteInvoice } from './InvoiceService'
import { Link, useNavigate } from 'react-router-dom'
import { ConfirmationDialog } from 'app/components'
import clsx from 'clsx'
import { Box, styled } from '@mui/system'

const Container = styled(Box)(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: 750,
    '& thead': {
        '& tr': {
            background: theme.palette.background.default,
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
            '& th:first-child': {
                paddingLeft: '24px !important',
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '16px !important',
                },
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
            '& td:first-child': {
                textTransform: 'capitalize',
                paddingLeft: '24px !important',
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '16px !important',
                },
            },
        },
    },
}))

const Invoice = styled('small')(({ theme, status }) => ({
    padding: 1,
    color: '#fff',
    borderRadius: '4px',
    background:
        status === 'delivered'
            ? theme.palette.primary.main
            : status === 'processing'
                ? theme.palette.secondary.main
                : status === 'pending' && theme.palette.error.main,
}))

const InvoiceList = () => {
    const [invoiceList, setInvoiceList] = useState([])
    const [invoice, setInvoice] = useState(null)
    const [open, setOpen] = useState(false)
    const [isAlive, setIsAlive] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getAllInvoice().then((res) => {
            if (isAlive) setInvoiceList(res.data)
        })

        return () => setIsAlive(false)
    }, [isAlive])

    const handeViewClick = (invoiceId) => {
        navigate(`/invoice/${invoiceId}`)
    }

    const handeDeleteClick = (invoice) => {
        setInvoice(invoice)
        setOpen(true)
    }

    const handleConfirmationResponse = () => {
        deleteInvoice(invoice).then((res) => {
            if (isAlive) {
                setInvoiceList(res.data)
                setOpen(false)
            }
        })
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    return (
        <Container>
            <Link to="/invoice/add">
                <Button sx={{ mb: 2 }} variant="contained" color="primary">
                    Add Invoice
                </Button>
            </Link>
            <Card elevation={6} sx={{ width: '100%', overflow: 'auto' }}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order No.</TableCell>
                            <TableCell>Bill From</TableCell>
                            <TableCell>Bill To</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceList.map((invoice, index) => (
                            <TableRow key={invoice.id}>
                                <TableCell align="left">
                                    {invoice.orderNo}
                                </TableCell>
                                <TableCell align="left">
                                    {invoice.seller.name}
                                </TableCell>
                                <TableCell align="left">
                                    {invoice.buyer.name}
                                </TableCell>
                                <TableCell>
                                    <Invoice status={invoice.status}>
                                        {invoice.status}
                                    </Invoice>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        sx={{ mr: 1 }}
                                        color="primary"
                                        onClick={() =>
                                            handeViewClick(invoice.id)
                                        }
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={() =>
                                            handeDeleteClick(invoice)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </Card>
            <ConfirmationDialog
                open={open}
                onConfirmDialogClose={handleDialogClose}
                onYesClick={handleConfirmationResponse}
                text="Are you sure to delete?"
            />
        </Container>
    )
}

export default InvoiceList
