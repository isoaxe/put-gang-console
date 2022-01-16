import {
    Card,
    Avatar,
    Grid,
} from '@mui/material'
import React from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { Small, Span, Paragraph } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import {
  AddTask,
  HighlightOff
} from '@mui/icons-material';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    height: 75,
    width: 100,
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

function actionImage (action) {
  if (action === "join") return <AddTask color="success" />;
  if (action === "cancel") return <HighlightOff color="error" />;
}

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
                                {actionImage(item.action)}
                                <Box ml={2}>
                                    <Paragraph sx={{ mb: 1 }}>
                                        {item.statement}
                                    </Paragraph>
                                    <Box display="flex">
                                        <Small sx={{ color: textMuted }}>
                                            {new Date(item.date).toLocaleString()}
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
