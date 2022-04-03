import React, { useState, useEffect } from "react";
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
  const all_pages = useRoutes(AllPages());
  const { user } = useAuth();
  const isSenior = ["admin", "level-1", "level-2"].includes(role);

  // Fetch most data.
  const getActivity = () => getData("/activity", setActivities);
  const getUsers = () => getData("/users", setUsers);
  const getStats = () => getData("/payments/stats", setAllStats);

  async function getRole() {
    const user = firebase.auth().currentUser;
    const result = await user.getIdTokenResult(true);
    setRole(result.claims.role);
  }

  function hasMlm() {
    if (role === "admin" || role === "level-1") {
      return true;
    } else if (role === "level-2" && level2Mlm) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (user) {
      getRole();
    }
    if (user && isSenior) {
      getActivity();
      getUsers();
      getStats();
    }
  }, [user, isSenior]);

  return (
    <DataContext.Provider value={{ activities, users, allStats, role }}>
      {all_pages}
      <Routes>
        {role && (
          <Route
            path="/"
            element={
              <Navigate
                to={isSenior ? "/dashboard/console" : "/dashboard/settings"}
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
