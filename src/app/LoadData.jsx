import '../fake-db'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import DataContext from './contexts/DataContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AllPages } from './routes/routes'

const LoadData = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <DataContext.Provider>
            {all_pages}
            <Routes>
                <Route path='/' element={<Navigate to="/dashboard/default" />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default LoadData
