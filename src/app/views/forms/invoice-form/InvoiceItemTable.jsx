import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    IconButton,
    Icon,
    Select,
    MenuItem,
} from '@mui/material'
import { FieldArray } from 'formik'
import { Autocomplete } from '@mui/lab'
import { getProductList, calculateAmount } from './InvoiceFormService'
import { Box, styled } from '@mui/system'

const FlexBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const IMG = styled('img')(() => ({ width: 48 }))

const StyledCell = styled(TableCell)(() => ({
    padding: 0,
}))

const InvoiceItemTable = ({ values, handleChange, setFieldValue }) => {
    const [isAlive, setIsAlive] = useState(true)
    const [productList, setProductList] = useState([])

    useEffect(() => {
        getProductList().then(({ data }) => {
            if (isAlive) setProductList(data)
        })

        return () => setIsAlive(false)
    }, [isAlive])

    return (
        <FieldArray name="items">
            {(arrayHelpers) => (
                <Box overflow="auto">
                    <Table sx={{ whiteSpace: 'pre', minWidth: 750 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={7}>Item Details</TableCell>
                                <TableCell colSpan={2}>Quantity </TableCell>
                                <TableCell colSpan={2}>Rate</TableCell>
                                <TableCell colSpan={2}>Discount</TableCell>
                                <TableCell colSpan={2} align="center">
                                    Amount
                                </TableCell>
                                <StyledCell colSpan={1} align="center" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.items?.map((item, ind) => (
                                <TableRow
                                    key={ind}
                                    sx={{ position: 'relative' }}
                                >
                                    <StyledCell colSpan={7} align="left">
                                        <FlexBox>
                                            <IMG alt="" src={item?.imgUrl} />
                                            <Autocomplete
                                                size="small"
                                                sx={{ width: '100%' }}
                                                options={productList}
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )}
                                                onChange={(event, newValue) => {
                                                    handleChange({
                                                        target: {
                                                            name: `items[${ind}]`,
                                                            value: newValue,
                                                        },
                                                    })
                                                }}
                                            />
                                        </FlexBox>
                                    </StyledCell>

                                    <StyledCell colSpan={2} align="left">
                                        <TextField
                                            name={`items[${ind}].quantity`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            defaultValue={item.quantity || ''}
                                            onChange={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={2} align="left">
                                        <TextField
                                            name={`items[${ind}].price`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.price || ''}
                                            onChange={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={2} align="left">
                                        <TextField
                                            name={`items[${ind}].discount`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.discount || ''}
                                            onChange={handleChange}
                                            InputProps={{
                                                style: {
                                                    paddingRight: 0,
                                                },
                                                endAdornment: (
                                                    <Select
                                                        name={`items[${ind}].discountType`}
                                                        margin="none"
                                                        variant="standard"
                                                        disableUnderline
                                                        value={
                                                            item.discountType ||
                                                            '%'
                                                        }
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="$">
                                                            $
                                                        </MenuItem>
                                                        <MenuItem value="%">
                                                            %
                                                        </MenuItem>
                                                    </Select>
                                                ),
                                            }}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={2} align="center">
                                        {calculateAmount(item).toFixed(2)}
                                    </StyledCell>
                                    <StyledCell colSpan={1} align="center">
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                arrayHelpers.remove(ind)
                                            }
                                        >
                                            <Icon
                                                color="error"
                                                fontSize="small"
                                            >
                                                clear
                                            </Icon>
                                        </IconButton>
                                    </StyledCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        sx={{ mt: '16px !important' }}
                        color="primary"
                        variant="contained"
                        onClick={() => arrayHelpers.push({})}
                    >
                        + Add New Item
                    </Button>
                </Box>
            )}
        </FieldArray>
    )
}

export default InvoiceItemTable
