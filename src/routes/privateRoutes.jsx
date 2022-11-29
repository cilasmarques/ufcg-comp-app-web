import { Route, Routes } from "react-router-dom";

// PAGES
import { Dashboard } from "../pages/dashboard/dashboard";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
    </Routes>
  );
};