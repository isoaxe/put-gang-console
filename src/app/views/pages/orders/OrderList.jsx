import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { Grow, Icon, IconButton, TextField, Tooltip } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { Span } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Ellipsis = styled(Span)(() => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
}))

const StyledSpan = styled(Span)(({ bgColor }) => ({
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'capitalize',
    background: bgColor,
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const OrderList = () => {
    const { palette } = useTheme()
    const textGreen = '#08ad6c'
    const bgGreen = 'rgba(9, 182, 109, 1)'
    const bgError = palette.error.main
    const bgSecondary = palette.secondary.main

    const columns = [
        {
            name: '_id',
            label: 'Order No.',
            options: {
                customBodyRenderLite: (dataIndex) => (
                    <Ellipsis>{orderList[dataIndex]._id}</Ellipsis>
                ),
            },
        },
        {
            name: 'customerName',
            label: 'Customer',
            options: {
                filter: true,
            },
        },
        {
            name: 'productName',
            label: 'Product',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <Ellipsis>{orderList[dataIndex].productName}</Ellipsis>
                ),
            },
        },
        {
            name: 'date',
            label: 'Date',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <Ellipsis>
                        {format(orderList[dataIndex].date, 'dd MMM, yyyy')}
                    </Ellipsis>
                ),
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let status = orderList[dataIndex].status

                    switch (status) {
                        case 'delivered':
                            return (
                                <StyledSpan bgColor={bgGreen}>
                                    {status}
                                </StyledSpan>
                            )
                        case 'processing':
                            return (
                                <StyledSpan bgColor={bgSecondary}>
                                    {status}
                                </StyledSpan>
                            )
                        case 'cancelled':
                            return (
                                <StyledSpan bgColor={bgError}>
                                    {status}
                                </StyledSpan>
                            )

                        default:
                            break
                    }
                },
            },
        },
        {
            name: 'method',
            label: 'Method',
            options: {
                filter: true,
            },
        },
        {
            name: 'total',
            label: 'Total',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <span>${orderList[dataIndex].total.toFixed(2)}</span>
                ),
            },
        },
        {
            name: 'action',
            label: ' ',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>
                        <Tooltip title="Mark as Delivered">
                            <IconButton>
                                <Icon
                                    sx={{ color: textGreen }}
                                    fontSize="small"
                                >
                                    done
                                </Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel Order">
                            <IconButton>
                                <Icon color="error" fontSize="small">
                                    clear
                                </Icon>
                            </IconButton>
                        </Tooltip>
                        <Link to={`/invoice/${orderList[dataIndex]._id}`}>
                            <Tooltip title="View Order">
                                <IconButton>
                                    <Icon fontSize="small">
                                        arrow_right_alt
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </FlexBox>
                ),
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pages', path: '/pages' },
                        { name: 'Order List' },
                    ]}
                />
            </div>
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'All Orders'}
                        data={orderList}
                        columns={columns}
                        options={{
                            filterType: 'textField',
                            responsive: 'standard',
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                            onRowsDelete: (data) => console.log(data),
                            customSearchRender: (
                                searchText,
                                handleSearch,
                                hideSearch,
                                options
                            ) => {
                                return (
                                    <Grow appear in={true} timeout={300}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={({ target: { value } }) =>
                                                handleSearch(value)
                                            }
                                            InputProps={{
                                                style: {
                                                    paddingRight: 0,
                                                },
                                                startAdornment: (
                                                    <Icon
                                                        fontSize="small"
                                                        sx={{ mr: 1 }}
                                                    >
                                                        search
                                                    </Icon>
                                                ),
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={hideSearch}
                                                    >
                                                        <Icon fontSize="small">
                                                            clear
                                                        </Icon>
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grow>
                                )
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    )
}

const orderList = [
    {
        _id: 'lkfjdfjdsjdslgkfjdskjfds',
        date: new Date(),
        customerName: 'Ben Schieldman',
        productName: 'Bit Bass Headphone',
        method: 'PayPal',
        total: 15.25,
        status: 'delivered',
    },
    {
        _id: 'fkjjirewoigkjdhvkcxyhuig',
        date: new Date(),
        customerName: 'Joyce Watson',
        productName: 'Comlion Watch',
        method: 'Visa Card',
        total: 75.25,
        status: 'cancelled',
    },
    {
        _id: 'fdskjkljicuviosduisjd',
        date: new Date(),
        customerName: 'Kayle Brown',
        productName: 'Beats Headphone',
        method: 'Master Card',
        total: 45.25,
        status: 'processing',
    },
    {
        _id: 'fdskfjdsuoiucrwevbgd',
        date: new Date(),
        customerName: 'Ven Helsing',
        productName: 'BMW Bumper',
        method: 'Master Card',
        total: 2145.25,
        status: 'delivered',
    },
]
export default OrderList
