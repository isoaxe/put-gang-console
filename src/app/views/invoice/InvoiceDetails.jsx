import { Card } from '@mui/material'
import InvoiceViewer from './InvoiceViewer'
import InvoiceEditor from './InvoiceEditor'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const InvoiceDetails = () => {
    const [showInvoiceEditor, setShowInvoiceEditor] = useState(false)
    const [isNewInvoice, setIsNewInvoice] = useState(false)

    const { id } = useParams()

    const toggleInvoiceEditor = () => {
        setShowInvoiceEditor(!showInvoiceEditor)
        setIsNewInvoice(false)
    }

    useEffect(() => {
        if (id === 'add') {
            setShowInvoiceEditor(true)
            setIsNewInvoice(true)
        }
    }, [id])

    return (
        <StyledCard elevation={6}>
            {showInvoiceEditor ? (
                <InvoiceEditor
                    toggleInvoiceEditor={toggleInvoiceEditor}
                    isNewInvoice={isNewInvoice}
                />
            ) : (
                <InvoiceViewer toggleInvoiceEditor={toggleInvoiceEditor} />
            )}
        </StyledCard>
    )
}

export default InvoiceDetails
