import React from 'react'
import { Card, Button, Icon, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
    addProductToCart,
    updateCartAmount,
} from 'app/redux/actions/EcommerceActions'
import { Box, styled, useTheme } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import Rating from '@mui/lab/Rating'
import { AddToCartButton } from 'app/components'
import { H5, Paragraph, Span } from 'app/components/Typography'

const ProductCard = styled(Card)(() => ({
    padding: 16,
    position: 'relative',
    height: '100% !important',
    '&:hover': {
        '& .image-box-overlay': {
            opacity: 1,
        },
    },
}))

const IMG = styled('img')(() => ({
    width: '100%'
}))

const PriceBox = styled('div')(() => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const ImageBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.74)',
    zIndex: 2,
    opacity: 0,
    transition: 'all 250ms ease-in-out',
}))

const ListProductCard = ({ product }) => {
    const { user } = useAuth()
    const theme = useTheme()
    const { cartList } = useSelector((state) => state.ecommerce)
    const dispatch = useDispatch()

    const amount = cartList?.find((p) => p.id === product.id)?.amount || 0
    const handleUpdateCart = (productAmount) => {
        dispatch(updateCartAmount(user.id, product.id, productAmount))
    }
    const handleAddProduct = () => {
        dispatch(addProductToCart(user.id, product.id))
    }

    return (
        <ProductCard elevation={3}>
            <Grid container spacing={2} alignItems="center">
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <PriceBox>
                        <IMG
                            src={product.imgUrl}
                            alt={product.title}
                        />
                        <ImageBox>
                            <Button
                                variant="outlined"
                                sx={{ background: theme.palette.background.default }}
                                onClick={() =>
                                    handleAddProduct(user.id, product.id)
                                }
                            >
                                <Icon sx={{ mr: 2 }}>shopping_cart</Icon>
                                <span>Add to cart</span>
                            </Button>
                        </ImageBox>
                    </PriceBox>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} sx={{ p: '12px' }}>
                    <H5 sx={{ m: 0, mb: '12px' }}>{product.title}</H5>
                    <Box
                        mb={2}
                        display='flex'
                        justifyContent='space-between'
                    >
                        <Span sx={{ color: theme.palette.text.secondary }}>
                            ${product.price.toFixed(2)}
                        </Span>
                        <Rating
                            size="small"
                            readOnly={true}
                            name="half-rating"
                            value={product.rating}
                            precision={0.5}
                        />
                    </Box>
                    <AddToCartButton
                        propStyle={{ mb: 2 }}
                        amount={amount}
                        totalUnit={product.totalUnit}
                        handleAddProduct={handleAddProduct}
                        handleUpdateCart={handleUpdateCart}
                    />
                    <Paragraph
                        sx={{
                            margin: 0,
                            color: theme.palette.text.secondary
                        }}
                    >
                        {product.description.substring(0, 200)}
                    </Paragraph>
                </Grid>
            </Grid>
        </ProductCard>
    )
}

export default ListProductCard
