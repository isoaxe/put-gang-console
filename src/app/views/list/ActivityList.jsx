import ListView from './ListView'
import { debounce } from 'lodash'
import ListSearchbar from './ListSearchbar'
import { Hidden } from '@mui/material'
import { getAllList } from './ListService'
import React, { useState, useMemo, useEffect } from 'react'
import { Box, styled } from '@mui/system'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const ActivityList = () => {
    const [originalList, setOriginalList] = useState([])
    const [list, setList] = useState([])

    const handleInputChange = (event) => {
        let { value } = event.target
        search(value)
    }

    const search = useMemo(
        () =>
            debounce((query) => {
                let tempList = originalList.filter((item) =>
                    item.projectName.toLowerCase().match(query.toLowerCase())
                )
                setList([...tempList])
            }, 200),
        [originalList]
    )

    useEffect(() => {
        getAllList().then((response) => {
            setOriginalList(response.data)
            setList(response.data)
        })
    }, [])

    return (
        <Container className="list">
            <Box mb={2}>
                <ListSearchbar handleInputChange={handleInputChange}>
                </ListSearchbar>
            </Box>
            <Hidden xsDown>
                <ListView list={list}></ListView>
            </Hidden>
        </Container>
    )
}

export default ActivityList
