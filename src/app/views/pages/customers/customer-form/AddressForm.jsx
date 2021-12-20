import {
    TextField,
    Grid,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import React from 'react'
import { countries } from 'app/views/ecommerce/Country'
import { Box, styled } from '@mui/system'
import { Paragraph } from 'app/components/Typography'

const ContentBox = styled(Box)(({ theme }) => ({
    marginBottom: 3,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
        fontWeight: '500',
        color: theme.palette.text.secondary,
    },
}))

const AddressForm = ({ values, setFieldValue, handleChange }) => {
    const handleCheckboxChange = async ({ target: { checked } }) => {
        if (checked) setFieldValue('shipping', values.billing)
        else setFieldValue('shipping', {})
    }

    return (
        <Grid container spacing={5}>
            <Grid item md={6} sm={12} xs={12}>
                <ContentBox>
                    <Paragraph sx={{ py: 1 }}>BILLING ADDRESS</Paragraph>
                </ContentBox>
                <Grid container spacing={3} alignItems="center">
                    <Grid item md={2} sm={4} xs={12}>
                        Attention
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Attention"
                            name="billing.attention"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.billing?.attention || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Country
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Country"
                            name="billing.country"
                            size="small"
                            variant="outlined"
                            select
                            fullWidth
                            value={values.billing?.country || ''}
                            onChange={handleChange}
                        >
                            {countries.map((item, ind) => (
                                <MenuItem value={item.code} key={item.code}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Address
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Address"
                            name="billing.address"
                            size="small"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={values.billing?.address || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        City
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="City"
                            name="billing.city"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.billing?.city || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        State
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="State"
                            name="billing.state"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.billing?.state || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Zip
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Zip"
                            name="billing.zip"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.billing?.zip || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Phone
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Phone"
                            name="billing.phone"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.billing?.phone || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Fax
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Fax"
                            name="billing.fax"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.billing?.fax || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ContentBox>
                    <Paragraph>SHIPPING ADDRESS</Paragraph>
                    <FormControlLabel
                        label="Same as billing address"
                        value="business"
                        control={<Checkbox size="small" color="secondary" />}
                        onChange={handleCheckboxChange}
                    />
                </ContentBox>
                <Grid container spacing={3} alignItems="center">
                    <Grid item md={2} sm={4} xs={12}>
                        Attention
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Attention"
                            name="shipping.attention"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.shipping?.attention || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Country
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Country"
                            name="shipping.country"
                            size="small"
                            variant="outlined"
                            select
                            fullWidth
                            value={values.shipping?.country || ''}
                            onChange={handleChange}
                        >
                            {countries.map((item, ind) => (
                                <MenuItem value={item.code} key={item.code}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Address
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Address"
                            name="shipping.address"
                            size="small"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={values.shipping?.address || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        City
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="City"
                            name="shipping.city"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.shipping?.city || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        State
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="State"
                            name="shipping.state"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.shipping?.state || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Zip
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Zip"
                            name="shipping.zip"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.shipping?.zip || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Phone
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Phone"
                            name="shipping.phone"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.shipping?.phone || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={12}>
                        Fax
                    </Grid>
                    <Grid item md={10} sm={8} xs={12}>
                        <TextField
                            label="Fax"
                            name="shipping.fax"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={values.shipping?.fax || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddressForm
