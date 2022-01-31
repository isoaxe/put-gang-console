import MUIDataTable from 'mui-datatables'
import React from 'react'
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H5 } from 'app/components/Typography'
import useAuth from './../../hooks/useAuth';
import { LANDING_URL } from './../../utils/constants';

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

const Links = () => {
    const uid = useAuth().user.id;

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
                customBodyRenderLite: (index) => {
                    let itemData = data[index];

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48 }}
                                src={itemData?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>{itemData?.name}</H5>
                            </Box>
                        </FlexBox>
                    )
                },
            },
        },
        {
            name: 'url',
            label: 'URL',
            options: {
                filter: true,
            },
        },
        {
            name: 'copy',
            label: 'Clipboard',
            options: {
                filter: false,
            },
        },
    ]

    const data = [
      {
        name: "Site",
        url: `${LANDING_URL}refId=${uid}`,
        copy: "copy link button"
      },
      {
        name: "Watch the Discussion",
        url: LANDING_URL,
        copy: "copy link button"
      },
      {
        name: "Join the Discussion",
        url: LANDING_URL,
        copy: "copy link button"
      },
    ]

    return (
        <Container>
            <Box overflow="auto">
                <Box minWidth={500}>
                    <MUIDataTable
                        title={'Links'}
                        data={data}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
                            resizableColumns: false,
                            selectableRows: "none",
                            search: false,
                            filter: false,
                            sort: false,
                            download: false,
                            print: false,
                            pagination: false,
                            viewColumns: false,
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

export default Links;
