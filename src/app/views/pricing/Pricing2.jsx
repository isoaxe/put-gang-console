import React from 'react'
import { Card, Icon, Button, Grid } from '@mui/material'
import { Box, styled, lighten, useTheme } from '@mui/system'
import { H1, H4, Paragraph } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const GridContent = styled(FlexBox)(() => ({
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '48px',
    paddingBottom: '48px',
    '& h4': { marginBottom: '24px', fontSize: '20px' },
    '& .icon': { fontSize: 72, marginBottom: '32px' },
}))

const ContentBox = styled(FlexBox)(({ theme }) => ({
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& .title': {
        margin: '8px',
        color: theme.palette.text.secondary,
    },
    '& .content': {
        padding: '2px',
        overflow: 'hidden',
        borderRadius: '300px',
        background: 'rgba(0, 0, 0, 0.15)',
    },
}))

const PriceBox = styled('div')(({ textColor, theme }) => ({
    display: 'flex',
    marginTop: '40px',
    marginBottom: '40px',
    '& h1': { fontSize: '48px', color: theme.palette.text.secondary },
    '& b': {
        marginTop: '6px',
        marginLeft: '4px',
        color: textColor && textColor,
    },
}))

const StyledButton = styled(Button)(({ bgColor }) => ({
    color: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    overflow: 'hidden',
    paddingLeft: '28px',
    paddingRight: '28px',
    borderRadius: '300px',
    boxShadow: themeShadows[12],
    background: bgColor && bgColor,
}))

const StyledP = styled(Paragraph)(({ theme }) => ({
    marginTop: '8px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const PricingRoot = styled('div')(() => ({
    '& .icon': {
        fontSize: 84,
    },
    '& .dot': {
        fontSize: 8,
    },
    '& .title': {
        opacity: 0.74,
    },
}))

const Pricing2 = () => {
    const { palette } = useTheme()
    const textError = palette.error.main
    const textMuted = palette.text.secondary
    const textPrimary = palette.primary.main
    const textSecondary = palette.secondary.main
    const textGreen = '#08ad6c !important'
    const bgError = palette.error.main
    const bgGreen = 'rgba(9, 182, 109, 1)'
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    return (
        <Container>
            <Card elevation={3} sx={{ px: 3, mb: 2 }}>
                <Grid container spacing={3}>
                    <Grid item lg={4} xs={12}>
                        <GridContent>
                            <Icon className="icon" color="primary">
                                sports_football
                            </Icon>
                            <H4 sx={{ color: textMuted }}>Startup </H4>
                            <ContentBox>
                                <span className="title">1 Domain</span>
                                <span className="content"></span>
                                <span className="title">5 Users</span>
                                <span className="content"></span>
                                <span className="title">10 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox textColor={textMuted}>
                                <H1>75</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton variant="contained" color="primary">
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <GridContent>
                            <Icon className="icon" color="primary">
                                trending_up
                            </Icon>
                            <H4 sx={{ color: textMuted }}>Growth Plan</H4>
                            <ContentBox>
                                <span className="title">8 Domain</span>
                                <span className="content"></span>
                                <span className="title">15 Users</span>
                                <span className="content"></span>
                                <span className="title">100 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox textColor={textMuted}>
                                <H1>175</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton variant="contained" color="primary">
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <GridContent>
                            <Icon className="icon" color="primary">
                                apartment
                            </Icon>
                            <H4 sx={{ color: textMuted }}>Enterprise</H4>
                            <ContentBox>
                                <span className="title">10 Domain</span>
                                <span className="content"></span>
                                <span className="title">25 Users</span>
                                <span className="content"></span>
                                <span className="title">1000 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox textColor={textMuted}>
                                <H1>875</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton variant="contained" color="primary">
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>
                </Grid>
            </Card>

            <Card elevation={3} sx={{ px: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xl={6} md={6} xs={12}>
                        <GridContent>
                            <Icon className="icon" color="error">
                                person
                            </Icon>
                            <H4 sx={{ color: textMuted }}>Student</H4>
                            <ContentBox>
                                <span className="title">1 Domain</span>
                                <span className="content"></span>
                                <span className="title">5 Users</span>
                                <span className="content"></span>
                                <span className="title">10 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox textColor={textError}>
                                <H1>20</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton
                                bgColor={bgError}
                                variant="contained"
                                color="primary"
                            >
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>

                    <Grid item xl={6} md={6} xs={12}>
                        <GridContent>
                            <Icon className="icon" sx={{ color: textGreen }}>
                                flight
                            </Icon>
                            <H4 sx={{ color: textMuted }}>Basic Plan</H4>
                            <ContentBox>
                                <span className="title">8 Domain</span>
                                <span className="content"></span>
                                <span className="title">15 Users</span>
                                <span className="content"></span>
                                <span className="title">100 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox textColor={textPrimary}>
                                <H1>75</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton bgColor={bgGreen} variant="contained">
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>

                    <Grid item xl={6} md={6} xs={12}>
                        <GridContent>
                            <Icon className="icon" sx={{ color: textGreen }}>
                                business
                            </Icon>
                            <H4 sx={{ color: textMuted }}>For Business</H4>
                            <ContentBox>
                                <span className="title">18 Domain</span>
                                <span className="content"></span>
                                <span className="title">35 Users</span>
                                <span className="content"></span>
                                <span className="title">10000 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox>
                                <H1>375</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton
                                bgColor={bgSecondary}
                                variant="contained"
                            >
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>

                    <Grid item xl={6} md={6} xs={12}>
                        <GridContent>
                            <Icon
                                className="icon"
                                sx={{ color: textSecondary }}
                            >
                                meeting_room
                            </Icon>
                            <H4 sx={{ color: textMuted }}>Enterprise</H4>
                            <ContentBox>
                                <span className="title">18 Domain</span>
                                <span className="content"></span>
                                <span className="title">35 Users</span>
                                <span className="content"></span>
                                <span className="title">10000 Copies</span>
                            </ContentBox>
                            <StyledP>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </StyledP>
                            <PriceBox>
                                <H1>375</H1>
                                <b>$</b>
                            </PriceBox>
                            <StyledButton
                                bgColor={bgPrimary}
                                variant="contained"
                            >
                                Purchase
                            </StyledButton>
                        </GridContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Pricing2
