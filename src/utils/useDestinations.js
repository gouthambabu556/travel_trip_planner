import { useState, useEffect } from "react";
import staticDestinations from "../data/destination";
import { readJSON, writeJSON } from "./helpers";

const KEY = "travel_custom_destinations";

export const CATEGORIES = ["Beach", "Mountain", "City", "Nature", "Adventure"];

// Used when the admin adds a package without an image link.
export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80";

// Built-in destinations (data/destination.js) + packages added by the admin.
export default function useDestinations() {
  const [custom, setCustom] = useState(() => readJSON(KEY, []));

  // pick up changes made in another tab (e.g. the admin adds a package)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === KEY || e.key === null) setCustom(readJSON(KEY, []));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const destinations = [
    ...staticDestinations,
    ...custom.map((item) => ({ ...item, custom: true }))
  ];

  function mutate(change) {
    const next = change(readJSON(KEY, []));
    writeJSON(KEY, next);
    setCustom(next);
  }

  function addDestination(data) {
    const item = { id: Date.now(), ...data };
    mutate((list) => [...list, item]);
    return item;
  }

  function updateDestination(id, data) {
    mutate((list) =>
      list.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  }

  function deleteDestination(id) {
    mutate((list) => list.filter((item) => item.id !== id));
  }

  return { destinations, addDestination, updateDestination, deleteDestination };
}
