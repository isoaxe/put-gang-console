import React, { useState } from 'react'
import { Dialog, Grid, Button } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Box, styled } from '@mui/system'

const DialogContent = styled('div')(({ theme }) => ({
    textAlign: 'center',
    position: 'relative',
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const IMG = styled('img')(({ theme }) => ({
    height: 160,
    marginBottom: 2
}))

const PaymentDialog = ({ open, toggleDialog }) => {
    const [state, setState] = useState({})

    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const handleSubmit = () => { }

    let { cardHolderName, cardNumber, expiryDate, cvc } = state

    return (
        <Dialog open={open} onClose={toggleDialog} scroll="body">
            <DialogContent>
                <IMG
                    src="/assets/images/debit-card.png"
                    alt="debit-card"
                />
                <ValidatorForm onSubmit={handleSubmit}>
                    <TextValidator
                        sx={{ mb: 2 }}
                        variant="outlined"
                        label="Card Number"
                        onChange={handleChange}
                        type="number"
                        name="cardNumber"
                        value={cardNumber || ''}
                        validators={[
                            'required',
                            'minStringLength:16',
                            'maxStringLength: 16',
                        ]}
                        errorMessages={[
                            'this field is required',
                            'invalid card',
                            'invalid card',
                        ]}
                        fullWidth
                    />

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                label="Expiry Date"
                                onChange={handleChange}
                                type="text"
                                placeholder="12/19"
                                name="expiryDate"
                                value={expiryDate || ''}
                                validators={[
                                    'required',
                                    'minStringLength: 5',
                                    'maxStringLength: 5',
                                ]}
                                errorMessages={[
                                    'this field is required',
                                    'invalid expiry date',
                                    'invalid expiry date',
                                ]}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                label="CVC"
                                onChange={handleChange}
                                type="text"
                                name="cvc"
                                value={cvc || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <TextValidator
                        sx={{ mb: 3 }}
                        variant="outlined"
                        label="Full Name"
                        onChange={handleChange}
                        type="text"
                        name="cardHolderName"
                        value={cardHolderName || ''}
                        errorMessages={['this field is required']}
                        fullWidth
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={toggleDialog}
                            sx={{ mr: '12px' }}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Pay
                        </Button>
                    </Box>
                </ValidatorForm>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentDialog
