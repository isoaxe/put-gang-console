import ActivityListView from './ActivityListView'
import { debounce } from 'lodash'
import ListSearchbar from './ListSearchbar'
import { Hidden } from '@mui/material'
import DataContext from './../../contexts/DataContext';
import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'
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
    const { role, users, activities } = useContext(DataContext);

    // Form a statement for each activity based on data.
    function formatStatement (name, email, action, product) {
      let actionStatement, productStatement;
      if (action === "cancel") actionStatement = "cancelled their subscription to";
      if (action === "join") actionStatement = "joined";
      if (product === "join") productStatement = "Join the Discussion";
      if (product === "watch") productStatement = "Watch the Discussion";
      if (product === "news") productStatement = "your newsletter";
      if (action === "join" && product === "news") {
        actionStatement = "signed up to";
      }
      return `${name ? name : email} ${actionStatement} ${productStatement}.`
    }

    const formatActivityData = useCallback(
      () => {
        const combinedactivities = [];
        for (let i = 0; i < activities.length; i++) {
          const currentActivity = activities[i];
          const currentUser = users.find(user => user.uid === currentActivity.uid);
          currentActivity["name"] = currentUser.name;
          currentActivity["avatarUrl"] = currentUser.avatarUrl;
          combinedactivities.push(currentActivity);
        }
        combinedactivities.forEach(item => item["statement"] = formatStatement(
          item.name,
          item.email,
          item.action,
          item.product
        ));
        setOriginalList(combinedactivities);
        setList(combinedactivities);
      }, [users, activities]
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
        if (users.length && activities.length && ["admin", "level-1", "level-2"].includes(role)) {
            formatActivityData();
        }
    }, [users, activities, role, formatActivityData])

    return (
        <Container className="list">
            <Box mb={2}>
                <ListSearchbar handleInputChange={handleInputChange}>
                </ListSearchbar>
            </Box>
            <Hidden xsDown>
                <ActivityListView list={list}></ActivityListView>
            </Hidden>
        </Container>
    )
}

export default ActivityList
