import { Route, Routes } from "react-router-dom";

// PAGES
import { LoginPage } from "../pages/login/login";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
    </Routes>
  );
};