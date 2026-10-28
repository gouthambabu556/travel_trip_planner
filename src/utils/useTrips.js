import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { readJSON, writeJSON, uid } from "./helpers";

const TRIPS_KEY = "travel_trips";

// CRUD for the logged-in user's trips, persisted in localStorage.
export default function useTrips() {
  const { user } = useAuth();
  const [allTrips, setAllTrips] = useState(() => readJSON(TRIPS_KEY, []));

  // pick up admin decisions made in another tab
  useEffect(() => {
    function onStorage(e) {
      if (e.key === TRIPS_KEY || e.key === null) {
        setAllTrips(readJSON(TRIPS_KEY, []));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const trips = allTrips.filter((trip) => trip.owner === user.email);

  // Always starts from what is stored so back-to-back updates never clash.
  function mutate(change) {
    const next = change(readJSON(TRIPS_KEY, []));
    writeJSON(TRIPS_KEY, next);
    setAllTrips(next);
  }

  function getTrip(id) {
    return trips.find((trip) => trip.id === id);
  }

  function addTrip(data) {
    const trip = {
      id: uid(),
      owner: user.email,
      itinerary: [],
      expenses: [],
      createdAt: new Date().toISOString(),
      approval: "Pending", // the admin accepts or rejects new trips
      ...data
    };
    mutate((list) => [...list, trip]);
    return trip;
  }

  function updateTrip(id, changes) {
    mutate((list) =>
      list.map((trip) =>
        trip.id === id && trip.owner === user.email
          ? { ...trip, ...changes }
          : trip
      )
    );
  }

  function deleteTrip(id) {
    mutate((list) =>
      list.filter((trip) => !(trip.id === id && trip.owner === user.email))
    );
  }

  return { trips, getTrip, addTrip, updateTrip, deleteTrip };
}
