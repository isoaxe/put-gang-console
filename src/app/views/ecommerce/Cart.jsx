import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import { H5, Paragraph } from 'app/components/Typography'
import {
    deleteProductFromCart,
    updateCartAmount,
} from 'app/redux/actions/EcommerceActions'
import {
    Grid,
    Divider,
    Card,
    TextField,
    IconButton,
    Icon,
    Button,
} from '@mui/material'

const CartRoot = styled(Card)(({ theme }) => ({
    minWidth: 900,
    overflowX: 'scroll',
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const StyledGrid = styled(Grid)(({ theme }) => ({
    textAlign: 'center',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    borderRadius: '4px',
}))

const Cart = () => {
    const { cartList = [] } = useSelector((state) => state.ecommerce)
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getTotalCost = () => {
        let totalCost = 0
        cartList.forEach((product) => {
            totalCost += product.amount * product.price
        })
        return totalCost
    }
    const handleChange = (event, productId) => {
        let amount = event.target.value
        dispatch(updateCartAmount(user.userId, productId, Math.abs(amount)))
    }
    const handleDeleteFromCart = (productId) => {
        dispatch(deleteProductFromCart(user.userId, productId))
    }

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <CartRoot elevation={3}>
            <Box p={2}>
                <Grid container>
                    <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <H5>Name</H5>
                    </Grid>
                    <StyledGrid item lg={true} md={true} sm={true} xs={true}>
                        <H5>Price</H5>
                    </StyledGrid>
                    <StyledGrid item lg={true} md={true} sm={true} xs={true}>
                        <H5>Quantity</H5>
                    </StyledGrid>
                    <StyledGrid item lg={true} md={true} sm={true} xs={true}>
                        <H5>Total</H5>
                    </StyledGrid>
                </Grid>
            </Box>
            <Divider></Divider>

            {cartList.map((product) => (
                <Box p={2} key={product.id}>
                    <Grid container alignItems="center">
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        handleDeleteFromCart(product.id)
                                    }
                                >
                                    <Icon fontSize="small">clear</Icon>
                                </IconButton>
                                <Box px={2}>
                                    <IMG
                                        src={product.imgUrl}
                                        alt={product.title}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <H5>{product.title}</H5>
                            <Paragraph
                                sx={{
                                    m: 0,
                                    mt: 1,
                                    color: textMuted,
                                }}
                            >
                                {product.description}
                            </Paragraph>
                        </Grid>
                        <StyledGrid
                            item
                            lg={true}
                            md={true}
                            sm={true}
                            xs={true}
                        >
                            <H5>${product.price}</H5>
                        </StyledGrid>
                        <StyledGrid
                            item
                            lg={true}
                            md={true}
                            sm={true}
                            xs={true}
                        >
                            <TextField
                                variant="outlined"
                                name="amount"
                                type="number"
                                size="small"
                                value={product.amount}
                                onChange={(e) => handleChange(e, product.id)}
                                inputProps={{
                                    style: {
                                        // padding: "10px",
                                        width: '60px',
                                    },
                                }}
                            ></TextField>
                        </StyledGrid>
                        <StyledGrid
                            item
                            lg={true}
                            md={true}
                            sm={true}
                            xs={true}
                        >
                            <H5>${product.price * product.amount}</H5>
                        </StyledGrid>
                    </Grid>
                </Box>
            ))}

            <div>
                <Divider sx={{ mb: 6 }}></Divider>
                <Grid container sx={{ mb: 6, px: 2 }}>
                    <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
                    <Grid item lg={true} md={true} sm={true} xs={true}></Grid>
                    <StyledGrid item lg={true} md={true} sm={true} xs={true}>
                        <H5>Total</H5>
                    </StyledGrid>
                    <StyledGrid item lg={true} md={true} sm={true} xs={true}>
                        <H5>${getTotalCost().toFixed(2)}</H5>
                    </StyledGrid>
                </Grid>
                <Box mb={2} px={2} display="flex" alignItems="center">
                    <TextField
                        variant="outlined"
                        placeholder="Discount Coupon"
                        sx={{ flexGrow: 1 }}
                        size="small"
                    ></TextField>
                    <Button
                        sx={{ mx: '12px' }}
                        variant="contained"
                        color="secondary"
                    >
                        Apply
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/ecommerce/checkout')}
                    >
                        Checkout
                    </Button>
                </Box>
            </div>
        </CartRoot>
    )
}

export default Cart
