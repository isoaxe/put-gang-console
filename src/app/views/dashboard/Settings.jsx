import React, { useState } from 'react';
import { styled } from '@mui/system';
import { H5 } from 'app/components/Typography';
import useAuth from './../../hooks/useAuth';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Settings = () => {
    const uid = useAuth().user.id;

    return (
        <Container>
          <button/>
        </Container>
    )
}

export default Settings;
