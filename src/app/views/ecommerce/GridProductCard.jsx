import React from 'react'
import { Card } from '@mui/material'
import useAuth from 'app/hooks/useAuth'
import { Box, styled } from '@mui/system'
import { H5 } from 'app/components/Typography'
import { AddToCartButton } from 'app/components'
import { useSelector, useDispatch } from 'react-redux'
import {
    addProductToCart,
    updateCartAmount,
} from 'app/redux/actions/EcommerceActions'

const ProductCard = styled(Card)(() => ({
    textAlign: 'center',
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

const Price = styled('div')(({ theme }) => ({
    margin: 0,
    color: 'white',
    padding: '8px 24px 8px 24px',
    fontWeight: '500',
    position: 'absolute',
    right: 0,
    top: 24,
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    zIndex: 4,
    background: theme.palette.primary.main
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

const GridProductCard = ({ product }) => {
    const { user } = useAuth()
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
            <PriceBox>
                <Price>
                    ${product.price}
                </Price>
                <IMG
                    src={product.imgUrl}
                    alt={product.title}
                />
                <ImageBox />
            </PriceBox>
            <Box sx={{ p: 3 }}>
                <H5 sx={{ m: 0 }}>{product.title}</H5>
            </Box>
            <AddToCartButton
                propStyle={{
                    mb: 2, px: 2,
                    mx: 'auto',
                }}
                amount={amount}
                totalUnit={product.totalUnit}
                handleAddProduct={handleAddProduct}
                handleUpdateCart={handleUpdateCart}
            />
        </ProductCard>
    )
}

export default GridProductCard
