import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDestinations from "../utils/useDestinations";
import DestinationCardd from "../component/DestinationCardd";

function Exploree() {
  const { destinations } = useDestinations();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [category, setCategory] = useState("All");

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("travel_favorites") || "[]"
      );
    } catch {
      return [];
    }
  });

  function handleSearch(value) {
    setSearch(value);
    setSearchParams(value ? { search: value } : {});
  }

  function toggleFavorite(id) {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "travel_favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      (category === "Favorites"
        ? favorites.includes(destination.id)
        : destination.category === category);

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    "Beach",
    "Mountain",
    "City",
    "Nature",
    "Adventure",
    "Favorites"
  ];

  return (
    <section className="section explore-page">
      <div className="explore-heading">
        <span className="eyebrow">DISCOVER SOMETHING NEW</span>
        <h1>Explore destinations</h1>
        <p>Find the perfect place for your next adventure.</p>
      </div>

      <div className="explore-controls">
        <input
          type="text"
          placeholder="Search by destination or location..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
        />

        <div className="category-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "filter-button selected"
                  : "filter-button"
              }
              onClick={() => setCategory(item)}
            >
              {item === "Favorites" ? "♥ Favorites" : item}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count">
        {filteredDestinations.length} destinations found
      </p>

      {filteredDestinations.length > 0 ? (
        <div className="destination-grid">
          {filteredDestinations.map((destination) => (
            <DestinationCardd
              key={destination.id}
              destination={destination}
              favorite={favorites.includes(destination.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🌍</span>
          <h3>No destinations found</h3>
          <p>
            {category === "Favorites"
              ? "You haven't bookmarked any destinations yet. Tap the heart on a card to save it."
              : "Try another search or choose a different category."}
          </p>
          <button
            className="small-button"
            onClick={() => {
              handleSearch("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Exploree;
