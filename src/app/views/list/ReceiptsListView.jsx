import {
    Card,
    Grid,
} from '@mui/material'
import React from 'react'
import ScrollBar from 'react-perfect-scrollbar';
import { Box, styled, useTheme } from '@mui/system'
import { Small, Paragraph } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import {
  AddTask,
  HighlightOff,
  MonetizationOn
} from '@mui/icons-material';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
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

const StyledScrollBar = styled(ScrollBar)(() => ({
    maxHeight: '70vh',
}))

function actionImage (action) {
  if (action === "join") return <AddTask color="success" />;
  if (action === "cancel") return <HighlightOff color="error" />;
  if (action === "payment") return <MonetizationOn color="success" />;
}

const ReceiptsListView = (props) => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;
    const receipts = props.receipts;

    return (
        <StyledScrollBar>
            {receipts.map((item, index) => (
                <ListCard
                    key={item.id}
                    elevation={3}
                    sx={{ mb: index < receipts.length && 2 }}
                >
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item md={10}>
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
                    </Grid>
                </ListCard>
            ))}
        </StyledScrollBar>
    )
}

export default ReceiptsListView
