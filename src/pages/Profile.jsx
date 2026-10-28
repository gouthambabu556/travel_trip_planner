import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useTrips from "../utils/useTrips";
import { readJSON, formatDate } from "../utils/helpers";

function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { trips } = useTrips();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const favoritesCount = readJSON("travel_favorites", []).length;

  function handleSave(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const result = updateProfile({ name, currentPassword, newPassword });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setMessage("Profile updated.");
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <section className="section page-narrow">
      <div className="explore-heading">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>My profile</h1>
        <p>Manage your details and see your travel summary.</p>
      </div>

      <div className="form-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3>{user.name}</h3>
            <p className="muted">{user.email}</p>
            {user.createdAt && (
              <p className="muted">
                Member since {formatDate(user.createdAt.slice(0, 10))}
              </p>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <strong>{trips.length}</strong>
            <span>Trips planned</span>
          </div>
          <div>
            <strong>{favoritesCount}</strong>
            <span>Favourite places</span>
          </div>
        </div>

        <form onSubmit={handleSave} noValidate>
          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="profile-name">Full name</label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="current-password">Current password</label>
              <input
                id="current-password"
                type="password"
                placeholder="Only to change password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="field-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <div className="form-actions">
            <button type="button" className="danger-button" onClick={handleLogout}>
              Logout
            </button>
            <button type="submit" className="primary-button">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
