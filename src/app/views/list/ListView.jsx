import {
    Card,
    Icon,
    Avatar,
    MenuItem,
    IconButton,
    Grid,
    Hidden,
} from '@mui/material'
import React from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { MatxMenu } from 'app/components'
import { Small, Span, Paragraph } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const StyledItem = styled(MenuItem)(() => ({
    display: 'flex',
    alignItems: 'center',
    '& .icon': { marginRight: 2 },
}))

const IMG = styled('img')(() => ({
    width: '100%',
    height: 75,
    width: 100,
}))

const StyledIcon = styled(Icon)(({ theme }) => ({
    cursor: 'pointer',
    marginRight: '16px',
    color: theme.palette.text.secondary,
}))

const ListCard = styled(Card)(({ theme }) => ({
    padding: '8px',
    position: 'relative',
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[12],
    '& .card__button-group': {
        display: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
        background: theme.palette.background.paper,
    },
    '&:hover': {
        '& .card__button-group': {
            display: 'flex',
            alignItems: 'center',
        },
    },
}))

const ListView = ({ list = [] }) => {
    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            {list.map((item, index) => (
                <ListCard
                    key={item.id}
                    elevation={3}
                    sx={{ mb: index < list.length && 2 }}
                >
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item md={6}>
                            <FlexBox>
                                <IMG src={item.projectImage} alt="project" />
                                <Box ml={2}>
                                    <Paragraph sx={{ mb: 1 }}>
                                        {item.projectName}
                                    </Paragraph>
                                    <Box display="flex">
                                        <Small sx={{ color: textMuted }}>
                                            {item.date}
                                        </Small>
                                        <Small sx={{ ml: 3, color: textMuted }}>
                                            {item.email}
                                        </Small>
                                    </Box>
                                </Box>
                            </FlexBox>
                        </Grid>
                        <Grid item md={2}>
                            <FlexBox>
                                <Avatar src={item.userImage}></Avatar>
                                <Span sx={{ ml: '16px' }}>{item.userName}</Span>
                            </FlexBox>
                        </Grid>
                    </Grid>
                </ListCard>
            ))}
        </div>
    )
}

export default ListView
