import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { RichTextEditor } from 'app/components'
import { Paragraph } from 'app/components/Typography'
import { Dialog, Button, IconButton, Icon, Fab } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const FormController = styled('div')(() => ({
    flexWrap: 1,
    display: 'flex',
    marginBottom: '16px',
    justifyContent: 'space-between',
}))

const InboxComposeDialog = ({ open, handleClose }) => {
    const [state, setState] = useState({
        to: '',
        subject: '',
        content: '',
        attachment: null,
    })
    const handleSubmit = (event) => {
        // console.log(state);
    }
    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleContentChange = (contentHtml) => {
        setState({
            ...state,
            content: contentHtml,
        })
    }
    const handleAttachmentSelection = (event) => {
        setState({
            ...state,
            attachment: event.target.files[0],
        })
    }
    let { to, subject, content, attachment } = state

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth={true}
        >
            <Box p={3}>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={(errors) => null}
                >
                    <TextValidator
                        label="To"
                        type="email"
                        name="to"
                        value={to}
                        onChange={handleChange}
                        sx={{ mb: 2, width: '100%' }}
                        validators={['required', 'isEmail']}
                        errorMessages={[
                            'this field is required',
                            'email is not valid',
                        ]}
                    />
                    <TextValidator
                        label="Subject"
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={handleChange}
                        validators={['required']}
                        sx={{ mb: 2, width: '100%' }}
                        errorMessages={['this field is required']}
                    />
                    <RichTextEditor
                        content={content}
                        handleContentChange={handleContentChange}
                        placeholder="insert text here..."
                    />
                    <FormController>
                        <Button onClick={handleClose}>Cancel</Button>

                        <FlexBox>
                            {attachment && (
                                <Paragraph sx={{ mr: 3 }}>
                                    {attachment.name}
                                </Paragraph>
                            )}
                            <label htmlFor="attachment">
                                <IconButton sx={{ mr: 1 }} component="span">
                                    <Icon>attachment</Icon>
                                </IconButton>
                            </label>
                            <input
                                onChange={handleAttachmentSelection}
                                className="hidden"
                                id="attachment"
                                type="file"
                            />
                            <Fab size="medium" color="secondary" type="submit">
                                <Icon>send</Icon>
                            </Fab>
                        </FlexBox>
                    </FormController>
                </ValidatorForm>
            </Box>
        </Dialog>
    )
}

export default InboxComposeDialog
