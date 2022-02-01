import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/system';
import { TextField, Button } from '@mui/material';
import firebase from 'firebase/app';
import { H3, H5 } from 'app/components/Typography';
import { getData } from './../../utils/helpers';
import { API_URL } from './../../utils/urls';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}));

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'flex-start',
    width: '250px',
    marginBottom: '24px',
}));

const Settings = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [insta, setInsta] = useState("");
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  async function updateUser (field) {
    if (field === "name") user["name"] = name;
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const fetchConfig = {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({user})
      };
      const response = await fetch(`${API_URL}/users/user`, fetchConfig);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      getData("/users/user", setUser);
      setName("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData("/users/user", setUser);
  }, []);

  return (
    <Container>
      <H3 sx={{ marginBottom: "2rem" }}>Settings</H3>
        <FlexBox>
          <H5 sx={{ marginBottom: "10px", color: textMuted }}>
            Current Name: {user?.name || "Not yet set"}
          </H5>
          <TextField
            sx={{ width: '250px', marginBottom: '1rem' }}
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            sx={{ width: '100px' }}
            variant="outlined"
            onClick={() => updateUser("name")}
          >
            Update
          </Button>
        </FlexBox>
        <FlexBox>
          <H5 sx={{ marginBottom: "10px", color: textMuted }}>
            Current Instagram handle: {user?.insta || "Not yet set"}
          </H5>
          <TextField
            sx={{ width: '250px', marginBottom: '1rem' }}
            label="Instagram"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
          />
          <Button
            sx={{ width: '100px' }}
            variant="outlined"
            onClick={() => updateUser("insta")}
          >
            Update
          </Button>
        </FlexBox>
    </Container>
  )
}

export default Settings;
