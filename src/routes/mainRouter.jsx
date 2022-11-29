import { BrowserRouter } from "react-router-dom";

// CONTEXT
import { useAuth } from "../context/authContext";

// ROUTES
import { PublicRoutes } from "./publicRoutes";
import { PrivateRoutes } from "./privateRoutes";

export const MainRouter = () => {
  const { handleGetAuthStatus } = useAuth();

  return (
    <BrowserRouter>
      {handleGetAuthStatus() ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};