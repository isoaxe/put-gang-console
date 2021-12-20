import {
    Icon,
    Hidden,
    Checkbox,
    IconButton,
    FormControlLabel,
} from '@mui/material'
import React from 'react'
import { Box } from '@mui/system'
import { styled } from '@mui/system'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    background: theme.palette.primary.main,
}))

const StyledIcon = styled(Icon)(() => ({
    color: '#fff',
}))

const InboxTopBar = (props) => {
    const { toggleSidenav, handleMasterCheckbox, masterCheckbox } = props

    return (
        <Container py="4px" mx="4px">
            <Hidden smUp>
                <IconButton onClick={toggleSidenav}>
                    <StyledIcon>short_text</StyledIcon>
                </IconButton>
            </Hidden>
            <FormControlLabel
                sx={{ color: '#fff', marginLeft: 2 }}
                control={
                    <Checkbox
                        checked={masterCheckbox}
                        onChange={handleMasterCheckbox}
                        color="secondary"
                    />
                }
                label="All"
            />
            <IconButton size="large">
                <StyledIcon>delete</StyledIcon>
            </IconButton>
            <IconButton size="large">
                <StyledIcon>folder_special</StyledIcon>
            </IconButton>
            <IconButton size="large">
                <StyledIcon>archive</StyledIcon>
            </IconButton>
            <IconButton size="large">
                <StyledIcon>error</StyledIcon>
            </IconButton>
        </Container>
    )
}

export default InboxTopBar
