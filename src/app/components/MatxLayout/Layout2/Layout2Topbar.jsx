import React from 'react'
import { Link } from 'react-router-dom'
import { Span } from "../../Typography"
import useAuth from 'app/hooks/useAuth'
import { styled, Box } from '@mui/system'
import useSettings from 'app/hooks/useSettings'
import { topBarHeight } from 'app/utils/constants'
import { Icon, IconButton, Hidden, MenuItem, Avatar } from '@mui/material'
import MatxToolbarMenu from 'app/components/MatxToolbarMenu/MatxToolbarMenu'
import MatxMenu from 'app/components/MatxMenu/MatxMenu'

const TopbarContainer = styled('div')(({ theme }) => ({
    zIndex: 98,
    width: "100%",
    paddingTop: '1rem',
    position: 'relative',
    paddingBottom: '1rem',
    paddingLeft: '1.75rem',
    height: topBarHeight,
    borderBottom: '1px solid transparent',
    borderColor: theme.palette.divider,
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '1rem',
    },
    "& span": {
        color: theme.palette.text.primary
    }
}))

const StyledSpan = styled(Span)(({ theme }) => ({
    fontSize: 24,
    marginLeft: '10px',
    marginRight: '10px',
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
    minWidth: 185,
    display: 'flex',
    alignItems: 'center',
    "& a": {
        width: '100%'
    }
}))

const UserProfile = styled(Avatar)(({ theme }) => ({
    cursor: 'pointer',
    margin: '0px 10px',
}))

const TopbarRoot = styled('div')(() => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MatxLogo = styled('div')(() => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}))

const IMG = styled('img')(() => ({
    height: 32
}))

const Layout2Topbar = () => {
    const { logout, user } = useAuth()
    const { settings, updateSettings } = useSettings()

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout2Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout2Settings } = settings

        let mode =
            layout2Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close'

        updateSidebarMode({ mode })
    }

    return (
        <TopbarContainer>
            <TopbarRoot>
                <MatxLogo>
                    <IMG
                        alt="company-logo"
                        src="/assets/images/logo.svg"
                    />
                    <StyledSpan>Matx</StyledSpan>
                </MatxLogo>
                <Box display="flex" alignItems="center">
                    <MatxToolbarMenu offsetTop="64px">

                        <MatxMenu
                            menuButton={<UserProfile src={user.avatar} />}
                        >
                            <StyledItem>
                                <Icon> home </Icon>
                                <Span sx={{ pl: 2 }}> Home </Span>
                            </StyledItem>
                            <StyledItem>
                                <Link to="/page-layouts/user-profile">
                                    <Icon> person </Icon>
                                    <Span sx={{ pl: 2 }}> Profile </Span>
                                </Link>
                            </StyledItem>
                            <StyledItem>
                                <Icon> settings </Icon>
                                <Span sx={{ pl: 2 }}> Settings </Span>
                            </StyledItem>
                            <StyledItem onClick={logout}>
                                <Icon> power_settings_new </Icon>
                                <Span sx={{ pl: 2 }}> Logout </Span>
                            </StyledItem>
                        </MatxMenu>
                    </MatxToolbarMenu>

                    <Hidden mdUp>
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 1)' }}
                            onClick={handleSidebarToggle}
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>
                </Box>
            </TopbarRoot>
        </TopbarContainer>
    )
}

export default Layout2Topbar
