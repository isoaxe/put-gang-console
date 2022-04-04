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
  const [mlmAccess, setMlmAccess] = useState(false);
  const [level2Mlm, setLevel2Mlm] = useState(false);
  const all_pages = useRoutes(AllPages());
  const { user } = useAuth();

  // Fetch most data.
  const getActivity = () => getData("/activity", setActivities);
  const getUsers = () => getData("/users", setUsers);
  const getStats = () => getData("/payments/stats", setAllStats);

  async function getRole() {
    const user = firebase.auth().currentUser;
    const result = await user.getIdTokenResult(true);
    setRole(result.claims.role);
  }

  const getMlmAllowed = useCallback(async () => {
    try {
      if (user) {
        const userData = await getData("/users/user");
        setLevel2Mlm(userData.mlmAccess);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const checkMlmAllowed = useCallback(() => {
    if (role === "admin" || role === "level-1") {
      setMlmAccess(true);
    } else if (role === "level-2" && level2Mlm) {
      setMlmAccess(true);
    } else {
      return false;
    }
  }, [role, level2Mlm]);

  useEffect(() => {
    if (user) {
      getRole();
    }
    if (role) {
      checkMlmAllowed();
    }
    if (user && mlmAccess) {
      getActivity();
      getUsers();
      getStats();
    }
  }, [user, role, mlmAccess, checkMlmAllowed]);

  useEffect(() => {
    getMlmAllowed();
  }, [getMlmAllowed]);

  return (
    <DataContext.Provider value={{ activities, users, allStats, role }}>
      {all_pages}
      <Routes>
        {role && (
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
