import React from 'react'
import Chart from 'react-apexcharts'
import { Card, IconButton, Icon } from '@mui/material'
import { Span, H5, Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'

const CardHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '24px',
    justifyContent: 'space-between',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const GaugeProgressCard = () => {
    const theme = useTheme()
    const options = {
        chart: {
            // offsetX: 60,
            // offsetY: -20,
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -120,
                endAngle: 120,
                offsetY: 0,
                hollow: {
                    margin: 0,
                    size: '68%',
                },
                dataLabels: {
                    showOn: 'always',
                    name: {
                        show: false,
                    },
                    value: {
                        color: theme.palette.text.primary,
                        fontSize: '24px',
                        fontWeight: '600',
                        // offsetY: -40,
                        offsetY: 38,
                        show: true,
                        formatter: (val, opt) => {
                            return val * 10 + 'K'
                        },
                    },
                },
                track: {
                    background: '#eee',
                    strokeWidth: '100%',
                },
            },
        },
        colors: [theme.palette.primary.main, '#eee'],
        stroke: {
            lineCap: 'round',
        },
        responsive: [
            {
                breakpoint: 767,
                options: {
                    chart: {
                        offsetX: 0,
                        offsetY: 0,
                    },
                },
            },
        ],
    }

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <Card sx={{ height: '100%' }} elevation={3}>
            <CardHeader>
                <Span sx={{ fontWeight: '500', color: textMuted }}>
                    STATISTICS
                </Span>
                <IconButton size="small">
                    <Icon>more_horiz</Icon>
                </IconButton>
            </CardHeader>
            <Box position="relative">
                <Chart
                    options={options}
                    series={[84.2]}
                    type="radialBar"
                    height={200}
                />
                <Icon
                    sx={{
                        fontSize: '36px',
                        position: 'absolute',
                        top: 'calc(50% - 24px)',
                        left: 'calc(50% - 18px)',
                        color: textMuted,
                    }}
                >
                    people
                </Icon>
            </Box>
            <H5
                sx={{
                    mb: 1,
                    textAlign: 'center',
                    fontWeight: '500'
                }}
            >
                Awesome
            </H5>
            <Paragraph
                sx={{
                    m: 0,
                    textAlign: 'center',
                    color: textMuted
                }}
            >
                Close to reach 1000k folowers!
            </Paragraph>
        </Card>
    )
}

export default GaugeProgressCard
