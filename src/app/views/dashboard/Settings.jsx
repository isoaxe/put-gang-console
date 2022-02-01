import React, { useState, useContext } from 'react';
import { styled, useTheme } from '@mui/system';
import { TextField, Button } from '@mui/material';
import DataContext from './../../contexts/DataContext';
import { H3, H5 } from 'app/components/Typography';
import useAuth from './../../hooks/useAuth';


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
  const [name, setName] = useState("");
  const { users } = useContext(DataContext);
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const uid = useAuth().user.id;
  const user = users.find(item => item.uid === uid);

  async function updateName () {
    console.log('Placeholder');
  }

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
            onClick={updateName}
          >
            Update
          </Button>
        </FlexBox>
    </Container>
  )
}

export default Settings;
