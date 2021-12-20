import {
    Button,
    Radio,
    FormControl,
    FormControlLabel,
    Divider,
    RadioGroup,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
} from '@mui/material'
import { useCallback } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInvoiceById, addInvoice, updateInvoice } from './InvoiceService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Paragraph } from 'app/components/Typography'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'


const StyledH5 = styled('h5')(() => ({
    fontSize: 15,
}))

const FlexEndBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
}))

const FormBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    '& .label': { height: 32 },
}))

const StyledTable = styled(Table)(({ theme }) => ({
    marginBottom: 2,
    '& thead': {
        '& tr': {
            background: theme.palette.background.default,
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
            '& th:first-child': {
                paddingLeft: '24px !important',
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '16px !important',
                },
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
            '& td:first-child': {
                textTransform: 'capitalize',
                paddingLeft: '24px !important',
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '16px !important',
                },
            },
        },
    },
}))

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
    const [isAlive, setIsAlive] = useState(true)
    const [state, setState] = useState(initialValues)
    const navigate = useNavigate()
    const { id } = useParams()

    const generateRandomId = useCallback(() => {
        let tempId = Math.random().toString()
        let id = tempId.substr(2, tempId.length - 1)
        setState((state) => ({ ...state, id }))
    }, [])

    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const handleSellerBuyerChange = (event, fieldName) => {
        event.persist()
        setState({
            ...state,
            [fieldName]: {
                ...state[fieldName],
                [event.target.name]: event.target.value,
            },
        })
    }

    const handleIvoiceListChange = (event, index) => {
        let tempItemList = [...state.item]
        tempItemList.map((element, i) => {
            if (index === i) element[event.target.name] = event.target.value
            return element
        })

        setState({
            ...state,
            item: tempItemList,
        })
    }

    const addItemToInvoiceList = () => {
        let tempItemList = [...state.item]
        tempItemList.push({
            name: '',
            unit: '',
            price: '',
        })
        setState({
            ...state,
            item: tempItemList,
        })
    }

    const deleteItemFromInvoiceList = (index) => {
        let tempItemList = [...state.item]
        tempItemList.splice(index, 1)

        setState({
            ...state,
            item: tempItemList,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const handleSubmit = () => {
        setState({ ...state, loading: true })
        let tempState = { ...state }
        delete tempState.loading
        if (isNewInvoice)
            addInvoice(tempState).then(() => {
                setState({ ...state, loading: false })
                navigate(`/invoice/${state.id}`)
                toggleInvoiceEditor()
            })
        else
            updateInvoice(tempState).then(() => {
                setState({ ...state, loading: false })
                toggleInvoiceEditor()
            })
    }

    useEffect(() => {
        if (!isNewInvoice) {
            getInvoiceById(id).then(({ data }) => {
                if (isAlive) setState({ ...data })
            })
        } else {
            generateRandomId()
        }
    }, [id, isNewInvoice, isAlive, generateRandomId])

    useEffect(() => {
        return () => setIsAlive(false)
    }, [])

    let subTotalCost = 0
    let {
        orderNo,
        buyer,
        seller,
        item: invoiceItemList = [],
        status,
        vat,
        date,
        currency,
        loading,
    } = state

    return (
        <Box py={2} className="invoice-viewer">
            <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
                <FlexEndBox px={2} className="viewer_actions">
                    <Box mb={3}>
                        <Button
                            type="button"
                            variant="text"
                            sx={{ mr: 2, py: 1 }}
                            onClick={() => toggleInvoiceEditor()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ py: 1 }}
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </Box>
                </FlexEndBox>

                <FormBox px={2} mb={2} className="viewer__order-info">
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Order Info</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>Order Number</Paragraph>
                        <TextValidator
                            label="Order No."
                            type="text"
                            fullWidth
                            name="orderNo"
                            value={orderNo}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <div>
                        <FormControl
                            component="fieldset"
                            sx={{ mb: 2, width: '100%' }}
                        >
                            <RadioGroup
                                aria-label="status"
                                name="status"
                                value={status}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    className="label"
                                    value="pending"
                                    control={<Radio color="secondary" />}
                                    label="Pending"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    className="label"
                                    value="processing"
                                    control={<Radio color="secondary" />}
                                    label="Processing"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    className="label"
                                    value="delivered"
                                    control={<Radio color="secondary" />}
                                    label="Delivered"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Box textAlign="right">
                            <StyledH5 sx={{ fontWeight: '500' }}>
                                <strong>Order date: </strong>
                            </StyledH5>
                        </Box>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={new Date()}
                                onChange={handleDateChange}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        variant="standard"
                                        id="mui-pickers-date"
                                        label="Order Date"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </FormBox>

                <Divider />

                <Grid
                    container
                    spacing={4}
                    justify="space-between"
                    sx={{ px: 2, py: '20px' }}
                >
                    <Grid item>
                        <div>
                            <StyledH5 sx={{ mb: '20px' }}>Bill From</StyledH5>
                            <TextValidator
                                sx={{ mb: '20px' }}
                                label="Seller Name"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'seller')
                                }
                                type="text"
                                name="name"
                                fullWidth
                                value={seller ? seller.name : null}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                label="Seller Name"
                                type="text"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'seller')
                                }
                                name="address"
                                fullWidth
                                multiline={true}
                                rowsMax={4}
                                value={seller ? seller.address : null}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                    </Grid>
                    <Grid item>
                        <Box textAlign="right">
                            <StyledH5 sx={{ mb: '20px' }}>Bill To</StyledH5>
                            <TextValidator
                                sx={{ mb: '20px' }}
                                label="Buyer Name"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'buyer')
                                }
                                type="text"
                                name="name"
                                fullWidth
                                value={buyer ? buyer.name : null}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                label="Buyer Address"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'buyer')
                                }
                                type="text"
                                name="address"
                                fullWidth
                                multiline={true}
                                rowsMax={4}
                                value={buyer ? buyer.address : null}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Item list for editing */}
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {invoiceItemList.map((item, index) => {
                            subTotalCost += item.price * item.unit
                            return (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell align="left">
                                        <TextValidator
                                            label="Item Name"
                                            onChange={(event) =>
                                                handleIvoiceListChange(
                                                    event,
                                                    index
                                                )
                                            }
                                            type="text"
                                            name="name"
                                            fullWidth
                                            value={item ? item.name : null}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </TableCell>

                                    <TableCell align="left">
                                        <TextValidator
                                            label="Item Price"
                                            onChange={(event) =>
                                                handleIvoiceListChange(
                                                    event,
                                                    index
                                                )
                                            }
                                            type="number"
                                            name="price"
                                            fullWidth
                                            value={item ? item.price : null}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </TableCell>

                                    <TableCell align="left">
                                        <TextValidator
                                            label="Item Unit"
                                            onChange={(event) =>
                                                handleIvoiceListChange(
                                                    event,
                                                    index
                                                )
                                            }
                                            type="number"
                                            name="unit"
                                            fullWidth
                                            value={item ? item.unit : null}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </TableCell>

                                    <TableCell align="left">
                                        {item.unit * item.price}
                                    </TableCell>

                                    <TableCell align="left">
                                        <Button
                                            onClick={() =>
                                                deleteItemFromInvoiceList(index)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </StyledTable>
                <FlexEndBox px={2} mb={2}>
                    <Button onClick={addItemToInvoiceList}>Add Item</Button>
                </FlexEndBox>

                {/* total cost calculation */}
                <FlexEndBox px={2}>
                    <Box display="flex">
                        <Box pr={6}>
                            <Paragraph sx={{ mb: 4 }}>Sub Total:</Paragraph>
                            <Paragraph sx={{ mb: 6 }}>Vat(%):</Paragraph>
                            <Paragraph sx={{ mb: '20px' }}>currency:</Paragraph>
                            <strong>
                                <p>Grand Total:</p>
                            </strong>
                        </Box>
                        <div>
                            <Paragraph sx={{ mb: 2 }}>{subTotalCost}</Paragraph>
                            <TextValidator
                                sx={{ mb: 2 }}
                                label="Vat"
                                type="number"
                                name="vat"
                                value={vat}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <br />
                            <TextValidator
                                label="Currency"
                                onChange={handleChange}
                                type="text"
                                name="currency"
                                value={currency}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <Paragraph sx={{ mt: 2 }}>
                                <strong>
                                    {currency}
                                    {subTotalCost + (subTotalCost * vat) / 100}
                                </strong>
                            </Paragraph>
                        </div>
                    </Box>
                </FlexEndBox>
            </ValidatorForm>
        </Box>
    )
}

const initialValues = {
    id: '',
    orderNo: '',
    buyer: {
        name: '',
        address: '',
    },
    seller: {
        name: '',
        address: '',
    },
    item: [],
    status: '',
    vat: '',
    date: new Date(),
    currency: '',
    loading: false,
}

export default InvoiceEditor
