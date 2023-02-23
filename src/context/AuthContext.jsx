import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { setAuthToken } from "../services";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export const AuthContext = createContext({
  user: null,
  handleSignOut: () => {},
  handleAuthFailure: () => {},
  handleAuthSuccess: () => {},
  handleGetAuthStatus: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('@user')));
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('@auth')));

  const handleAuthSuccess = useCallback((googleData, userCredentials) => {
    if (userCredentials.role === "COORDINATOR") {
      userCredentials = {...userCredentials, isAdmin: true};
    } else {
      userCredentials = {...userCredentials, isAdmin: false};
    }

    localStorage.setItem('@user', JSON.stringify(userCredentials));
    localStorage.setItem('@auth', JSON.stringify(googleData));
    setAuth(googleData);
    setUser(userCredentials);
    setAuthToken(googleData.credential);
  }, []);

  const handleAuthFailure = () => {
    setUser(null);
    setAuth(null);
    setAuthToken(null);
    localStorage.removeItem('@user');
    localStorage.removeItem('@auth');
    window.location.href = "/";
  };

  const handleSignOut = useCallback(() => {
    setUser(null);
    setAuth(null);
    setAuthToken(null);
    localStorage.removeItem('@user');
    localStorage.removeItem('@auth');
    window.location.href = "/";
  }, []);

  const handleGetAuthStatus = useCallback(() => {
    return !!user;
  }, [user])

  const authProviderData = useMemo(() => ({
    user,
    auth,
    handleSignOut,
    handleAuthFailure,
    handleAuthSuccess,
    handleGetAuthStatus,
  }), [user, auth, handleAuthSuccess, handleSignOut, handleGetAuthStatus]);

  return (
    <AuthContext.Provider value={authProviderData}>
      {children}
    </AuthContext.Provider>
  );
};

