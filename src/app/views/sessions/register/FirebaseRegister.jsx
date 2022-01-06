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
import firebase from 'firebase/app'
import useAuth from 'app/hooks/useAuth'
import { Paragraph, Span } from 'app/components/Typography'
import { API_URL } from './../../../utils/urls'


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

// Temporary function to generate tokens for testing with Postman.
function getBearerToken () {
  firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
    console.log("Bearer token:", idToken);
  }).catch(function(error) {
    console.error("There was a problem with the token generation...");
  });
}

/*
 * Temporary function to make payment in order to test the api.
 *
 * In order to test, go to the handleFormSubmit function of FirebaseLogin.jsx.
 * Comment out the line [navigate('/')]. Then attempt to login via the console.
 * The loading icon will not resolve but you will be logged in. Then this
 * makePayment function can be called as the currentUser value will be populated.
 */
async function makePayment () {
  // Hardcode some sample api url params.
  const type = "join";
  const uid = "0sCC49t0MPgnYfYJD1KHa6bMRS63"; // uid for lucas@gmail.com
  try {
    const token = await firebase.auth().currentUser.getIdToken(true);
    const fetchConfig = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
      // Add body here for more info if necessary.
    };
    const response = await fetch(`${API_URL}/payments/${uid}/${type}`, fetchConfig);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
} catch (error) {
    console.log(error)
  }
}


const FirebaseRegister = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [message, setMessage] = useState('')
    const { signInWithEmailAndPassword, signInWithGoogle, refId, membLvl } = useAuth()

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
            const response = await fetch(`${API_URL}/users/${refId}/${membLvl}`, fetchConfig);
            const jsonResponse = await response.json();
            if (jsonResponse.error) {
              setLoading(false)
              setMessage(jsonResponse.error)
              console.log(jsonResponse)
            } else {
              navigate('/')
              signInWithEmailAndPassword(email, password);
            }
        } catch (e) {
            setLoading(false)
            setMessage(e.message)
            console.log(e)
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
                                <FlexBox display="flex" alignItems="center">
                                    <Box position="relative">
                                        <button style={{marginTop: "8px"}} onClick={getBearerToken}>
                                          Get a token
                                        </button>
                                        <button style={{margin: "8px"}} onClick={makePayment}>
                                          Make payment
                                        </button>
                                    </Box>
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
