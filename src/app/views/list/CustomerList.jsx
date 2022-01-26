import MUIDataTable from 'mui-datatables'
import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import DataContext from './../../contexts/DataContext';
import ReceiptsModal from './../modal/ReceiptsModal';
import { H5, Paragraph, Small } from 'app/components/Typography'
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
}))

const CustomerList = () => {
    const [userList, setUserList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [receipts, setReceipts] = useState([]);
    const { role, users } = useContext(DataContext);
    const msSinceEpoch = Date.now();
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    // Check if user subscription has lapsed and if long ago.
    function userStatus (expiry) {
      const msSinceEpochToExpiry = new Date(expiry).getTime();
      if (msSinceEpoch < msSinceEpochToExpiry) {
        return "green";
      // Turn red if user expired in the past week.
      } else if (msSinceEpoch - msSinceEpochToExpiry < 604800000) {
        return "red";
      } else if (msSinceEpoch > msSinceEpochToExpiry) {
        return "grey";
      } else {
        return "blue";
      }
    }

    // Converts an ISO string to DD/MM/YYYY local string.
    function formatDate (date) {
      if (date) return new Date(date).toLocaleString().slice(0, 10);
      return "No expiry"
    }

    // Converts an ISO string to HH:MM:SS local string.
    function formatTime (date) {
      if (date) return new Date(date).toLocaleString().slice(11);
    }

    useEffect(() => {
        if (users.length && ["admin", "level-1", "level-2"].includes(role)) {
            setUserList(users);
        }
    }, [users, role])

    const columns = [
        {
            name: 'name', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: false,
                hint: 'Paid users in green. Recently unpaid in red. Long time unpaid in grey.',
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex]

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48, border: '2px solid ' + userStatus(user.expiryDate) }}
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
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex];

                    return (
                        <Box>
                            <Paragraph>{formatDate(user.joinDate)}</Paragraph>
                            <Small sx={{ color: textMuted }}>
                                {formatTime(user.joinDate)}
                            </Small>
                        </Box>
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
                        <Box>
                            <Paragraph>{formatDate(user.expiryDate)}</Paragraph>
                            <Small sx={{ color: textMuted }}>
                                {formatTime(user.expiryDate)}
                            </Small>
                        </Box>
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
            <ReceiptsModal
                visible={visible}
                setVisible={setVisible}
                receipts={receipts}
            />
        </Container>
    )
}

export default CustomerList
