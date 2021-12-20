import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    MenuItem,
    IconButton,
    Icon,
} from '@mui/material'
import { FieldArray } from 'formik'
import React, { Fragment } from 'react'
import { Box, styled } from '@mui/system'

const StyledCell = styled(TableCell)(() => ({
    padding: 0,
}))

const ContactPersonForm = ({ values, handleChange }) => {
    return (
        <FieldArray name="contacts">
            {(arrayHelpers) => (
                <Fragment>
                    <Table sx={{ whiteSpace: 'pre', minWidth: 750 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4}>Salutation</TableCell>
                                <TableCell colSpan={4}>First Name</TableCell>
                                <TableCell colSpan={4}>Last Name</TableCell>
                                <TableCell colSpan={4}>Email Address</TableCell>
                                <TableCell colSpan={4}>Work Phone</TableCell>
                                <TableCell colSpan={4}>Mobile</TableCell>
                                <TableCell colSpan={4}>Designation</TableCell>
                                <TableCell colSpan={4}>Department</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.contacts?.map((item, ind) => (
                                <TableRow
                                    key={ind}
                                    sx={{ position: 'relative' }}
                                >
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Salutation"
                                            name={`contacts[${ind}].salutation`}
                                            size="small"
                                            variant="outlined"
                                            select
                                            defaultValue={item.salutation || ''}
                                            onBlur={handleChange}
                                            fullWidth
                                        >
                                            {salutationList.map((item, ind) => (
                                                <MenuItem
                                                    defaultValue={item}
                                                    key={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="First Name"
                                            name={`contacts[${ind}].firstName`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={item.firstName || ''}
                                            onBlur={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Last Name"
                                            name={`contacts[${ind}].lastName`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={item.lastName || ''}
                                            onBlur={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Email"
                                            name={`contacts[${ind}].email`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={item.email || ''}
                                            onBlur={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Work Phone"
                                            name={`contacts[${ind}].phone`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={item.phone || ''}
                                            onBlur={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Mobile"
                                            name={`contacts[${ind}].mobile`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={item.mobile || ''}
                                            onBlur={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Designation"
                                            name={`contacts[${ind}].designation`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={
                                                item.designation || ''
                                            }
                                            onBlur={handleChange}
                                        />
                                    </StyledCell>
                                    <StyledCell colSpan={4} align="left">
                                        <TextField
                                            label="Department"
                                            name={`contacts[${ind}].department`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            defaultValue={item.department || ''}
                                            onBlur={handleChange}
                                        />
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
                        sx={{ mt: 2 }}
                        color="primary"
                        variant="contained"
                        onClick={() => arrayHelpers.push({})}
                    >
                        + Add New Contact
                    </Button>
                </Fragment>
            )}
        </FieldArray>
    )
}

const salutationList = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.']

export default ContactPersonForm
