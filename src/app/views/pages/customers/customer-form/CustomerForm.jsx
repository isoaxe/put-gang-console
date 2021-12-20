import {
    Grid,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    Divider,
    TextField,
    MenuItem,
    Tabs,
    Tab,
    Button,
} from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import OtherDetailsForm from './OtherDetailsForm'
import AddressForm from './AddressForm'
import ContactPersonForm from './ContactPersonForm'
import { Breadcrumb } from 'app/components'
import { Box, styled } from '@mui/system'
import { H4, H5 } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'space-between',
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

const Form = styled('form')(() => ({
    padding: '16px',
}))

const StyledTextField = styled(TextField)(() => ({
    margin: '8px',
}))

const CustomerForm = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const handleSubmit = async (values, { isSubmitting }) => {
        console.log(values)
    }
    const handleTabChange = (e, value) => {
        setTabIndex(value)
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pages', path: '/pages' },
                        { name: 'New Customer' },
                    ]}
                />
            </div>

            <Card elevation={3}>
                <Box p={2} display="flex">
                    <H4>Add a New Customer</H4>
                </Box>
                <Divider sx={{ mb: 1 }} />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setSubmitting,
                        setFieldValue,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item md={2} sm={4} xs={12}>
                                    Customer Type
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            name="customerType"
                                            value={values.customerType}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                label="Business"
                                                value="business"
                                                control={
                                                    <Radio
                                                        size="small"
                                                        color="secondary"
                                                    />
                                                }
                                                sx={{ mr: 3, height: 20 }}
                                            />
                                            <FormControlLabel
                                                label="Individual"
                                                value="individual"
                                                control={
                                                    <Radio
                                                        size="small"
                                                        color="secondary"
                                                    />
                                                }
                                                sx={{ height: 20 }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Primary Contact
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <Box m={-1} display="flex" flexWrap="wrap">
                                        <StyledTextField
                                            select
                                            label="Salutation"
                                            name="salutation"
                                            size="small"
                                            variant="outlined"
                                            sx={{ minWidth: 188 }}
                                            value={values.salutation || ''}
                                            onChange={handleChange}
                                        >
                                            {salutationList.map((item, ind) => (
                                                <MenuItem
                                                    value={item}
                                                    key={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <StyledTextField
                                            label="First Name"
                                            name="firstName"
                                            size="small"
                                            variant="outlined"
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />
                                        <StyledTextField
                                            label="Last Name"
                                            name="lastName"
                                            size="small"
                                            variant="outlined"
                                            value={values.lastName}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Primary Contact
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Company Name"
                                        name="companyName"
                                        size="small"
                                        variant="outlined"
                                        value={values.companyName}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Customer Display Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Display Name"
                                        name="displayName"
                                        size="small"
                                        variant="outlined"
                                        value={values.displayName}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Customer Email
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Customer Email"
                                        name="email"
                                        size="small"
                                        type="email"
                                        variant="outlined"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Customer Phone
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <Box m={-1} display="flex" flexWrap="wrap">
                                        <StyledTextField
                                            label="Work Phone"
                                            name="workPhone"
                                            size="small"
                                            variant="outlined"
                                            value={values.workPhone}
                                            onChange={handleChange}
                                        />
                                        <StyledTextField
                                            label="Mobile"
                                            name="mobile"
                                            size="small"
                                            variant="outlined"
                                            value={values.mobile}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Website
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Website"
                                        name="website"
                                        size="small"
                                        type="email"
                                        variant="outlined"
                                        value={values.website}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                sx={{ mt: 2, mb: 3 }}
                            >
                                {tabList.map((item, ind) => (
                                    <Tab
                                        key={ind}
                                        value={ind}
                                        label={item}
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                ))}
                            </Tabs>
                            {tabIndex === 0 && (
                                <OtherDetailsForm
                                    values={values}
                                    handleChange={handleChange}
                                />
                            )}
                            {tabIndex === 1 && (
                                <AddressForm
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                />
                            )}
                            {tabIndex === 2 && (
                                <ContactPersonForm
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                />
                            )}

                            <Box mt={3}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    )
}

const salutationList = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.']
const tabList = ['Other Details', 'Address', 'Contact Persons']

const initialValues = {
    customerType: '',
}

export default CustomerForm
