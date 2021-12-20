import React from 'react'
import { Button, Card, Divider, Icon } from '@mui/material'
import { GetApp } from '@mui/icons-material'
import { Box, styled, useTheme } from '@mui/system'
import { H5, Small } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const ContentBox = styled(FlexBox)(() => ({
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '16px',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '13px',
    marginBottom: '16px',
    color: theme.palette.text.primary,
    '& span, svg': {
        fontSize: '1.25rem',
        marginRight: '16px',
    },
}))

const CustomerActions = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const textMuted = palette.text.secondary

    return (
        <Card elevation={3}>
            <H5 sx={{ p: 2 }}>Other Actions</H5>
            <Divider sx={{ mb: 2 }} />

            <ContentBox px={2}>
                <StyledButton>
                    <Icon fontSize="small">not_interested</Icon>
                    Close Account
                </StyledButton>
                <StyledButton>
                    <GetApp />
                    Export Data
                </StyledButton>

                <FlexBox mb={2}>
                    <Icon sx={{ mr: 1, fontSize: '1.25rem' }} color="secondary">
                        info
                    </Icon>
                    <Small sx={{ color: textMuted }}>
                        Once you delete account, data will be lost forever.
                    </Small>
                </FlexBox>

                <StyledButton
                    variant="contained"
                    sx={{ background: bgError, color: '#fff' }}
                >
                    <Icon>delete</Icon> Delete Account
                </StyledButton>
            </ContentBox>
        </Card>
    )
}

export default CustomerActions
