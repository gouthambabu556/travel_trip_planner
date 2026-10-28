import React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

// Only the logged-in admin can see the wrapped pages.
function AdminRoute({ children }) {
  const { admin } = useAdmin();
  return admin ? children : <Navigate to="/admin/login" replace />;
}

export default AdminRoute;
