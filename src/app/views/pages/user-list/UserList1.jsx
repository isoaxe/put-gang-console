import {
    Grid,
    Card,
    Avatar,
    IconButton,
    Divider,
    Button,
    LinearProgress,
} from '@mui/material'
import Axios from 'axios'
import { Twitter } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { Breadcrumb, FacebookIcon, GoogleIcon } from 'app/components'
import { Box, styled } from '@mui/system'
import { H5, Paragraph } from 'app/components/Typography'
import { convertHexToRGB } from 'utils'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'space-between',
}))

const StyledIonButton = styled(IconButton)(() => ({
    padding: '8px',
    '&:hover': {
        color: '#ffffff',
    },
    '& svg': { fontSize: '14px' },
}))

const GoogleButton = styled(StyledIonButton)(() => ({
    padding: '8px',
    color: '#ec412c',
    backgroundColor: 'rgba(236,65,44,.1)',
    borderColor: '#ec412c',
    '&:hover': {
        background: `#ec412c`,
        color: '#ffffff',
    },
}))

const FacebookButton = styled(StyledIonButton)(() => ({
    padding: '8px',
    color: '#3765c9',
    backgroundColor: 'rgba(55,101,201,.1)',
    borderColor: '#3765c9',
    '&:hover': {
        background: `#3765c9`,
        color: '#ffffff',
    },
}))

const TwitterButton = styled(StyledIonButton)(() => ({
    padding: '8px',
    color: '#039ff5',
    backgroundColor: 'rgba(3,159,245,.1)',
    borderColor: '#039ff5',
    '&:hover': {
        background: `#039ff5`,
        color: '#ffffff',
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    paddingLeft: '20px',
    paddingRight: '20px',
    transition: 'all 250ms',
    color: theme.palette.primary.main,
    background: `rgba(${convertHexToRGB(theme.palette.primary.main)}, 0.15)`,
    '&:hover': {
        color: '#ffffff',
        fallbacks: [{ color: 'white !important' }],
        background: `${theme.palette.primary.main} !important`,
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
}))

const StyledP = styled(Paragraph)(({ theme }) => ({
    color: theme.palette.text.secondary,
}))

const ContentBox = styled(Box)(() => ({
    padding: '20px',
    margin: '-8px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const UserList1 = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        Axios.get('/api/user/all').then(({ data }) => {
            if (isAlive) setUserList(data)
        })
        return () => setIsAlive(false)
    }, [isAlive])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pages', path: '/pages' },
                        { name: 'User List 1' },
                    ]}
                />
            </div>
            <Grid container spacing={3}>
                {userList.map((user, ind) => (
                    <Grid key={user.id} item sm={6} xs={12}>
                        <Card>
                            <JustifyBox p="20px" m={-1} flexWrap="wrap">
                                <FlexBox m={1}>
                                    <Avatar
                                        src={user.imgUrl}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box ml={2}>
                                        <H5>{user.name}</H5>
                                        <StyledP
                                            sx={{
                                                mt: 1,
                                                fontWeight: 'normal',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {user.company?.toLowerCase()}
                                        </StyledP>
                                    </Box>
                                </FlexBox>
                                <FlexBox m={1}>
                                    <GoogleButton>
                                        <GoogleIcon />
                                    </GoogleButton>
                                    <FacebookButton sx={{ mx: '4px' }}>
                                        <FacebookIcon />
                                    </FacebookButton>
                                    <TwitterButton>
                                        <Twitter />
                                    </TwitterButton>
                                </FlexBox>
                            </JustifyBox>
                            <Divider />
                            <ContentBox>
                                <Box m={1} mr={3} maxWidth={220} flexGrow={1}>
                                    <JustifyBox mb={1}>
                                        <StyledP sx={{ fontWeight: '500' }}>
                                            Progressbar
                                        </StyledP>
                                        <StyledP>40%</StyledP>
                                    </JustifyBox>
                                    <div>
                                        <LinearProgress
                                            color="primary"
                                            value={35}
                                            variant="determinate"
                                        />
                                    </div>
                                </Box>
                                <Box m={1} display="flex">
                                    <StyledButton
                                        size="small"
                                        sx={{ mr: '4px' }}
                                    >
                                        CHAT
                                    </StyledButton>
                                    <StyledButton size="small">
                                        PROFILE
                                    </StyledButton>
                                </Box>
                            </ContentBox>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default UserList1
