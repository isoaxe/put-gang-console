import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { Hidden } from '@mui/material';
import { Box, styled } from '@mui/system';
import { debounce } from 'lodash';
import { capitalize } from './../../utils/helpers';
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
    const { role, users } = useContext(DataContext);
    const invoices = props.invoices;

    // Form a statement for each invoice based on data.
    function formatStatement (name, email, sale, product) {
      return `${name ? name : email} made a $${sale} payment for ${capitalize(product)} the Discussion.`
    }

    const formatInvoicesData = useCallback(
      () => {
        const combinedInvoices = [];
        for (let i = 0; i < invoices.length; i++) {
          const currentInvoice = invoices[i];
          const currentUser = users.find(user => user.uid === currentInvoice.uid);
          currentInvoice["name"] = currentUser.name;
          currentInvoice["avatarUrl"] = currentUser.avatarUrl;
          combinedInvoices.push(currentInvoice);
        }
        combinedInvoices.forEach(item => item["statement"] = formatStatement(
          item.name,
          item.email,
          item.sale,
          item.product
        ));
        setOriginalList(combinedInvoices);
        setList(combinedInvoices);
      }, [users, invoices]
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
        if (users.length && invoices.length && ["admin", "level-1", "level-2"].includes(role)) {
            formatInvoicesData();
        }
    }, [users, invoices, role, formatInvoicesData])

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
