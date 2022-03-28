import React, { useState, useContext, useEffect } from "react";
import { styled, useTheme } from "@mui/system";
import { TextField, Button, Switch, FormControlLabel } from "@mui/material";
import firebase from "firebase/app";
import DataContext from "app/contexts/DataContext";
import { H3, H5 } from "app/components/Typography";
import { getData } from "./../../utils/helpers";
import { API_URL } from "./../../utils/urls";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
}));

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "flex-start",
  width: "250px",
  marginBottom: "50px",
}));

const Settings = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [insta, setInsta] = useState("");
  const [paymentChoices, setPaymentChoices] = useState(false);
  const [config, setConfig] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { role } = useContext(DataContext);
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const styles = {
    header: { marginBottom: "10px", color: textMuted },
    text: { width: "250px", marginBottom: "1rem" },
    button: { width: "100px" },
  };

  async function updateUser(field) {
    let data;
    if (name && field === "name") data = name;
    if (insta && field === "insta") data = insta;
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const fetchConfig = {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ [field]: data }),
      };
      if (data) {
        await fetch(`${API_URL}/users/user`, fetchConfig);
        await getData("/users/user", setUser);
        if (insta) document.location.reload(); // Force a reload to update photo.
        setName("");
        setInsta("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function togglePaymentChoices() {
    setPaymentChoices(!paymentChoices);
    setDisabled(true);
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const fetchConfig = {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ paymentChoices: !paymentChoices }),
      };
      await fetch(`${API_URL}/config/payment-options`, fetchConfig);
      setDisabled(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData("/users/user", setUser);
  }, []);

  useEffect(() => {
    async function configure() {
      await getData("/config/all", setConfig);
      if (config.paymentChoices) {
        setPaymentChoices(config.paymentChoices);
      }
    }
    configure();
  }, [config.paymentChoices]);

  return (
    <Container>
      <H3 sx={{ marginBottom: "2rem" }}>Settings</H3>
      <FlexBox>
        <H5 sx={styles.header}>Name: {user?.name || "Not yet set"}</H5>
        <TextField
          sx={styles.text}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          sx={styles.button}
          variant="outlined"
          onClick={() => updateUser("name")}
        >
          Update
        </Button>
      </FlexBox>
      <FlexBox>
        <H5 sx={styles.header}>Insta handle: {user?.insta || "Not yet set"}</H5>
        <TextField
          sx={styles.text}
          label="Instagram"
          value={insta}
          onChange={(e) => setInsta(e.target.value)}
        />
        <Button
          sx={styles.button}
          variant="outlined"
          onClick={() => updateUser("insta")}
        >
          Update
        </Button>
      </FlexBox>
      {role === "admin" && (
        <FormControlLabel
          control={
            <Switch checked={paymentChoices} onChange={togglePaymentChoices} />
          }
          label="Allow card payments"
          disabled={disabled}
        />
      )}
    </Container>
  );
};

export default Settings;
