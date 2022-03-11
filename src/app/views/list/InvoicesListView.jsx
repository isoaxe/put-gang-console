import React from 'react';
import { Card, Avatar, Grid } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MonetizationOn } from '@mui/icons-material';
import { numToCurrency } from './../../utils/helpers';
import { Small, Paragraph } from 'app/components/Typography';
import { themeShadows } from 'app/components/MatxTheme/themeColors';


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

function statusImage (paid) {
  if (paid) {
    return <MonetizationOn color="success" />;
  } else {
    return <MonetizationOn color="error" />;
  }
}

const InvoicesListView = ({ list = [] }) => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    return (
        <div>
            {list.map((item, index) => (
                <ListCard
                    key={item.id}
                    elevation={3}
                    sx={{ mb: index < list.length && 2 }}
                >
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item md={7}>
                            <FlexBox>
                                {statusImage(item.paid)}
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
                        <Grid item md={4}>
                            <Paragraph sx={{ fontWeight: 'bold' }}>
                                {item.paid ? 'Paid' : 'Unpaid'} commission of {numToCurrency(item.commission)}.
                            </Paragraph>
                        </Grid>
                        <Grid item md={0}>
                            <FlexBox>
                                <Avatar src={item.avatarUrl}></Avatar>
                            </FlexBox>
                        </Grid>
                    </Grid>
                </ListCard>
            ))}
        </div>
    )
}

export default InvoicesListView;
