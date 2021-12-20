import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import TodoList from './TodoList'
import TodoEditor from './TodoEditor'
import { Box, styled, useTheme } from '@mui/system'
import { Icon, TextField } from '@mui/material'

const AppTodoRoot = styled('div')(({ theme }) => ({
    '& .searchBoxHolder': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(220px - 94px + 30px)',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(220px - 94px -16px + 30px)',
        },
    },
    '& .searchBox': {
        width: 'calc(100% - 60px)',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 32px)',
        },
    },
    '& .todoContent': {
        marginTop: -94,
    },
}))

const AppTodo = () => {
    const [query, setQuery] = useState('')
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const { palette } = useTheme()
    const bgPrimary = palette.primary.main

    return (
        <AppTodoRoot>
            <Box height={220} sx={{ background: bgPrimary }}>
                <div className="searchBoxHolder">
                    <div className="searchBox">
                        <TextField
                            name="query"
                            value={query}
                            variant="outlined"
                            size="medium"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <Icon sx={{ mr: '12px' }}>search</Icon>
                                ),
                                style: {
                                    borderRadius: 300,
                                    background: 'white',
                                    outline: 'none',
                                },
                            }}
                            onChange={handleQueryChange}
                        />
                    </div>
                </div>
            </Box>
            <div className="todoContent">
                <Routes>
                    <Route
                        path="/todo/list/:id"
                        element={<TodoEditor />}
                    />
                    <Route
                        path="/todo/list"
                        element={<TodoList query={query} />}
                    />
                </Routes>
            </div>
        </AppTodoRoot>
    )
}

export default AppTodo
