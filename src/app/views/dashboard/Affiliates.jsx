import MUIDataTable from 'mui-datatables'
import React, { useState, useEffect, useContext } from 'react'
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
    const [userList, setUserList] = useState([]);
    const { role, users } = useContext(DataContext);
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    useEffect(() => {
        if (users.length && ["admin", "level-1", "level-2"].includes(role)) {
            setUserList(users);
        }
    }, [users, role])

    const columns = [
        {
            name: 'name',
            label: 'Name',
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
            name: 'role',
            label: 'Role',
            options: {
                filter: true,
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
            name: 'joinDate',
            label: 'Join Date',
            options: {
                filter: false,
            },
        },
        {
            name: 'expiryDate',
            label: 'Expiry Date',
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
                        title={'Users'}
                        data={userList}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
                            resizableColumns: true,
                            onRowClick: (rowData, rowState) => {
                              const data = userList[rowState.rowIndex];
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
