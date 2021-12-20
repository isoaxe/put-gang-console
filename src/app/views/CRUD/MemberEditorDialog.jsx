import { generateRandomId } from 'utils'
import React, { useState, useEffect } from 'react'
import { getUserById, updateUser, addNewUser } from './TableService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Dialog,
    Button,
    Grid,
    FormControlLabel,
    Switch,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({ uid, open, handleClose }) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        balance: '',
        age: '',
        company: '',
        address: '',
        isActive: false,
    })

    const handleChange = (event, source) => {
        event.persist()
        if (source === 'switch') {
            setState({
                ...state,
                isActive: event.target.checked,
            })
            return
        }

        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleFormSubmit = () => {
        let { id } = state
        if (id) {
            updateUser({
                ...state,
            }).then(() => {
                handleClose()
            })
        } else {
            addNewUser({
                id: generateRandomId(),
                ...state,
            }).then(() => {
                handleClose()
            })
        }
    }

    useEffect(() => {
        getUserById(uid).then((data) => setState({ ...data.data }))
    }, [uid])

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Update Member</H4>
                <ValidatorForm onSubmit={handleFormSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                value={state?.name}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Email"
                                type="text"
                                name="email"
                                value={state?.email}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                label="Phone"
                                type="text"
                                name="phone"
                                value={state?.phone}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                label="Balance"
                                onChange={handleChange}
                                type="number"
                                name="balance"
                                value={state?.balance}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Age"
                                onChange={handleChange}
                                type="number"
                                name="age"
                                value={state?.age}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Company"
                                onChange={handleChange}
                                type="text"
                                name="company"
                                value={state?.company}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Address"
                                onChange={handleChange}
                                type="text"
                                name="address"
                                value={state?.address}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />

                            <FormControlLabel
                                sx={{ my: '20px' }}
                                control={
                                    <Switch
                                        checked={state?.isActive}
                                        onChange={(event) =>
                                            handleChange(event, 'switch')
                                        }
                                    />
                                }
                                label="Active Customer"
                            />
                        </Grid>
                    </Grid>

                    <FormHandlerBox>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                    </FormHandlerBox>
                </ValidatorForm>
            </Box>
        </Dialog>
    )
}

export default MemberEditorDialog
