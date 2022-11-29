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
  const [user, setUser] = useState(null);

  const handleAuthSuccess = useCallback((googleData) => {
    let user_credentials = jwtDecode(googleData.credential);
    setUser(user_credentials);

    console.log(user_credentials);
    console.log("sucesso");
  }, []);

  const handleAuthFailure = (result) => {
    setUser(null);
    console.log(result);
    console.log("falha");
  };

  const handleSignOut = useCallback(() => {
    setUser(null);
    console.log("logout");
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

