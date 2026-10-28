import { useState, useEffect } from "react";
import { readJSON, writeJSON } from "./helpers";

const TRIPS_KEY = "travel_trips";
const USERS_KEY = "travel_users";

// Admin view of EVERY user's trips, plus a way to update them.
export default function useAdminTrips() {
  const [trips, setTrips] = useState(() => readJSON(TRIPS_KEY, []));
  const [users] = useState(() => readJSON(USERS_KEY, []));

  // pick up trips created in another tab while this page is open
  useEffect(() => {
    function onStorage(e) {
      if (e.key === TRIPS_KEY || e.key === null) {
        setTrips(readJSON(TRIPS_KEY, []));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function ownerOf(email) {
    const user = users.find((item) => item.email === email);
    return { name: user ? user.name : email, email };
  }

  // Always starts from what is stored so nothing a user saved is overwritten.
  function updateTrip(id, changes) {
    const next = readJSON(TRIPS_KEY, []).map((trip) =>
      trip.id === id ? { ...trip, ...changes } : trip
    );
    writeJSON(TRIPS_KEY, next);
    setTrips(next);
  }

  return { trips, users, ownerOf, updateTrip };
}
