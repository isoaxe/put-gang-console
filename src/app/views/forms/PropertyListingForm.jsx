import React, { useState } from 'react'
import {
    Card,
    TextField,
    Divider,
    MenuItem,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    Checkbox,
    Button,
} from '@mui/material'
import { countries } from '../ecommerce/Country'
import { Box, styled } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    padding: '24px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const InputField = styled(TextField)(() => ({
    marginBottom: '16px',
}))

const PropertyListingForm = () => {
    const [date, setDate] = useState(new Date())

    return (
        <StyledCard>
            <Box mx="auto" maxWidth={600}>
                <h4>Property Listing Inquiry</h4>
                <p>
                    Please fill the form below to know more about the property
                </p>
                <Divider sx={{ mb: 4 }} />

                <InputField
                    label="Your Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <InputField
                    label="Address 1"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <InputField
                    label="Address 2"
                    variant="outlined"
                    size="small"
                    fullWidth
                />

                <Box mb={2} display="flex">
                    <TextField
                        sx={{ mr: 1 }}
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        sx={{ ml: 1 }}
                        label="State/Province"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </Box>

                <Box mb={2} display="flex">
                    <TextField
                        sx={{ mr: 1 }}
                        label="Zip"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        sx={{ ml: 1 }}
                        label="Country"
                        variant="outlined"
                        size="small"
                        fullWidth
                        defaultValue=""
                        select
                    >
                        {countries.map((country) => (
                            <MenuItem key={country.name} value={country.name}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <InputField
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <InputField
                    label="Email"
                    placeholder="ui-lib@example.com"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <InputField
                    label="Include any listing numbers or properties of interest here"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={6}
                />

                <Paragraph sx={{ mb: '4px' }}>
                    Have you visited the State previously
                </Paragraph>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <RadioGroup name="status">
                        <FormControlLabel
                            sx={{ height: 32 }}
                            value="yes"
                            control={<Radio color="secondary" />}
                            label="Yes"
                        />
                        <FormControlLabel
                            sx={{ height: 32 }}
                            value="no"
                            control={<Radio color="secondary" />}
                            label="No"
                        />
                    </RadioGroup>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={new Date()}
                        onChange={(date) => setDate(date)}
                        renderInput={(props) => (
                            <InputField
                                {...props}
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="mui-pickers-date"
                                label="When are you planing on visiting?"
                            />
                        )}
                    />
                </LocalizationProvider>

                <InputField
                    label="How long are you planing to stay?"
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue=""
                    select
                >
                    {stayDurationList.map((duration) => (
                        <MenuItem key={duration} value={duration}>
                            {duration}
                        </MenuItem>
                    ))}
                </InputField>

                <Paragraph sx={{ mb: '4px' }}>
                    Can we help you make travel arrangements?
                </Paragraph>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <RadioGroup name="status">
                        <FormControlLabel
                            sx={{ height: 32 }}
                            value="yes"
                            control={<Radio color="secondary" />}
                            label="Yes"
                        />
                        <FormControlLabel
                            sx={{ height: 32 }}
                            value="no"
                            control={<Radio color="secondary" />}
                            label="No"
                        />
                    </RadioGroup>
                </FormControl>

                <Paragraph sx={{ mb: '4px' }}>
                    What kind of property are you interested in?
                </Paragraph>
                <Box sx={{ mb: 2 }}>
                    {propertyTypeList.map((item, ind) => (
                        <FormControlLabel
                            key={ind}
                            label={item}
                            control={<Checkbox />}
                            sx={{ height: 32, display: 'block' }}
                        />
                    ))}
                </Box>

                <InputField
                    label="What kind of location are you interested in?"
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue=""
                    select
                >
                    {locationTypeList.map((location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ))}
                </InputField>

                <InputField
                    label="What is your budget?"
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue=""
                    select
                >
                    {budgetList.map((budget) => (
                        <MenuItem key={budget} value={budget}>
                            {budget}
                        </MenuItem>
                    ))}
                </InputField>

                <InputField
                    label="Questions/Comments"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={6}
                />

                <Box display="flex" justifyContent="center">
                    <Button
                        sx={{ px: '28px' }}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </StyledCard>
    )
}

const stayDurationList = [
    'Less than a week',
    'One week',
    'One month',
    "I'm not sure",
]

const propertyTypeList = [
    'Row Land',
    'Lot in a Development',
    'Condos',
    'Single Family Home',
    'Other',
]

const locationTypeList = [
    'Ocean View',
    'Beach Front',
    'Near Surf',
    'In Town',
    'Farm',
    'Other',
    "Doesn't Matter",
]

const budgetList = [
    '$0 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $500,000',
    '$500,000 - $1,000,000',
    '$1,000,000 Plus',
]
export default PropertyListingForm
