import {
    Icon,
    Button,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Card,
} from '@mui/material'
import { format } from 'date-fns'
import { Box, styled } from '@mui/system'
import { getInvoiceById } from './InvoiceService'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { H5, Paragraph } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))

const ButtonBox = styled(FlexBox)(() => ({
    paddingLeft: '16px',
    paddingRight: '16px',
    marginBottom: '20px',
    alignItems: 'center',
    '& button': {
        fontSize: '13px',
        textTransform: 'capitalize',
    },
}))

const TextBox = styled('div')(() => ({
    textAlign: 'right',
    '& h5': {
        fontWeight: '500',
        textTransform: 'capitalize',
    },
}))

const StyledH5 = styled(H5)(() => ({
    fontSize: 15,
    '& span': { fontWeight: 'normal' },
}))

const StyledTable = styled(Table)(({ theme }) => ({
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

const InvoiceViewer = ({ toggleInvoiceEditor }) => {
    const { id } = useParams()
    const [state, setState] = useState({})

    useEffect(() => {
        if (id !== 'add')
            getInvoiceById(id).then((res) => {
                setState({ ...res.data })
            })
    }, [id])

    const handlePrint = () => window.print()

    let subTotalCost = 0
    let {
        orderNo,
        buyer,
        seller,
        item: invoiceItemList = [],
        status,
        vat,
        date,
    } = state

    return (
        <Box py={2} className="invoice-viewer">
            <ButtonBox className="viewer_actions">
                <Link to="/invoice/list">
                    <IconButton>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                </Link>
                <div>
                    <Button
                        sx={{ mr: 2, py: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => toggleInvoiceEditor()}
                    >
                        Edit Invoice
                    </Button>
                    <Button
                        sx={{ py: 1 }}
                        onClick={handlePrint}
                        variant="contained"
                        color="secondary"
                    >
                        Print Invoice
                    </Button>
                </div>
            </ButtonBox>

            <div id="print-area">
                <FlexBox px={2} mb={2} className="viewer__order-info">
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Order Info</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>Order Number</Paragraph>
                        <Paragraph># {orderNo}</Paragraph>
                    </div>
                    <TextBox>
                        <StyledH5 sx={{ mb: 1 }}>
                            <strong>Order status: </strong>
                            <span>{status}</span>
                        </StyledH5>
                        <StyledH5>
                            <strong>Order date: </strong>
                            <span>
                                {date
                                    ? format(
                                          new Date(date).getTime(),
                                          'MMMM dd, yyyy'
                                      )
                                    : ''}
                            </span>
                        </StyledH5>
                    </TextBox>
                </FlexBox>

                <Divider />

                <FlexBox
                    px={2}
                    py="20px"
                    mb={2}
                    className="viewer__billing-info"
                >
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Bill From</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>
                            {seller ? seller.name : null}
                        </Paragraph>
                        <Paragraph sx={{ whiteSpace: 'pre' }}>
                            {seller ? seller.address : null}
                        </Paragraph>
                    </div>
                    <Box width="100%" textAlign="right">
                        <StyledH5 sx={{ mb: 1 }}>Bill To</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>
                            {buyer ? buyer.name : null}
                        </Paragraph>
                        <Paragraph sx={{ whiteSpace: 'pre' }}>
                            {buyer ? buyer.address : null}
                        </Paragraph>
                    </Box>
                    <div />
                </FlexBox>

                <Card sx={{ mb: 2 }} elevation={0}>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoiceItemList.map((item, index) => {
                                subTotalCost += item.unit * item.price
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.price}
                                        </TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>
                                            {item.unit * item.price}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </StyledTable>
                </Card>

                <FlexBox px={2} sx={{ justifyContent: 'flex-end' }}>
                    <Box display="flex">
                        <Box pr={6}>
                            <Paragraph sx={{ my: 2 }}>Sub Total:</Paragraph>
                            <Paragraph sx={{ mb: 2 }}>Vat(%):</Paragraph>
                            <strong>
                                <p>Grand Total:</p>
                            </strong>
                        </Box>
                        <div>
                            <Paragraph sx={{ my: 2 }}>{subTotalCost}</Paragraph>
                            <Paragraph sx={{ mb: 2 }}>{vat}</Paragraph>
                            <p>
                                <strong>
                                    $
                                    {
                                        (subTotalCost +=
                                            (subTotalCost * vat) / 100)
                                    }
                                </strong>
                            </p>
                        </div>
                    </Box>
                </FlexBox>
            </div>
        </Box>
    )
}

export default InvoiceViewer
