import React from 'react'
import { Card, Grid, Button } from '@mui/material'
import { Box, styled, lighten, useTheme } from '@mui/system'
import { H1, H3, H4, H5, Paragraph, Small } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const StyledP = styled(Paragraph)(({ theme }) => ({
    color: theme.palette.text.secondary,
}))

const StyledCard = styled(Card)(({ theme }) => ({
    padding: '24px',
    marginBottom: '44px',
    boxShadow: 'none',
    background: lighten(theme.palette.error.main, 0.85),
}))

const GridContent = styled(Card)(({ theme }) => ({
    textAlign: 'center',
    borderRadius: 20,
    transition: 'all 0.3s ease',
    padding: '24px !important',
    '&:hover': { boxShadow: themeShadows[12] },
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const IMG = styled('img')(({ theme }) => ({
    width: 152,
    height: 152,
    marginBottom: '16px',
}))

const Pricing = () => {
    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main
    const textMuted = palette.text.secondary

    return (
        <Container>
            <StyledCard>
                <H4 sx={{ color: textError }}>
                    You are using the free version of the Application
                </H4>
                <StyledP sx={{ maxWidth: 770 }}>
                    With 10k searchable messages, 10 apps and integrations,
                    1-to-1 video calls and two factor authentication. The free
                    version gives your team access to Application's basic
                    features
                </StyledP>
            </StyledCard>

            <Box mb="44px" width="100%" textAlign="center">
                <H3>Choose the plan that's right for your team</H3>
                <StyledP sx={{ pt: 2 }}>
                    Pay month or year and cancel at any time
                </StyledP>
            </Box>

            <div>
                <Grid container spacing={6}>
                    {planList.map((item, ind) => (
                        <Grid
                            key={item.title}
                            item
                            lg={4}
                            md={4}
                            sm={4}
                            xs={12}
                        >
                            <GridContent elevation={6}>
                                <IMG src={item.logo} alt={item.title} />
                                <Box mb={2}>
                                    <H4
                                        sx={{
                                            fontWeight: '300',
                                            color: textPrimary,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {item.title}
                                    </H4>
                                    <H1
                                        sx={{
                                            fontSize: '48px',
                                            color: textPrimary,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        ${item.price}
                                    </H1>
                                    <Small sx={{ color: textMuted }}>
                                        Monthly
                                    </Small>
                                </Box>

                                <Box
                                    mb={3}
                                    color={textMuted}
                                    sx={{ '& p': { fontSize: '16px' } }}
                                >
                                    <Paragraph>Complete CRM service</Paragraph>
                                    <Paragraph sx={{ my: '16px' }}>
                                        100GB disk space
                                    </Paragraph>
                                    <Paragraph>upto 5 users</Paragraph>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ textTransform: 'uppercase' }}
                                >
                                    Sign up
                                </Button>
                            </GridContent>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    )
}

const planList = [
    {
        title: 'Starter',
        price: 75,
        logo: '/assets/images/illustrations/baby.svg',
    },
    {
        title: 'Growing',
        price: 195,
        logo: '/assets/images/illustrations/upgrade.svg',
    },
    {
        title: 'Enterprise',
        price: 495,
        logo: '/assets/images/illustrations/business_deal.svg',
    },
]
export default Pricing
