import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Avatar, Button, Card, Grid, Icon } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H3, H4, Paragraph, Span } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const SideNav = styled(FlexBox)(({ theme }) => ({
    marginTop: '-345px',
    paddingTop: '74px',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        marginTop: -410,
    },
}))

const ContentBox = styled(FlexBox)(() => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '48px',
    paddingRight: '48px',
    marginBottom: '44px',
    '& p': {
        marginBottom: '4px',
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.54)',
    },
    '& h3': {
        color: '#fff',
        fontWeight: '500',
    },
}))

const StyledCard = styled(Card)(() => ({
    width: 104,
    height: 104,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

// top: -30px;
// width: 5px;
// height: 35px;
// content: " ";
// position: absolute;
// background: #1976d2;

const UserProfileSidenav = () => {
    const { user } = useAuth()
    const { palette } = useTheme()
    const bgPrimary = palette.primary.main
    const textMuted = palette.text.secondary
    const textPrimary = palette.primary.main
    const bgDefault = palette.background.default
    const textLightWhite = 'rgba(255, 255, 255, 0.54)'

    return (
        <SideNav>
            <Avatar
                sx={{ height: 84, width: 84, mb: '20px' }}
                src="/assets/images/face-7.jpg"
            />
            <Paragraph sx={{ my: '16px', color: '#fff' }}>
                {user.name}
            </Paragraph>
            <Box py="12px" />
            <ContentBox>
                <Box flexGrow={1}>
                    <Paragraph>balance</Paragraph>
                    <H3>$ 20,495</H3>
                </Box>
                <Box>
                    <Paragraph>points</Paragraph>
                    <H3>PT 3,000</H3>
                </Box>
                <div />
            </ContentBox>
            <Box px={4} pt={2} sx={{ background: bgDefault }}>
                <Grid container spacing={3}>
                    <Grid item>
                        <StyledCard sx={{ background: bgPrimary }}>
                            <Box textAlign="center" color={textLightWhite}>
                                <Icon>sentiment_very_satisfied</Icon>
                                <br />
                                <Span sx={{ pt: 2 }}>Dashboard</Span>
                            </Box>
                        </StyledCard>
                    </Grid>
                    {shortcutList.map((item, ind) => (
                        <Grid item key={ind}>
                            <StyledCard>
                                <Box textAlign="center" color={textMuted}>
                                    <Icon>{item.icon}</Icon>
                                    <br />
                                    <Span sx={{ pt: 2 }}>{item.title}</Span>
                                </Box>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
                <Box py="16px" />
                <JustifyBox color={textPrimary}>
                    <Button>
                        <Icon>sentiment_very_satisfied</Icon>
                        <H4
                            sx={{
                                ml: 4,
                                color: textPrimary,
                                fontWeight: '500',
                            }}
                        >
                            Upgrade to premium
                        </H4>
                    </Button>
                </JustifyBox>
                <Box py="8px" />
            </Box>
        </SideNav>
    )
}

const shortcutList = [
    {
        title: 'stars',
        icon: 'star_outline',
    },
    {
        title: 'events',
        icon: 'email',
    },
    {
        title: 'Photo',
        icon: 'collections',
    },
    {
        title: 'settings',
        icon: 'brightness_7',
    },
    {
        title: 'contacts',
        icon: 'group',
    },
]

export default UserProfileSidenav
