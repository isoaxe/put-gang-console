import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/FirebaseAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from './components'
import { AllPages } from './routes/routes'

const App = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <AppContext.Provider>
            <Provider store={Store}>
                <SettingsProvider>
                    <MatxTheme>
                        <AuthProvider>
                            {all_pages}
                            <Routes>
                                <Route path='/' element={<Navigate to="/dashboard/default" />} />
                            </Routes>
                        </AuthProvider>
                    </MatxTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider >
    )
}

export default App
