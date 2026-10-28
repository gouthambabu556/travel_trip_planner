import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, isValidEmail } from "../context/AuthContext";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function validate() {
    const found = {};

    if (!values.name.trim()) found.name = "Please enter your name.";

    if (!values.email.trim()) found.email = "Please enter your email.";
    else if (!isValidEmail(values.email))
      found.email = "Please enter a valid email address.";

    if (!values.password) found.password = "Please choose a password.";
    else if (values.password.length < 6)
      found.password = "Password must be at least 6 characters.";

    if (values.confirm !== values.password)
      found.confirm = "Passwords do not match.";

    return found;
  }

  function handleRegister(e) {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const result = register(values);

    if (!result.ok) {
      setErrors({ email: result.error });
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

        <h2>Create your account</h2>
        <p className="login-subtitle">
          Sign up to save trips, itineraries and budgets.
        </p>

        <form onSubmit={handleRegister} noValidate>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="login-error">{errors.name}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="login-error">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="login-error">{errors.password}</p>
          )}

          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="Re-enter your password"
            value={values.confirm}
            onChange={handleChange}
          />
          {errors.confirm && (
            <p className="login-error">{errors.confirm}</p>
          )}

          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>

        <p className="login-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
