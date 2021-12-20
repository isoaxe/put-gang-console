import React, { useState } from 'react'
import { Card, Grid, Button } from '@mui/material'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { Paragraph } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const Auth0Root = styled(JustifyBox)(() => ({
    minHeight: '100vh !important',
}))

const StyledCard = styled(Card)(() => ({
    maxWidth: 800,
    borderRadius: 12,
    margin: '1rem',
    '& img': {
        width: '100%',
    },
    '& .cardHolder': {
        background: '#1A2038',
    },
    '& .socialButton': {
        width: '100%',
        '& img': {
            margin: '0 8px',
        },
    },
}))

const Auth0Login = () => {
    const [message, setMessage] = useState('')
    const { loginWithPopup } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        try {
            await loginWithPopup()
            navigate('/')
        } catch (e) {
            console.log(e)
            setMessage(e.message)
        }
    }

    const { palette } = useTheme()
    const textError = palette.error.main
    const bgLightGrey = 'rgba(0, 0, 0, 0.01)'

    return (
        <Auth0Root>
            <StyledCard>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <img
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <JustifyBox
                            p={4}
                            height="100%"
                            position="relative "
                            sx={{ background: bgLightGrey }}
                        >
                            <Button
                                onClick={handleLogin}
                                variant="contained"
                                className="socialButton"
                            >
                                Sign In With
                                <img
                                    src="/assets/images/logos/auth0.svg"
                                    alt=""
                                />
                            </Button>
                        </JustifyBox>
                        {message && (
                            <Paragraph sx={{ color: textError }}>
                                {message}
                            </Paragraph>
                        )}
                    </Grid>
                </Grid>
            </StyledCard>
        </Auth0Root>
    )
}

export default Auth0Login
