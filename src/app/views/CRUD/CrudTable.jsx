import React, { useState, useEffect } from 'react'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    Card,
} from '@mui/material'
import shortid from 'shortid'
import { styled } from '@mui/system'
import MemberEditorDialog from './MemberEditorDialog'
import { getAllUser, deleteUser } from './TableService'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-child': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-child': {
        paddingLeft: '16px !important',
    },
}))

const Status = styled('small')(({ theme }) => ({
    color: '#fff',
    padding: '2px 8px',
    overflow: 'hidden',
    borderRadius: '300px',
    boxShadow: themeShadows[3],
    background: theme.palette.primary.main,
}))

const CrudTable = () => {
    const [uid, setUid] = useState(null)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [user, setUser] = useState(null)
    const [userList, setUserList] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        updatePageData()
    }

    const handleDeleteUser = (user) => {
        setUser(user)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        deleteUser(user).then(() => {
            handleDialogClose()
        })
    }

    const updatePageData = () => {
        getAllUser().then(({ data }) => {
            setUserList(data)
        })
    }

    useEffect(() => {
        updatePageData()
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'CRUD Table' }]} />
            </div>

            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Member
            </Button>
            <Card sx={{ width: '100%', overflow: 'auto' }} elevation={6}>
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList
                            ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((user, index) => (
                                <TableRow hover key={shortid.generate()}>
                                    <TableCell sx={{ px: 0 }} align="left">
                                        {user.name}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} align="left">
                                        {user.age}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }}>
                                        ${user.balance}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} align="left">
                                        {user.company}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }}>
                                        {user.isActive ? (
                                            <Status>active</Status>
                                        ) : (
                                            <Status>inactive</Status>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }}>
                                        <IconButton
                                            onClick={() => {
                                                setUid(user.id)
                                                setShouldOpenEditorDialog(true)
                                            }}
                                        >
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteUser(user)
                                            }
                                        >
                                            <Icon color="error">delete</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </ProductTable>

                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userList?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={({ target: { value } }) =>
                        setRowsPerPage(value)
                    }
                />

                {shouldOpenEditorDialog && (
                    <MemberEditorDialog
                        handleClose={handleDialogClose}
                        open={shouldOpenEditorDialog}
                        uid={uid}
                    />
                )}
                {shouldOpenConfirmationDialog && (
                    <ConfirmationDialog
                        open={shouldOpenConfirmationDialog}
                        onConfirmDialogClose={handleDialogClose}
                        onYesClick={handleConfirmationResponse}
                        text="Are you sure to delete?"
                    />
                )}
            </Card>
        </Container>
    )
}

export default CrudTable
