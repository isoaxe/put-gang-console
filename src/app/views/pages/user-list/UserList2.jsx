import React, { useState, useEffect } from 'react'
import { Grid, Card, Avatar, Button } from '@mui/material'
import { Breadcrumb } from 'app/components'
import Axios from 'axios'
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

const UserList2 = () => {
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
                        { name: 'User List 2' },
                    ]}
                />
            </div>
            <Grid container spacing={3}>
                {userList.map((user, ind) => (
                    <Grid key={user.id} item sm={6} xs={12}>
                        <Card>
                            <JustifyBox p="24px" m={-1} flexWrap="wrap">
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
                            </JustifyBox>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default UserList2
