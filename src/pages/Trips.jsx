import React from "react";
import { Link, useNavigate } from "react-router-dom";
import destinations from "../data/destination";
import useTrips from "../utils/useTrips";
import {
  formatDate,
  formatINR,
  tripStatus,
  totalSpent,
  remaining,
  dayCount
} from "../utils/helpers";

function Trips() {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();

  const sortedTrips = [...trips].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  function handleDelete(trip) {
    const confirmed = window.confirm(
      `Delete "${trip.title}"? Its itinerary and expenses will be removed too.`
    );
    if (confirmed) deleteTrip(trip.id);
  }

  return (
    <section className="section explore-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR PLANS</span>
          <h2>My trips</h2>
          <p>Create, update and track every trip in one place.</p>
        </div>

        <Link to="/trips/new" className="small-button">
          + New trip
        </Link>
      </div>

      {sortedTrips.length === 0 ? (
        <div className="empty-state">
          <span>🧳</span>
          <h3>No trips yet</h3>
          <p>Start by choosing a destination and setting your dates.</p>
          <button
            className="small-button"
            onClick={() => navigate("/trips/new")}
          >
            Plan your first trip
          </button>
        </div>
      ) : (
        <div className="trip-grid">
          {sortedTrips.map((trip) => {
            const place = destinations.find(
              (item) => item.id === trip.destinationId
            );
            const status = tripStatus(trip);
            const left = remaining(trip);

            return (
              <div className="trip-card" key={trip.id}>
                <div className="trip-image">
                  {place && <img src={place.image} alt={place.name} loading="lazy" />}
                  <span className={`status-badge ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>

                <div className="trip-body">
                  <p className="destination-location">
                    📍 {place ? place.name : "Custom destination"}
                  </p>
                  <h3>{trip.title}</h3>
                  <p className="trip-dates">
                    {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
                    {" · "}
                    {dayCount(trip.startDate, trip.endDate)} days
                  </p>

                  <div className="trip-money">
                    <div>
                      <span className="muted">Budget</span>
                      <strong>{formatINR(trip.budget)}</strong>
                    </div>
                    <div>
                      <span className="muted">Spent</span>
                      <strong>{formatINR(totalSpent(trip))}</strong>
                    </div>
                    <div>
                      <span className="muted">
                        {left < 0 ? "Over by" : "Remaining"}
                      </span>
                      <strong className={left < 0 ? "over" : ""}>
                        {formatINR(Math.abs(left))}
                      </strong>
                    </div>
                  </div>

                  <div className="trip-actions">
                    <Link to={`/trips/${trip.id}`} className="small-button">
                      Open
                    </Link>
                    <Link
                      to={`/trips/${trip.id}/edit`}
                      className="outline-button small"
                    >
                      Edit
                    </Link>
                    <button
                      className="outline-button small danger"
                      onClick={() => handleDelete(trip)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Trips;
