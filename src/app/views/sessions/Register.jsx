import {
    Card,
    Grid,
    Button,
    CircularProgress,
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate } from 'react-router-dom'
import "firebase/auth"
import useAuth from 'app/hooks/useAuth'
import { Paragraph, Span, H3 } from 'app/components/Typography'
import { API_URL } from 'app/utils/urls'


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

const Header = styled(H3)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: '15px',
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
    '& .labelLink': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
    },
}))

const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [message, setMessage] = useState('')
    const { signInWithEmailAndPassword, refId, membLvl } = useAuth()
    let { email, password, agreement } = state;
    const { palette } = useTheme();
    const textError = palette.error.main;

    function setHeader () {
        if (membLvl === 'join') return <Header>Signing up to Join the Discussion</Header>;
        if (membLvl === 'watch') return <Header>Signing up to Watch the Discussion</Header>
    }

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
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
            const response = await fetch(`${API_URL}/users/${refId}/${membLvl}`, fetchConfig);
            const jsonResponse = await response.json();
            if (jsonResponse.error) {
              setLoading(false)
              setMessage(jsonResponse.error)
              console.log(jsonResponse)
            } else {
              await signInWithEmailAndPassword(email, password);
              navigate('/')
            }
        } catch (e) {
            setLoading(false)
            setMessage(e.message)
            console.log(e)
        }
    }

    return (
        <RegisterRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src="/assets/images/put-gang-banner.png"
                                alt="Put Gang Logo"
                            />
                        </ContentBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box p={4} height="100%">
                            {setHeader()}
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

export default Register;
