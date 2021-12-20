import { countries } from './Country'
import { useSelector } from 'react-redux'
import PaymentDialog from './PaymentDialog'
import React, { Fragment, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Card,
    Grid,
    FormControlLabel,
    Checkbox,
    Button,
    MenuItem,
    Divider,
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H4, H5, Span } from 'app/components/Typography'

const CartRoot = styled(Card)(({ theme }) => ({
    margin: '30px',
    padding: '24px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
        padding: '16px ',
    },
}))

const Checkout = () => {
    const [state, setState] = useState({})
    const [open, setOpen] = useState(false)
    const { cartList = [] } = useSelector((state) => state.ecommerce)

    const getTotalCost = () => {
        let totalCost = 0
        cartList.forEach((product) => {
            totalCost += product.amount * product.price
        })
        return totalCost
    }
    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleSubmit = () => {
        console.log(state)
        toggleDialog()
    }
    const toggleDialog = () => {
        setOpen(!open)
    }

    let {
        firstName,
        lastName,
        company,
        email,
        mobile,
        country,
        city,
        address,
    } = state

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <CartRoot className="checkout">
            <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
                <H4 sx={{ mt: 0, mb: 3, fontWeight: '500' }}>
                    Billing Details
                </H4>
                <Grid container spacing={3}>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                        <Grid container spacing={3} sx={{ mb: '20px' }}>
                            <Grid item xs={6}>
                                <TextValidator
                                    variant="outlined"
                                    label="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    value={firstName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    variant="outlined"
                                    label="Last Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="lastName"
                                    value={lastName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <TextValidator
                            sx={{ mb: '20px' }}
                            variant="outlined"
                            label="Company"
                            onChange={handleChange}
                            type="text"
                            name="company"
                            value={company || ''}
                            fullWidth
                        />

                        <Grid container spacing={3} sx={{ mb: '20px' }}>
                            <Grid item xs={6}>
                                <TextValidator
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    variant="outlined"
                                    label="Mobile"
                                    onChange={handleChange}
                                    type="number"
                                    name="mobile"
                                    value={mobile || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ mb: '20px' }}>
                            <Grid item xs={6}>
                                <TextValidator
                                    label="Country"
                                    select
                                    name="country"
                                    variant="outlined"
                                    value={country || ''}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {countries.map((country) => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.name}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    variant="outlined"
                                    label="City"
                                    onChange={handleChange}
                                    type="text"
                                    name="city"
                                    value={city || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <TextValidator
                            variant="outlined"
                            sx={{ mb: '20px' }}
                            label="Address"
                            onChange={handleChange}
                            type="text"
                            name="address"
                            value={address || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            label="Create an account?"
                        />
                    </Grid>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <Box
                            mb={2}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <H5 sx={{ m: 0 }}>Porduct</H5>
                            <H5 sx={{ m: 0 }}>Total Price</H5>
                        </Box>
                        <div>
                            {cartList.map((product, ind) => (
                                <Fragment key={product.id}>
                                    <Box
                                        py={2}
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <Span sx={{ pr: 4, color: textMuted }}>
                                            {product.title}
                                        </Span>
                                        <Span sx={{ color: textMuted }}>
                                            ${product.price * product.amount}
                                        </Span>
                                    </Box>
                                    {ind !== cartList.length - 1 && (
                                        <Divider></Divider>
                                    )}
                                </Fragment>
                            ))}
                            <Box
                                mt={2}
                                mb={4}
                                display="flex"
                                justifyContent="space-between"
                            >
                                <H5 sx={{ m: 0 }}>Total</H5>
                                <H5 sx={{ m: 0 }}>
                                    ${getTotalCost().toFixed(2)}
                                </H5>
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                sx={{ width: '100%' }}
                            >
                                Place Order
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </ValidatorForm>
            <PaymentDialog open={open} toggleDialog={toggleDialog} />
        </CartRoot>
    )
}

export default Checkout
