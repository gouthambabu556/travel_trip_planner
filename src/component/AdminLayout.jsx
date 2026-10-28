import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

// Top bar shared by all admin pages; the page itself renders in <Outlet />.
function AdminLayout() {
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate("/admin/login");
  }

  return (
    <div>
      <nav className="navbar admin-navbar">
        <Link to="/admin" className="brand">
          <span className="brand-icon">⚙</span>
          TravelMate
          <span className="admin-tag">Admin</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/trips">Trip requests</NavLink>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <Outlet />
    </div>
  );
}

export default AdminLayout;
