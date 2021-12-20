import React from 'react'
import { Breadcrumb } from 'app/components'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { H4, H5, Paragraph, Span, Small } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
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
    background: bgColor,
}))

const IMG = styled('img')(() => ({
    height: 32,
    borderRadius: '4px',
}))

const ProductList = () => {
    const { palette } = useTheme()
    const textMuted = palette.text.secondary
    const bgGreen = 'rgba(9, 182, 109, 1)'
    const bgError = palette.error.main
    const bgSecondary = palette.secondary.main

    const columns = [
        {
            name: 'name', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let user = productList[dataIndex]

                    return (
                        <FlexBox>
                            <IMG src={user?.imgUrl} alt="user" />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>{user?.name}</H5>
                                <Small sx={{ color: textMuted }}>
                                    {user?.email}
                                </Small>
                            </Box>
                        </FlexBox>
                    )
                },
            },
        },
        {
            name: 'description',
            label: 'Details',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <Ellipsis>{productList[dataIndex].description}</Ellipsis>
                ),
            },
        },
        {
            name: 'quantity',
            label: 'Invenotry',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let quantity = productList[dataIndex].quantity

                    if (quantity === 0)
                        return (
                            <StyledSpan bgColor={bgError}>
                                Out of Stock
                            </StyledSpan>
                        )
                    else if (quantity >= 30)
                        return (
                            <StyledSpan bgColor={bgGreen}>Available</StyledSpan>
                        )
                    else if (quantity < 30)
                        return (
                            <StyledSpan bgColor={bgSecondary}>
                                Limited Stock
                            </StyledSpan>
                        )
                },
            },
        },
        {
            name: 'price',
            label: 'Price',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <span>${productList[dataIndex].price.toFixed(2)}</span>
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
                        <Box flexGrow={1} />
                        <Link to="/pages/new-customer">
                            <IconButton>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Link>
                        <Link to="/pages/view-customer">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
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
                        { name: 'Product List' },
                    ]}
                />
            </div>
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'All Products'}
                        data={productList}
                        columns={columns}
                        options={{
                            filterType: 'textField',
                            responsive: 'standard',
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
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

const productList = [
    {
        imgUrl: '/assets/images/products/headphone-2.jpg',
        name: 'Earphone',
        price: 100,
        quantity: 15,
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting',
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Earphone',
        price: 1500,
        quantity: 30,
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting',
    },
    {
        imgUrl: '/assets/images/products/iphone-2.jpg',
        name: 'iPhone x',
        price: 1900,
        quantity: 35,
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting',
    },
    {
        imgUrl: '/assets/images/products/iphone-1.jpg',
        name: 'iPhone x',
        price: 100,
        quantity: 0,
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting',
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Head phone',
        price: 1190,
        quantity: 5,
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting',
    },
]

export default ProductList
