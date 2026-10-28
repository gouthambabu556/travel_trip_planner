import React, { createContext, useContext, useState } from "react";
import { readJSON, writeJSON } from "../utils/helpers";

// Fixed admin credentials (front-end demo only).
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin@123";

const ADMIN_KEY = "travel_admin";

const AdminContext = createContext(null);

function loadSession() {
  const session = readJSON(ADMIN_KEY, null);
  return session && session.username === ADMIN_USERNAME ? session : null;
}

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(loadSession);

  function adminLogin({ username, password }) {
    if (
      username.trim().toLowerCase() !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      return { ok: false, error: "Incorrect admin username or password." };
    }

    const session = {
      username: ADMIN_USERNAME,
      loggedInAt: new Date().toISOString()
    };
    writeJSON(ADMIN_KEY, session);
    setAdmin(session);
    return { ok: true };
  }

  function adminLogout() {
    localStorage.removeItem(ADMIN_KEY);
    setAdmin(null);
  }

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
