import { Route, Routes } from "react-router-dom";

// CONTEXT
import { useAuth } from "../context/AuthContext";

// PAGES
import Dashboard from "../pages/Dashboard/Dashboard";
import PDFVerifier from "../pages/PDFVerifier/PDFVerifier";
import UserRegister from "../pages/UserRegister/UserRegister";

export const PrivateRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      {user?.isAdmin &&
        <>
          <Route path="/verificarDocumentos" index element={<PDFVerifier />} />
          <Route path="/cadastrarUsuarios" index element={<UserRegister />} />
        </>
      }
    </Routes>
  );
};