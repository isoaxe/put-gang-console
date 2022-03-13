import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import firebase from "firebase/app";
import { Box, styled, useTheme } from "@mui/system";
import useAuth from "app/hooks/useAuth";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Paragraph, Span } from "app/components/Typography";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const IMG = styled("img")(() => ({
  width: "100%",
  maxWidth: 200,
}));

const FirebaseRoot = styled(JustifyBox)(({ theme }) => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    margin: "1rem",
  },
  "& .cardLeft": {
    height: "100%",
    padding: "32px 56px",
    background: "#161c37 url(/assets/images/bg-3.png) no-repeat",
    backgroundSize: "cover",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      minWidth: 200,
      alignItems: "center",
    },
  },
  "& .buttonProgress": {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

// Temporary function to generate tokens for testing with Postman.
function getBearerToken() {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(function (idToken) {
      console.log("Bearer token:", idToken);
    })
    .catch(function (error) {
      console.error("There was a problem with the token generation...");
    });
}

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [message, setMessage] = useState("");
  const { signInWithEmailAndPassword } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(userInfo.email, userInfo.password);
      navigate("/");
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setLoading(false);
    }
  };

  // Temporary function to login without redirecting to console.
  async function signInNoRedirect(event) {
    try {
      await signInWithEmailAndPassword(userInfo.email, userInfo.password);
      console.log(`${userInfo.email} signed in!`);
      window.alert(`${userInfo.email} signed in!`);
    } catch (e) {
      console.log(e);
      setMessage(e.message);
    }
  }

  const { palette } = useTheme();
  const textError = palette.error.main;
  const textPrimary = palette.primary.main;

  return (
    <FirebaseRoot>
      <Card className="card">
        <Grid container>
          <Grid item lg={6} md={6} sm={5} xs={12}>
            <div className="cardLeft">
              <IMG src="/assets/images/put-gang-logo.png" alt="Put Gang Icon" />
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box p={4} height="100%" position="relative">
              <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                  sx={{ mb: 3, width: "100%" }}
                  variant="outlined"
                  size="small"
                  label="Email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={userInfo.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
                <TextValidator
                  sx={{ mb: "12px", width: "100%" }}
                  label="Password"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={userInfo.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <FormControlLabel
                  sx={{ mb: "12px", maxWidth: 288 }}
                  name="remember"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      size="small"
                      onChange={({ target: { checked } }) =>
                        handleChange({
                          target: {
                            name: "remember",
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
                  <Paragraph sx={{ color: textError }}>{message}</Paragraph>
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
                      <CircularProgress size={24} className="buttonProgress" />
                    )}
                  </Box>
                  <Span sx={{ mr: 1, ml: "20px" }}>or</Span>
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => navigate("/session/signup")}
                  >
                    Sign up
                  </Button>
                </FlexBox>
                <Button
                  sx={{ color: textPrimary }}
                  onClick={() => navigate("/session/forgot-password")}
                >
                  Forgot password?
                </Button>
              </ValidatorForm>
              <button style={{ marginTop: "8px" }} onClick={signInNoRedirect}>
                Sign In: No Redirect
              </button>
              <button style={{ margin: "8px" }} onClick={getBearerToken}>
                Get a token
              </button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FirebaseRoot>
  );
};

export default Login;
