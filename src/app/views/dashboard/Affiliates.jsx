import MUIDataTable from 'mui-datatables'
import React, { useState, useContext } from 'react'
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import DataContext from './../../contexts/DataContext';
import { H5, Small } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .MuiTableBody-root': {
        cursor: 'pointer',
    },
}))

const Affiliates = () => {
    const [ affiliateData, setAffiliateData ] = useState([]);
    const { users, allStats } = useContext(DataContext);
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    // Add some user data to allStats to produce affiliateData.
    function combineData () {
      const combined = [];
      for (let i = 0; i < allStats.length; i++) {
        const currentStat = allStats[i];
        const currentUser = users.find(user => user.uid === currentStat.uid);
        currentStat["role"] = currentUser.role;
        currentStat["name"] = currentUser.name;
        combined.push(currentStat);
      }
      setAffiliateData(combined);
    }

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    let user = allStats[dataIndex]

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48 }}
                                src={user?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>{user?.name}</H5>
                                <Small sx={{ color: textMuted }}>
                                    {user?.email}
                                </Small>
                            </Box>
                        </FlexBox>
                    )
                },
            },
        },
        {
            name: 'role',
            label: 'Role',
            options: {
                filter: true,
            },
        },
        {
            name: 'paid',
            label: 'Paid',
            options: {
                filter: true,
            },
        },
        {
            name: 'unpaid',
            label: 'Unpaid',
            options: {
                filter: false,
            },
        },
        {
            name: 'revenue',
            label: 'Revenue',
            options: {
                filter: false,
            },
        },
        {
            name: 'mrr',
            label: 'MRR',
            options: {
                filter: false,
            },
        },
        {
            name: 'sales',
            label: 'Sales',
            options: {
                filter: false,
            },
        },
    ]

    return (
        <Container>
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'Affiliates'}
                        data={allStats}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
                            resizableColumns: true,
                            onRowClick: (rowData, rowState) => {
                              const data = allStats[rowState.rowIndex];
                              console.log(`user ${data.uid} clicked`);
                            },
                            // selectableRows: "none", // set checkbox for each row
                            // search: false, // set search option
                            // filter: false, // set data filter option
                            // download: false, // set download option
                            // print: false, // set print option
                            // pagination: true, // set pagination option
                            // viewColumns: false, // set column option
                            elevation: 1,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                            customSearchRender: (
                                searchText,
                                handleSearch,
                                hideSearch,
                                options
                            ) => {
                                return (
                                    <Grow appear in={true} timeout={300}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={({ target: { value } }) =>
                                                handleSearch(value)
                                            }
                                            InputProps={{
                                                style: {
                                                    paddingRight: 0,
                                                },
                                                startAdornment: (
                                                    <Icon
                                                        fontSize="small"
                                                        sx={{ mr: 1 }}
                                                    >
                                                        search
                                                    </Icon>
                                                ),
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={hideSearch}
                                                    >
                                                        <Icon fontSize="small">
                                                            clear
                                                        </Icon>
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grow>
                                )
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    )
}

export default Affiliates;
