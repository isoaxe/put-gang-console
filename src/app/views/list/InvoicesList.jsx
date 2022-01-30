import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { Hidden } from '@mui/material';
import { Box, styled } from '@mui/system';
import { debounce } from 'lodash';
import InvoicesListView from './InvoicesListView';
import ListSearchbar from './ListSearchbar';
import DataContext from './../../contexts/DataContext';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const InvoicesList = (props) => {
    const [originalList, setOriginalList] = useState([])
    const [list, setList] = useState([])
    const { role } = useContext(DataContext);
    const invoices = props.invoices;

    // Form a statement for each activity based on data.
    function formatStatement (name, email, sale, product) {
      let productStatement;
      if (product === "join") productStatement = "Join the Discussion";
      if (product === "watch") productStatement = "Watch the Discussion";
      return `${name ? name : email} made a $${sale} payment for ${productStatement}.`
    }

    const formatActivityData = useCallback(
      () => {
        invoices.forEach(item => item["statement"] = formatStatement(
          item.name,
          item.email,
          item.action,
          item.product
        ));
        setOriginalList(invoices);
        setList(invoices);
      }, [invoices]
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
        if (invoices && ["admin", "level-1", "level-2"].includes(role)) {
            formatActivityData();
        }
    }, [invoices, role, formatActivityData])

    return (
        <Container className="list">
            <Box mb={2}>
                <ListSearchbar handleInputChange={handleInputChange}>
                </ListSearchbar>
            </Box>
            <Hidden xsDown>
                <InvoicesListView list={list}></InvoicesListView>
            </Hidden>
        </Container>
    )
}

export default InvoicesList;
