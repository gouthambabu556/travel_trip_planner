import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { adminLogin } = useAdmin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError("Please enter the admin username and password.");
      return;
    }

    const result = adminLogin({ username, password });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/admin", { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <span className="login-brand">
          Travel<span>Mate</span> Admin
        </span>

        <h2>Admin Login</h2>
        <p className="login-subtitle">
          Sign in to manage packages and trip requests.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            type="text"
            placeholder="Enter admin username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login as admin
          </button>
        </form>

        <p className="login-footer">
          Not an admin? <Link to="/login">Go to user login</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
