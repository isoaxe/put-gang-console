import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/system';
import { TextField, Button } from '@mui/material';
import { H3, H5 } from 'app/components/Typography';
import { getData } from './../../utils/helpers';
import { API_URL } from './../../utils/urls';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '24px',
}))

const Settings = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  async function updateUser () {
    console.log('Placeholder');
  }

  useEffect(() => {
    getData("/users/user", setUser);
  }, []);

  return (
    <Container>
      <H3 sx={{ marginBottom: "2rem" }}>Settings</H3>
        <H5 sx={{ marginBottom: "10px", color: textMuted }}>
          Current Name: {user?.name || "Not yet set"}
        </H5>
        <FlexBox>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: '1rem' }}
            onClick={updateUser}
          >
            Update
          </Button>
        </FlexBox>
    </Container>
  )
}

export default Settings;
