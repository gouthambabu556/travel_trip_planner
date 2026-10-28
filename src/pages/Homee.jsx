import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useDestinations from "../utils/useDestinations";
import DestinationCardd from "../component/DestinationCardd";
import { useAuth } from "../context/AuthContext";
import useTrips from "../utils/useTrips";
import {
  formatINR,
  tripStatus,
  totalSpent,
  remaining
} from "../utils/helpers";

function Homee() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("travel_favorites") || "[]"
      );
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();
  const { destinations } = useDestinations();
  const { user } = useAuth();
  const { trips } = useTrips();

  const upcomingTrips = trips.filter(
    (trip) => tripStatus(trip) !== "Completed"
  ).length;
  const totalBudget = trips.reduce(
    (sum, trip) => sum + Number(trip.budget || 0),
    0
  );
  const totalExpenses = trips.reduce(
    (sum, trip) => sum + totalSpent(trip),
    0
  );
  const totalRemaining = trips.reduce(
    (sum, trip) => sum + remaining(trip),
    0
  );

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

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(search)}`);
  }

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Explore the world.
            <br />
            <span>Make memories.</span>
          </h1>

          <p>
            Discover beautiful destinations, plan your journey
            and make every trip unforgettable.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <span>⌕</span>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="hero-stats">
            <div>
              <strong>6+</strong>
              <span>Destinations</span>
            </div>
            <div>
              <strong>Easy</strong>
              <span>Trip planning</span>
            </div>
            <div>
              <strong>Smart</strong>
              <span>Budget tracking</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section dashboard-section" id="dashboard">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR DASHBOARD</span>
            <h2>Welcome back, {user.name.split(" ")[0]}</h2>
            <p>Here is a quick look at your trips and spending.</p>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("/trips")}
          >
            Manage my trips →
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat-tile">
            <span className="muted">Total trips</span>
            <strong>{trips.length}</strong>
          </div>
          <div className="stat-tile">
            <span className="muted">Upcoming / ongoing</span>
            <strong>{upcomingTrips}</strong>
          </div>
          <div className="stat-tile">
            <span className="muted">Total budget</span>
            <strong>{formatINR(totalBudget)}</strong>
          </div>
          <div className="stat-tile">
            <span className="muted">
              {totalRemaining < 0 ? "Over budget by" : "Remaining"}
            </span>
            <strong className={totalRemaining < 0 ? "over" : ""}>
              {formatINR(Math.abs(totalRemaining))}
            </strong>
            <span className="muted">
              Spent {formatINR(totalExpenses)}
            </span>
          </div>
        </div>
      </section>

      <section className="section" id="destinations">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT ESCAPE</span>
            <h2>Popular destinations</h2>
            <p>Beautiful places to add to your travel bucket list.</p>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("/explore")}
          >
            View all destinations →
          </button>
        </div>

        <div className="destination-grid">
          {destinations
            .filter((item) => item.custom)
            .concat(destinations.filter((item) => !item.custom))
            .slice(0, 3)
            .map((destination) => (
              <DestinationCardd
                key={destination.id}
                destination={destination}
                favorite={favorites.includes(destination.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </section>

      <section className="planning-banner" id="about">
        <div>
          <span className="eyebrow">YOUR JOURNEY, YOUR WAY</span>
          <h2>Every great trip starts with a plan.</h2>
          <p>
            Explore places, organize activities and keep your
            travel expenses under control.
          </p>
        </div>

        <button
          className="banner-button"
          onClick={() => navigate("/trips/new")}
        >
          Plan a trip →
        </button>
      </section>

      <footer className="footer">
        <Link to ="/" className="brand">
          <span className="brand-icon">✈</span>
          TravelMate
        </Link>
        <p>Discover more. Travel better.</p>
      </footer>
    </div>
  );
}

export default Homee;
