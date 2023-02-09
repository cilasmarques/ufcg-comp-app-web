import { BrowserRouter } from "react-router-dom";

// CONTEXT
import { useAuth } from "../context/AuthContext";

// ROUTES
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export const MainRouter = () => {
  const { handleGetAuthStatus } = useAuth();

  return (
    <BrowserRouter>
      {handleGetAuthStatus() ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};