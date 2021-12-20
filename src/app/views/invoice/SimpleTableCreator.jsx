import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { styled } from '@mui/system'

const StyledCell = styled(TableCell)(() => ({
    paddingLeft: '24px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const SimpleTableGenerator = ({ column = [], dataField = [], data = [] }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {column.map((col, index) =>
                        index !== 0 ? (
                            <TableCell sx={{ px: 0 }}>{col}</TableCell>
                        ) : (
                            <StyledCell>{col}</StyledCell>
                        )
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        {dataField.map((field) => (
                            <StyledCell
                                sx={{ textTransform: 'capitalize' }}
                                align="left"
                            >
                                {field === 'auto' ? index + 1 : item[field]}
                            </StyledCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SimpleTableGenerator
