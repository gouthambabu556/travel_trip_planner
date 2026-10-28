import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, isValidEmail } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter your email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = login({ email, password });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/login" className="login-brand">
          Travel<span>Mate</span>
        </Link>

        <h2>Welcome Back!</h2>
        <p className="login-subtitle">
          Log in to continue planning your next adventure.
        </p>

        <form onSubmit={handleLogin} noValidate>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          New to TravelMate? <Link to="/register">Create an account</Link>
        </p>
        <p className="login-footer"><Link to="/admin/login">Admin login</Link></p>
      </div>
    </div>
  );
}

export default Login;
