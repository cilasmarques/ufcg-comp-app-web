import jwtDecode from "jwt-decode";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

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

  const handleAuthSuccess = useCallback((googleData) => {
    const reviewersEmailRegex = new RegExp(`[a-z0-9.]+${process.env.REACT_APP_REVIEWERS_EMAIL_DOMAIN}`);
    const user_credentials = jwtDecode(googleData.credential);    

    let cUser = null;
    if (process.env.REACT_APP_ADMIN_EMAIL === user_credentials.email) {
      cUser = {...user_credentials, isAdmin: true};
    } else if (reviewersEmailRegex.test(user_credentials.email)) {
      cUser = {...user_credentials, isAdmin: false};
    }

    localStorage.setItem('@user', JSON.stringify(cUser));
    setUser(cUser);
  }, []);

  const handleAuthFailure = () => {
    setUser(null);
    localStorage.removeItem('@user');
  };

  const handleSignOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('@user');
    console.info("logout");
  }, []);

  const handleGetAuthStatus = useCallback(() => {
    return !!user;
  }, [user])

  const authProviderData = useMemo(() => ({
    user,
    handleSignOut,
    handleAuthFailure,
    handleAuthSuccess,
    handleGetAuthStatus,
  }), [user, handleAuthSuccess, handleSignOut, handleGetAuthStatus]);

  return (
    <AuthContext.Provider value={authProviderData}>
      {children}
    </AuthContext.Provider>
  );
};

