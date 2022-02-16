import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import AppContext from './contexts/AppContext'
import { AuthProvider } from 'app/contexts/FirebaseAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import LoadData from './LoadData';
import { MatxTheme } from './components'

const App = () => {

    return (
        <AppContext.Provider>
            <Provider store={Store}>
                <SettingsProvider>
                    <MatxTheme>
                        <AuthProvider>
                            <LoadData />
                        </AuthProvider>
                    </MatxTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider >
    )
}

export default App
