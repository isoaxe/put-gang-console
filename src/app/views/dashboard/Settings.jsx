import React, { useState } from 'react';
import { styled, useTheme } from '@mui/system';
import { TextField } from '@mui/material';
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
    justifyContent: 'space-between',
    marginBottom: '24px',
}))

const Settings = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const uid = useAuth().user.id;

  return (
    <Container>
      <H3 sx={{ marginBottom: "2rem" }}>Settings</H3>
        <H5 sx={{ marginBottom: "10px", color: textMuted }}>
          Current Name:
        </H5>
        <TextField label="Name" />
    </Container>
  )
}

export default Settings;
