import {
    Icon,
    Divider,
    Button,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import React from 'react'
import InboxComposeDialog from './InboxComposeDialog'
import { styled } from '@mui/system'

const Container = styled('div')(({ theme }) => ({
    marginRight: '16px',
    background: theme.palette.background.default,
}))

const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    color: '#fff',
    paddingTop: '8px',
    paddingBottom: '8px',
    background: theme.palette.error.main,
}))

const InboxSidenav = () => {
    const [open, setOpen] = React.useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Container>
            <StyledButton variant="contained" onClick={() => setOpen(true)}>
                Compose
            </StyledButton>
            <ListItem button>
                <ListItemIcon>
                    <Icon>inbox</Icon>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon>folder_special</Icon>
                </ListItemIcon>
                <ListItemText primary="Starred" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon>send</Icon>
                </ListItemIcon>
                <ListItemText primary="Sent" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon>inbox</Icon>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon>error</Icon>
                </ListItemIcon>
                <ListItemText primary="Spam" />
            </ListItem>

            <Divider />

            <ListItem button>
                <ListItemIcon>
                    <Icon color="primary">people</Icon>
                </ListItemIcon>
                <ListItemText primary="Social" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon color="secondary">local_offer</Icon>
                </ListItemIcon>
                <ListItemText primary="Promotions" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon color="secondary">forums</Icon>
                </ListItemIcon>
                <ListItemText primary="Forums" />
            </ListItem>

            <InboxComposeDialog open={open} handleClose={handleClose} />
        </Container>
    )
}

export default InboxSidenav
