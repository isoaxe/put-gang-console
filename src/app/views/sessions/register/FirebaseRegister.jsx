import {
    Card,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import { Paragraph, Span } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
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

const RegisterRoot = styled(JustifyBox)(({ theme }) => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 650,
        borderRadius: 12,
        margin: '1rem',
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
    '& .labelLink': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
    },
}))

const FirebaseRegister = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [message, setMessage] = useState('')
    const { signInWithEmailAndPassword, signInWithGoogle } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    const handleGoogleRegister = async (event) => {
        try {
            await signInWithGoogle()
            navigate('/')
        } catch (e) {
            setMessage(e.message)
            setLoading(false)
            console.log(e)
        }
    }

    const handleFormSubmit = async () => {
        try {
            setLoading(true)
            const fetchConfig = {
          		method: "POST",
          		headers: {
          			"Content-Type": "application/json",
          			"Accept": "application/json"
          		},
              body: JSON.stringify(state)
          	};
            const response = await fetch("http://localhost:5001/put-gang/us-central1/api/users", fetchConfig);
            console.log(response.json());
            navigate('/')
            signInWithEmailAndPassword(email, password);
        } catch (e) {
            setLoading(false)
            console.log(e)
            setMessage(e.message)
        }
    }
    let { email, password, agreement } = state
    const { palette } = useTheme()
    const textError = palette.error.main

    return (
        <RegisterRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src="/assets/images/illustrations/posting_photo.svg"
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box px={4} pt={4}>
                            <StyledButton
                                onClick={handleGoogleRegister}
                                variant="contained"
                                className="socialButton"
                            >
                                <img
                                    src="/assets/images/logos/google.svg"
                                    alt=""
                                />
                                Sign Up With Google
                            </StyledButton>
                        </Box>
                        <Paragraph sx={{ textAlign: 'center' }}>Or</Paragraph>
                        <Box p={4} height="100%">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    sx={{ mb: '16px' }}
                                    name="agreement"
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: 'agreement',
                                                value: e.target.checked,
                                            },
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={agreement || false}
                                        />
                                    }
                                    label={
                                        <>
                                            I have read and agree to the{' '}
                                            <a href="/" className="labelLink">
                                                terms of service.
                                            </a>
                                        </>
                                    }
                                />
                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}
                                <FlexBox display="flex" alignItems="center">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign Up
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
                                        onClick={() => navigate("/session/signin")}
                                    >
                                        Sign In
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </RegisterRoot>
    )
}

export default FirebaseRegister
