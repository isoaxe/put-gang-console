import MUIDataTable from 'mui-datatables'
import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Person } from '@mui/icons-material';
import { Box, styled, useTheme } from '@mui/system'
import DataContext from './../../contexts/DataContext';
import { H5, Small } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const CustomerList = () => {
    const [userList, setUserList] = useState([])
    const { role, users } = useContext(DataContext);
    const msSinceEpoch = Date.now();

    function userStatus (expiry) {
      const msSinceEpochToExpiry = new Date(expiry).getTime();
      if (msSinceEpoch < msSinceEpochToExpiry) {
        return <Person color="success" />;
      // Turn red if user expired in the past week.
      } else if (msSinceEpoch - msSinceEpochToExpiry < 604800000) {
        return <Person color="error" />;
      } else if (msSinceEpoch > msSinceEpochToExpiry) {
        return <Person color="disabled" />;
      } else {
        return <Person color="info" />;
      }
    }

    // Converts an ISO string to DD/MM/YYYY string.
    function formatDate (date) {
      if (date) return new Date(date).toLocaleString().slice(0, 10);
      return "No expiry"
    }

    useEffect(() => {
        if (users.length && ["admin", "level-1", "level-2"].includes(role)) {
            setUserList(users);
        }
    }, [users, role])
    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    const columns = [
        {
            name: 'name', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex]

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
            name: 'status',
            label: 'Status',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex];

                    return (
                        userStatus(user.expiryDate)
                    );
                },
            },
        },
        {
            name: 'membLvl',
            label: 'Membership Level',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex];

                    if (user.membLvl === "watch") {
                        return "Watch the Discussion";
                    } else if (user.membLvl === "join") {
                        return "Join the Discussion";
                    } else {
                        return "Not a Member";
                    }
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
            name: 'joinDate',
            label: 'Join Date',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex];

                    return (
                        formatDate(user.joinDate)
                    );
                },
            },
        },
        {
            name: 'expiryDate',
            label: 'Expiry Date',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex];

                    return (
                        formatDate(user.expiryDate)
                    );
                },
            },
        },
    ]

    return (
        <Container>
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'Users'}
                        data={userList}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
                            resizableColumns: true,
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

export default CustomerList
