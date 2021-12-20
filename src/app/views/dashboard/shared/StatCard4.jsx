import React from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'

const StyledCard = styled(Card)(() => ({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StatCard4 = () => {
    const statList = [
        {
            icon: 'colorize',
            amount: 48,
            title: 'New Posts',
        },
        {
            icon: 'attachment',
            amount: 291,
            title: 'Attached Files',
        },
        {
            icon: 'mode_comment',
            amount: 291,
            title: 'Comments',
        },
        {
            icon: 'remove_red_eye',
            amount: 110,
            title: 'Total Views',
        },
    ]

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
                    <Grid key={item.title} item md={6} xs={12}>
                        <StyledCard elevation={3}>
                            <Box mb="6px">
                                <IconButton
                                    sx={{
                                        padding: '12px',
                                        background: 'rgba(0, 0, 0, 0.01)'
                                    }}
                                >
                                    <Icon sx={{ color: textMuted }}>
                                        {item.icon}
                                    </Icon>
                                </IconButton>
                            </Box>

                            <H3 sx={{ mt: '4px', fontSize: '32px' }}>
                                {item.amount.toLocaleString()}
                            </H3>
                            <Paragraph sx={{ m: 0, color: textMuted }}>
                                {item.title}
                            </Paragraph>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default StatCard4
