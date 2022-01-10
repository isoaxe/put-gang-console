import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import { MatxLogo, MatxDivider } from 'app/components'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, Span } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const StyledButton = styled(Button)(() => ({
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 6%), 0px 8px 10px 1px rgb(0 0 0 / 4%), 0px 3px 14px 2px rgb(0 0 0 / 4%)',
    backgroundColor: '#e0e0e0',
    '&:hover': {
        backgroundColor: '#d5d5d5',
    },
}))

const FirebaseRoot = styled(JustifyBox)(({ theme }) => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        margin: '1rem',
    },
    '& .cardLeft': {
        height: '100%',
        padding: '32px 56px',
        background: '#161c37 url(/assets/images/bg-3.png) no-repeat',
        backgroundSize: 'cover',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            minWidth: 200,
        },
        '& img': {
            width: 32,
            height: 32,
        },
    },
    '& .logo': {
        display: 'flex',
        alignItems: 'center',
        '& span': {
            fontSize: 26,
            lineHeight: 1.3,
            fontWeight: 800,
        },
    },
    '& .mainTitle': {
        fontSize: 18,
        lineHeight: 1.3,
        marginBottom: 24,
    },
    '& .features': {
        '& .item': {
            position: 'relative',
            marginBottom: 12,
            paddingLeft: 20,
            '&::after': {
                position: 'absolute',
                content: '""',
                width: 4,
                height: 4,
                borderRadius: 4,
                left: 4,
                top: 7,
                backgroundColor: theme.palette.error.main,
            },
        },
    },
    '& .buttonProgress': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    '& .socialButton': {
        width: '100%',
        '& img': {
            margin: '0 8px',
        },
    },
}))

const FirebaseLogin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        remember: true,
    })
    const [message, setMessage] = useState('')
    const { signInWithEmailAndPassword, signInWithGoogle } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(userInfo.email, userInfo.password)
            navigate('/')
        } catch (e) {
            console.log(e)
            setMessage(e.message)
            setLoading(false)
        }
    }

    // Temporary function to login without redirecting to console.
    async function signInNoRedirect (event) {
        try {
            await signInWithEmailAndPassword(userInfo.email, userInfo.password)
            console.log(`${userInfo.email} signed in!`)
            window.alert(`${userInfo.email} signed in!`)
        } catch (e) {
            console.log(e)
            setMessage(e.message)
        }
    }

    const handleGoogleLogin = async (event) => {
        try {
            await signInWithGoogle()
            navigate('/')
        } catch (e) {
            setMessage(e.message)
            setLoading(false)
            console.log(e)
        }
    }

    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main

    return (
        <FirebaseRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={6} md={6} sm={5} xs={12}>
                        <div className="cardLeft">
                            <div className="logo">
                                <MatxLogo sx={{ mr: 1 }} />{' '}
                                <span>MatX Pro</span>
                            </div>
                            <h1 className="mainTitle">Admin Dashboard</h1>
                            <div className="features">
                                <div className="item">
                                    JWT, FireBase & Auth0 Authentication
                                </div>
                                <div className="item">
                                    Clean & Organised code
                                </div>
                                <div className="item">
                                    Limitless Pages & Components
                                </div>
                            </div>
                            <Span sx={{ flexGrow: 1 }}></Span>
                            <FlexBox>
                                <a
                                    href="https://ui-lib.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="/assets/images/logos/ui-lib.png"
                                        alt="UI Lib Logo"
                                    />
                                </a>
                            </FlexBox>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box px={4} pt={4}>
                            <StyledButton
                                onClick={handleGoogleLogin}
                                variant="contained"
                                className="socialButton"
                            >
                                <img
                                    src="/assets/images/logos/google.svg"
                                    alt=""
                                />
                                Sign In With Google
                            </StyledButton>
                        </Box>

                        <MatxDivider sx={{ mt: 3, px: 4 }} text="Or" />

                        <Box p={4} height="100%" position="relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    sx={{ mb: '12px', maxWidth: 288 }}
                                    name="remember"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: 'remember',
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={userInfo.remember}
                                        />
                                    }
                                    label="Remember me"
                                />

                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate('/session/signup')}
                                    >
                                        Sign up
                                    </Button>
                                </FlexBox>
                                <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() => navigate('/session/forgot-password')}
                                >
                                    Forgot password?
                                </Button>
                            </ValidatorForm>
                            <button style={{marginTop: "8px"}} onClick={signInNoRedirect}>
                              Sign In: No Redirect
                            </button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </FirebaseRoot>
    )
}

export default FirebaseLogin
