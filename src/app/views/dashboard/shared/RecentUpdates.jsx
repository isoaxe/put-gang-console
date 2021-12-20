import React from 'react'
import { useTheme } from '@mui/system'
import { Timeline } from '@mui/lab'
import RecentUpdateCard from './RecentUpdateCard'
import { Card, useMediaQuery } from '@mui/material'

const RecentUpdates = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <Card
            elevation={3}
            sx={{ mx: 'auto', maxWidth: 900, p: !isMobile && 5 }}
        >
            <Timeline align="left">
                {updateList.map((notification, ind) => (
                    <RecentUpdateCard
                        notification={notification}
                        isLastIndex={ind === updateList.length - 1}
                        isFirstIndex={ind === 0}
                        key={ind}
                    />
                ))}
            </Timeline>
        </Card>
    )
}

const updateList = [
    {
        title: 'What is Lorem Ipsum?',
        subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        timestamp: '2020/09/15',
    },
    {
        title: 'Why do we use it?',
        subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        timestamp: '2020/08/1',
    },
    {
        title: 'Where can I get some?',
        subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        timestamp: '2020/07/05',
    },
    {
        title: 'Where does it come from?',
        subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        timestamp: '2020/05/12',
    },
]
export default RecentUpdates
