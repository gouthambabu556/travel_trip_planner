import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useDestinations from "../utils/useDestinations";
import useTrips from "../utils/useTrips";
import ProgressTracker from "../component/ProgressTracker";
import ItineraryPlanner from "../component/ItineraryPlanner";
import BudgetTracker from "../component/BudgetTracker";
import {
  formatDate,
  formatINR,
  dayCount,
  tripStatus
} from "../utils/helpers";

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip, updateTrip, deleteTrip } = useTrips();
  const { destinations } = useDestinations();
  const [tab, setTab] = useState("itinerary");

  const trip = getTrip(id);

  if (!trip) {
    return <Navigate to="/trips" replace />;
  }

  const place = destinations.find((item) => item.id === trip.destinationId);
  function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${trip.title}"? Its itinerary and expenses will be removed too.`
    );
    if (confirmed) {
      deleteTrip(trip.id);
      navigate("/trips");
    }
  }

  const heroImage = place
    ? `linear-gradient(180deg, rgba(8,43,41,0.15), rgba(8,43,41,0.85)), url(${place.image})`
    : "linear-gradient(135deg, #07866f, #123e3a)";

  return (
    <section className="section explore-page">
      <Link to="/trips" className="back-link">← Back to my trips</Link>

      <div className="trip-hero" style={{ backgroundImage: heroImage }}>
        <div>
          <span className={`status-badge static ${tripStatus(trip).toLowerCase()}`}>
            {tripStatus(trip)}
          </span>
          <h1>{trip.title}</h1>
          <p>
            📍 {place ? `${place.name}, ${place.location}` : "Destination removed"}
          </p>
          <p>
            {formatDate(trip.startDate)} → {formatDate(trip.endDate)} ·{" "}
            {dayCount(trip.startDate, trip.endDate)} days · Budget{" "}
            {formatINR(trip.budget)}
          </p>
          {trip.notes && <p className="trip-notes">“{trip.notes}”</p>}
        </div>

        <div className="trip-hero-actions">
          <Link to={`/trips/${trip.id}/edit`} className="small-button light">
            Edit trip
          </Link>
          <button className="small-button danger-solid" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <ProgressTracker trip={trip} />

      <div className="tab-bar">
        <button
          className={tab === "itinerary" ? "filter-button selected" : "filter-button"}
          onClick={() => setTab("itinerary")}
        >
          🗓 Itinerary
        </button>
        <button
          className={tab === "budget" ? "filter-button selected" : "filter-button"}
          onClick={() => setTab("budget")}
        >
          💰 Budget &amp; expenses
        </button>
      </div>

      {tab === "itinerary" ? (
        <ItineraryPlanner
          trip={trip}
          destination={place}
          onChange={(itinerary) => updateTrip(trip.id, { itinerary })}
        />
      ) : (
        <BudgetTracker
          trip={trip}
          onChange={(expenses) => updateTrip(trip.id, { expenses })}
        />
      )}
    </section>
  );
}

export default TripDetail;
