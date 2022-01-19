import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import { useRoutes } from 'react-router-dom'
import DataContext from './contexts/DataContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth';
import { AllPages } from './routes/routes'
import { API_URL } from './utils/urls';

const LoadData = () => {
    const [payments, setPayments] = useState({});
    const [stats, setStats] = useState({});
    const [invoices, setInvoices] = useState({});
    const [role, setRole] = useState("");
    const all_pages = useRoutes(AllPages())
    const { user } = useAuth();
    const uid = user.id;

    async function getPayments () {
      const user = firebase.auth().currentUser;
      const token = await user.getIdToken(true);
      const result = await user.getIdTokenResult(true);
      setRole(result.claims.role);
      const fetchConfig = {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
      const response = await fetch(`${API_URL}/payments`, fetchConfig);
      const jsonResponse = await response.json();
      setPayments(jsonResponse);
      if (jsonResponse.error) {
        console.log(jsonResponse);
      }
    }

    useEffect(() => {
      getPayments();
    }, [])

    useEffect(() => {
      if (Object.keys(payments).length) {
        setStats(payments[uid].stats);
        setInvoices(payments[uid].invoices);
      }
    }, [payments, uid]);

    return (
        <DataContext.Provider value={{stats, role}}>
            {all_pages}
            <Routes>
                <Route path='/' element={<Navigate to="/dashboard/default" />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default LoadData
