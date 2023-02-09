import { Route, Routes } from "react-router-dom";

// CONTEXT
import { useAuth } from "../context/AuthContext";

// PAGES
import Dashboard from "../pages/Dashboard/Dashboard";
import PDFVerifier from "../pages/PDFVerifier/PDFVerifier";

export const PrivateRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      {user?.isAdmin &&
        <Route path="/verificarDocumentos" index element={<PDFVerifier />} />
      }
    </Routes>
  );
};