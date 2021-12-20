import Axios from 'axios'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { Paragraph } from 'app/components/Typography'
import { styled } from '@mui/system'

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

const ExpandableMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        Axios.get('/api/user/all').then(({ data }) => {
            if (isAlive) setUserList(data)
        })
        return () => setIsAlive(false)
    }, [isAlive])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Data Table', path: '/pages' },
                        { name: 'Expandable Mui Table' },
                    ]}
                />
            </div>
            <MUIDataTable
                title={'User Report'}
                data={userList}
                columns={columns}
                options={{
                    filter: true,
                    filterType: 'textField',
                    responsive: 'simple',
                    expandableRowsHeader: false,
                    expandableRows: true, // set rows expandable
                    expandableRowsOnClick: true,
                    selectableRows: false,
                    renderExpandableRow: (rowData, { dataIndex }) => {
                        const colSpan = rowData.length + 1
                        console.log(rowData)
                        return (
                            <TableRow>
                                <TableCell colSpan={colSpan}>
                                    <Paragraph sx={{ mx: 2, my: 1 }}>
                                        {rowData[0]} has ${rowData[3]} in his
                                        wallet
                                    </Paragraph>
                                </TableCell>
                            </TableRow>
                        )
                    },
                }}
            />
        </Container>
    )
}

const columns = [
    {
        name: 'name', // field name in the row object
        label: 'Name', // column title that will be shown in table
        options: {
            filter: true,
        },
    },
    {
        name: 'email',
        label: 'Email',
        options: {
            filter: true,
        },
    },
    {
        name: 'company',
        label: 'Company',
        options: {
            filter: true,
        },
    },
    {
        name: 'balance',
        label: 'Balance',
        options: {
            filter: true,
        },
    },
]

export default ExpandableMuiTable
