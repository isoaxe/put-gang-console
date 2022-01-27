import React, { useState, useContext, useEffect } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import DataContext from './../../../contexts/DataContext';
import useAuth from './../../../hooks/useAuth';
import { Grid, Card, IconButton, Icon } from '@mui/material'

const StatCard3 = () => {
    const [userStats, setUserStats] = useState({});
    const { allStats, role } = useContext(DataContext);
    const { user } = useAuth();
    const uid = user.id;
    let [revenue, sales, mrr, paid, unpaid, totalMrr, totalRevenue] = Array(7).fill(0);
    if (userStats && Object.keys(userStats).length) {
      ({ revenue, sales, mrr, paid, unpaid, totalMrr, totalRevenue } = userStats);
    }
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;
    let statList = [
        {
            icon: 'attach_money',
            amount: '$' + revenue,
            title: 'Revenue',
        },
        {
            icon: 'bar_chart',
            amount: sales,
            title: 'Sales',
        },
        {
            icon: 'price_check',
            amount: '$' + paid,
            title: 'Paid',
        },
        {
            icon: 'money_off',
            amount: '$' + unpaid,
            title: 'Unpaid',
        },
        {
            icon: 'ballot',
            amount: '$' + mrr,
            title: 'MRR',
        },
    ]
    const additionalStats = [
        {
            icon: 'attach_money',
            amount: '$' + totalRevenue,
            title: 'Total Revenue',
        },
        {
            icon: 'ballot',
            amount: '$' + totalMrr,
            title: 'Total MRR',
        },
    ]
    if (role === "admin") {
      statList =  statList.concat(additionalStats);
    }

    useEffect(() => {
      if (allStats.length) {
        setUserStats(allStats.find(userData => userData.uid === uid));
      }
    }, [allStats, uid]);

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
                    <Grid key={item.title} item md={3} sm={6} xs={12}>
                        <Card elevation={3} sx={{ p: '20px', display: 'flex' }}>
                            <div>
                                <IconButton
                                    size="small"
                                    sx={{
                                        padding: '8px',
                                        background: 'rgba(0, 0, 0, 0.01)',
                                    }}
                                >
                                    <Icon sx={{ color: textMuted }}>
                                        {item.icon}
                                    </Icon>
                                </IconButton>
                            </div>
                            <Box ml={2}>
                                <H3 sx={{ mt: '-4px', fontSize: '32px' }}>
                                    {item.amount}
                                </H3>
                                <Paragraph sx={{ m: 0, color: textMuted }}>
                                    {item.title}
                                </Paragraph>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default StatCard3
