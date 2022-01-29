import MUIDataTable from 'mui-datatables'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import DataContext from './../../contexts/DataContext';
import { userStatus } from './../../utils/helpers';
import { H5, Small } from 'app/components/Typography'
import useAuth from './../../hooks/useAuth';

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
    const uid = useAuth().user.id;
    let navigate = useNavigate();

    // Add some user data to allStats to produce affiliateData.
    const combineData = useCallback(
      () => {
        const reducedStats = allStats.filter(stat => stat.uid !== uid); // Remove self.
        const combined = [];
        for (let i = 0; i < reducedStats.length; i++) {
          const currentStat = reducedStats[i];
          const currentUser = users.find(user => user.uid === currentStat.uid);
          currentStat["role"] = currentUser.role;
          currentStat["name"] = currentUser.name;
          currentStat["expiryDate"] = currentUser.expiryDate;
          combined.push(currentStat);
        }
        setAffiliateData(combined);
      },
      [uid, users, allStats]
    );

    // Return number as string with leading '$' and two decimal places if not integer.
    function numToCurrency (num) {
      const hasDecimal = String(num).indexOf(".") !== -1;
      return hasDecimal ? `$${num.toFixed(2)}` : `$${num}`;
    }

    useEffect(() => {
      if (users.length && allStats.length) {
        combineData();
      }
    }, [users, allStats, combineData]);

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
                customBodyRenderLite: (index) => {
                    let userData = affiliateData[index]; // Data for one user.

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48, border: '2px solid ' + userStatus(userData?.expiryDate) }}
                                src={userData?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>{userData?.name}</H5>
                                <Small sx={{ color: textMuted }}>
                                    {userData?.email}
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
                filter: false,
                customBodyRenderLite: (index) => {
                    return numToCurrency(affiliateData[index]?.paid);
                },
            },
        },
        {
            name: 'unpaid',
            label: 'Unpaid',
            options: {
                filter: false,
                customBodyRenderLite: (index) => {
                    return numToCurrency(affiliateData[index]?.unpaid);
                },
            },
        },
        {
            name: 'revenue',
            label: 'Revenue',
            options: {
                filter: false,
                customBodyRenderLite: (index) => {
                    return numToCurrency(affiliateData[index]?.revenue);
                },
            },
        },
        {
            name: 'mrr',
            label: 'MRR',
            options: {
                filter: false,
                customBodyRenderLite: (index) => {
                    return numToCurrency(affiliateData[index]?.mrr);
                },
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
                        data={affiliateData}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
                            resizableColumns: true,
                            onRowClick: (rowData, rowState) => {
                              const data = allStats[rowState.rowIndex];
                              navigate("/dashboard/affiliate", { state: { uid: data.uid } });
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
