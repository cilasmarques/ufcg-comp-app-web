import { Route, Routes } from "react-router-dom";

// PAGES
import { LoginPage } from "../pages/Login/Login";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
    </Routes>
  );
};