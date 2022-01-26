import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import { useRoutes } from 'react-router-dom'
import DataContext from './contexts/DataContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth';
import { AllPages } from './routes/routes'
import { getData } from './utils/helpers';

const LoadData = () => {
    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [allStats, setAllStats] = useState({});
    const [allInvoices, setAllInvoices] = useState({});
    const [role, setRole] = useState("");
    const all_pages = useRoutes(AllPages());
    const { user } = useAuth();

    // Fetch most data.
    const getActivity = () => getData("/activity", setActivities);
    const getUsers = () => getData("/users", setUsers);
    const getStats = () => getData("/payments/stats", setAllStats);
    const getInvoices = () => getData("/payments/invoices", setAllInvoices);

    async function getRole () {
      const user = firebase.auth().currentUser;
      const result = await user.getIdTokenResult(true);
      setRole(result.claims.role);
    }

    useEffect(() => {
      if (user) {
        getRole();
      }
      if (user && ["admin", "level-1", "level-2"].includes(role)) {
        getActivity();
        getUsers();
        getStats();
        getInvoices();
      }
    }, [user, role]);

    return (
        <DataContext.Provider value={{activities, users, allStats, allInvoices, role}}>
            {all_pages}
            <Routes>
                <Route path='/' element={<Navigate to="/dashboard/console" />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default LoadData
