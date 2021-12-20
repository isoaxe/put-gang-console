import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter } from '@mui/icons-material'
import { MatxMenu, GoogleIcon } from 'app/components'
import { Card, Button, Icon, Avatar, MenuItem } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H4, H5, Paragraph, Span } from 'app/components/Typography'
import { convertHexToRGB } from 'utils'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    paddingLeft: '20px',
    paddingRight: '20px',
    transition: 'all 250ms',
    color: theme.palette.primary.main,
    background: `rgba(${convertHexToRGB(theme.palette.primary.main)}, 0.15)`,
    '&:hover': {
        color: '#ffffff',
        fallbacks: [{ color: 'white !important' }],
        background: `${theme.palette.primary.main} !important`,
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
}))

const StyledLink = styled(Link)(({ theme, iconColor }) => ({
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '& span': { marginLeft: '8px' },
    '& svg': { fontSize: '14px', color: iconColor },
}))

const ProfileCard1 = ({ user }) => {
    const { palette } = useTheme()
    const textMuted = palette.text.secondary
    const primary = palette.primary.main

    return (
        <Card sx={{ p: '20px' }}>
            <FlexBox mb={2} justifyContent="space-between">
                <Avatar sx={{ width: 56, height: 56 }} src={user?.imgUrl} />
                <div>
                    <MatxMenu
                        menuButton={
                            <Icon sx={{ cursor: 'pointer' }}>more_horiz</Icon>
                        }
                    >
                        <MenuItem>
                            <Icon fontSize="small"> account_circle </Icon>
                            <Span sx={{ pl: 2 }}> View Profile </Span>
                        </MenuItem>
                        <MenuItem>
                            <Icon fontSize="small"> person_add </Icon>
                            <Span sx={{ pl: 2 }}> Add to Team </Span>
                        </MenuItem>
                        <MenuItem>
                            <Icon fontSize="small"> edit </Icon>
                            <Span sx={{ pl: 2 }}> Edit Profile </Span>
                        </MenuItem>
                    </MatxMenu>
                </div>
            </FlexBox>
            <div>
                <H4 sx={{ textTransform: 'capitalize' }}>{user?.name}</H4>
                <Paragraph sx={{ my: 1, mb: '12px', color: textMuted }}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                </Paragraph>
                <Box mb={2}>
                    <StyledLink iconColor={'#ec412c'} sx={{ mb: '4px' }} to="/">
                        <GoogleIcon />
                        <span>ui-lib@gmail.com</span>
                    </StyledLink>
                    <StyledLink iconColor={primary} to="/">
                        <Twitter color="secondary" />
                        <span>uilib</span>
                    </StyledLink>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    <StyledButton size="small" sx={{ mr: '4px' }}>
                        CHAT
                    </StyledButton>
                    <StyledButton size="small">PROFILE</StyledButton>
                </Box>
            </div>
        </Card>
    )
}

export default ProfileCard1
