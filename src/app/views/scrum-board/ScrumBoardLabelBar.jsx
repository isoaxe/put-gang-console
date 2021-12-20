import React from 'react'
import { styled, useTheme } from '@mui/system'

const BoardLabe = styled('div')(() => ({
    width: '32px',
    height: '6px',
    borderRadius: '6px',
    overflow: 'hidden',
    marginRight: '8px',
}))

const ScrumBoardLabelBar = ({ color = 'primary' }) => {
    const { palette } = useTheme()
    const bgPrimary = palette.primary.main

    return <BoardLabe sx={{ background: bgPrimary }} />
}

export default ScrumBoardLabelBar
