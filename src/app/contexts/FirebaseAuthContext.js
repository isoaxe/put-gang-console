import React, { createContext, useEffect, useReducer } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "config.js";
import { MatxLoading } from "app/components";

const currentUrl = new URL(window.location.href);
const membLvl = currentUrl.searchParams.get("membLvl"); // Membership level.
const refId = currentUrl.searchParams.get("refId") || "none"; // Referrer ID.

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  membLvl,
  refId,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FB_AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "FIREBASE",
  signInWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "FB_AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              name: user.displayName || user.email,
              avatar: user.photoURL,
              email: user.email,
            },
          },
        });
      } else {
        dispatch({
          type: "FB_AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "FIREBASE",
        signInWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
