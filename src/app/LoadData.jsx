import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import { useRoutes } from 'react-router-dom'
import DataContext from './contexts/DataContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth';
import { AllPages } from './routes/routes'
import { getData } from './utils/helpers';
import { API_URL } from './utils/urls';

const LoadData = () => {
    const [activities, setActivities] = useState({});
    const [payments, setPayments] = useState({});
    const [allStats, setAllStats] = useState({});
    const [stats, setStats] = useState({});
    const [invoices, setInvoices] = useState({});
    const [role, setRole] = useState("");
    const all_pages = useRoutes(AllPages())
    const { user } = useAuth();
    const uid = user.id;

    const getActivity = () => getData("/activity", setActivities);

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

    async function getStats () {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const fetchConfig = {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
      const response = await fetch(`${API_URL}/payments/stats`, fetchConfig);
      const jsonResponse = await response.json();
      setAllStats(jsonResponse);
      if (jsonResponse.error) {
        console.log(jsonResponse);
      }
    }

    useEffect(() => {
      getActivity();
      getPayments();
      getStats();
    }, [])

    useEffect(() => {
      if (Object.keys(payments).length) {
        setStats(payments[uid].stats);
        setInvoices(payments[uid].invoices);
      }
    }, [payments, uid]);

    return (
        <DataContext.Provider value={{activities, allStats, role}}>
            {all_pages}
            <Routes>
                <Route path='/' element={<Navigate to="/dashboard/default" />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default LoadData
