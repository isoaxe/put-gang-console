import MUIDataTable from 'mui-datatables'
import React, { useContext } from 'react'
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
    const { allStats } = useContext(DataContext);
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

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
            name: 'membLvl',
            label: 'Membership Level',
            options: {
                filter: true,
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
