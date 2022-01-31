import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Avatar, Grow, Icon, IconButton, TextField, Snackbar } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { Box, styled } from '@mui/system';
import { H5 } from 'app/components/Typography';
import useAuth from './../../hooks/useAuth';
import { LANDING_URL, CONSOLE_URL } from './../../utils/constants';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .MuiSvgIcon-root': {
        cursor: 'pointer',
    },
}))

const Links = () => {
    const [msgOpen, setMsgOpen] = useState(false);
    const uid = useAuth().user.id;

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
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
        },
        {
            name: 'copy',
            label: 'Clipboard',
            options: {
                customBodyRenderLite: (index) => {
                  let itemData = data[index];
                  return copyToClip(itemData.url);
                }
            },
        },
    ]

    const data = [
      {
        name: "Site",
        url: `${LANDING_URL}/?refId=${uid}`,
      },
      {
        name: "Watch the Discussion",
        url: `${CONSOLE_URL}/session/signup?refId=${uid}&membLvl=watch`,
      },
      {
        name: "Join the Discussion",
        url: `${CONSOLE_URL}/session/signup?refId=${uid}&membLvl=join`,
      },
    ]

    function copyToClip (text) {
      return (
        <CopyToClipboard text={text} onCopy={() => setMsgOpen(true)}>
          <ContentCopy color="action" />
        </CopyToClipboard>
      )
    }

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
            <Snackbar
              open={msgOpen}
              onClose={() => setMsgOpen(false)}
              autoHideDuration={3000}
              message="Link copied to clipboard!"
            />
        </Container>
    )
}

export default Links;
