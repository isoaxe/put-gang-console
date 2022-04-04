import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase/app";
import { useRoutes } from "react-router-dom";
import DataContext from "./contexts/DataContext";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { AllPages } from "./routes/routes";
import { getData } from "./utils/helpers";

const LoadData = () => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [allStats, setAllStats] = useState([]);
  const [role, setRole] = useState("");
  const [level2Mlm, setLevel2Mlm] = useState(false);
  const [mlmAccess, setMlmAccess] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const all_pages = useRoutes(AllPages());
  const { user } = useAuth();

  // Fetch most data.
  const getActivity = () => getData("/activity", setActivities);
  const getUsers = () => getData("/users", setUsers);
  const getStats = () => getData("/payments/stats", setAllStats);

  async function getRole() {
    const result = await firebase.auth().currentUser.getIdTokenResult(true);
    setRole(result.claims.role);
  }

  const getLevel2Mlm = useCallback(async () => {
    if (user) {
      const userData = await getData("/users/user");
      setLevel2Mlm(userData.mlmAccess);
      setNavReady(true);
    }
  }, [user]);

  const checkMlmAccess = useCallback(() => {
    if (role === "admin" || role === "level-1") {
      setMlmAccess(true);
    } else if (role === "level-2" && level2Mlm) {
      setMlmAccess(true);
    }
    setNavReady(true);
  }, [role, level2Mlm]);

  useEffect(() => {
    if (user) {
      getRole();
    }
    if (role) {
      checkMlmAccess();
    }
    if (user && mlmAccess) {
      getActivity();
      getUsers();
      getStats();
    }
  }, [user, role, mlmAccess, checkMlmAccess]);

  useEffect(() => {
    if (role === "level-2") getLevel2Mlm();
  }, [role, getLevel2Mlm]);

  return (
    <DataContext.Provider value={{ activities, users, allStats, role }}>
      {all_pages}
      <Routes>
        {role && navReady && (
          <Route
            path="/"
            element={
              <Navigate
                to={mlmAccess ? "/dashboard/console" : "/dashboard/settings"}
              />
            }
          />
        )}
        {!user && (
          <Route path="/" element={<Navigate to="/dashboard/settings" />} />
        )}
      </Routes>
    </DataContext.Provider>
  );
};

export default LoadData;
