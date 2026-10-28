import React, { createContext, useContext, useState } from "react";
import { readJSON, writeJSON } from "../utils/helpers";

const USERS_KEY = "travel_users";   // all registered demo accounts
const SESSION_KEY = "travel_user";  // the logged-in user's profile

const AuthContext = createContext(null);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email.trim());
}

// What gets kept in the session - never the password.
function toSession(user) {
  return { name: user.name, email: user.email, createdAt: user.createdAt };
}

function loadSession() {
  const session = readJSON(SESSION_KEY, null);
  return session && typeof session === "object" && session.email
    ? session
    : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  function register({ name, email, password }) {
    const users = readJSON(USERS_KEY, []);
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((item) => item.email === cleanEmail)) {
      return {
        ok: false,
        error: "An account with this email already exists. Please log in."
      };
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password,
      createdAt: new Date().toISOString()
    };

    writeJSON(USERS_KEY, [...users, newUser]);

    // const session = toSession(newUser);
    // writeJSON(SESSION_KEY, session);
    // setUser(session);
    return { ok: true };
  }

  function login({ email, password }) {
    const users = readJSON(USERS_KEY, []);
    const cleanEmail = email.trim().toLowerCase();
    const match = users.find(
      (item) => item.email === cleanEmail && item.password === password
    );

    if (!match) {
      return { ok: false, error: "Incorrect email or password." };
    }

    const session = toSession(match);
    writeJSON(SESSION_KEY, session);
    setUser(session);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function updateProfile({ name, currentPassword, newPassword }) {
    const users = readJSON(USERS_KEY, []);
    const index = users.findIndex((item) => item.email === user.email);

    if (index === -1) return { ok: false, error: "Account not found." };
    if (!name.trim()) return { ok: false, error: "Name can't be empty." };

    const updated = { ...users[index], name: name.trim() };

    if (newPassword) {
      if (currentPassword !== users[index].password) {
        return { ok: false, error: "Current password is incorrect." };
      }
      if (newPassword.length < 6) {
        return {
          ok: false,
          error: "New password must be at least 6 characters."
        };
      }
      updated.password = newPassword;
    }

    users[index] = updated;
    writeJSON(USERS_KEY, users);

    const session = toSession(updated);
    writeJSON(SESSION_KEY, session);
    setUser(session);
    return { ok: true };
  }

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
