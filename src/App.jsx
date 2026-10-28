import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import ProtectedRoute from "./component/ProtectedRoute";
import AdminRoute from "./component/AdminRoute";
import AdminLayout from "./component/AdminLayout";
import Navbarr from "./component/Navbarr";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Homee";
import Explore from "./pages/Exploree";
import Trips from "./pages/Trips";
import TripForm from "./pages/TripForm";
import TripDetail from "./pages/TripDetail";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTrips from "./pages/AdminTrips";

function AppRoutes() {
  const { user } = useAuth();
  const { admin } = useAdmin();
  const { pathname } = useLocation();

  // the traveller navbar is not shown on admin pages
  const onAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {user && !onAdminPage && <Navbarr />}

      <Routes>
        {/* traveller pages */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
        <Route path="/trips/new" element={<ProtectedRoute><TripForm /></ProtectedRoute>} />
        <Route path="/trips/:id" element={<ProtectedRoute><TripDetail /></ProtectedRoute>} />
        <Route path="/trips/:id/edit" element={<ProtectedRoute><TripForm /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* admin pages */}
        <Route
          path="/admin/login"
          element={admin ? <Navigate to="/admin" replace /> : <AdminLogin />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="trips" element={<AdminTrips />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <AppRoutes />
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

