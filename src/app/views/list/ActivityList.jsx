import ListView from './ListView'
import { debounce } from 'lodash'
import ListSearchbar from './ListSearchbar'
import { Hidden } from '@mui/material'
import { getAllList } from './ListService'
import { objectToArray } from './../../utils/helpers';
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Box, styled } from '@mui/system'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const ActivityList = (props) => {
    const [originalList, setOriginalList] = useState([])
    const [list, setList] = useState([])
    const activities = props.activities;

    // Form a statement for each activity based on data.
    function formatStatement (name, email, action, product) {
      let actionStatement, productStatement;
      if (action === "cancel") actionStatement = "cancelled their subscription to";
      if (action === "join") actionStatement = "joined";
      if (product === "join") productStatement = "Join the Discussion";
      if (product === "watch") productStatement = "Watch the Discussion";
      if (action === "join" && product === "news") {
        actionStatement = "signed up to your";
        productStatement = "newsletter";
      }
      return `${name ? name : email} ${actionStatement} ${productStatement}.`
    }

    const formatActivityData = useCallback(
      () => {
        const activityArray = objectToArray(activities);
        activityArray.forEach(item => item["statement"] = formatStatement(
          item.name,
          item.email,
          item.action,
          item.product
        ));
        activityArray.reverse();
        setOriginalList(activityArray);
        setList(activityArray);
        console.log(activityArray);
      }, [activities]
    );

    const handleInputChange = (event) => {
        let { value } = event.target
        search(value)
    }

    const search = useMemo(
        () =>
            debounce((query) => {
                let tempList = originalList.filter((item) =>
                    item.statement.toLowerCase().match(query.toLowerCase())
                )
                setList([...tempList])
            }, 200),
        [originalList]
    )

    useEffect(() => {
        formatActivityData();
    }, [formatActivityData])

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
