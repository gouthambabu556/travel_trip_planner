import React, { useState } from "react";
import useAdminTrips from "../utils/useAdminTrips";
import useDestinations from "../utils/useDestinations";
import {
  APPROVAL_STATES,
  PROGRESS_STEPS,
  getApproval,
  getProgress,
  formatDate,
  formatINR,
  formatTime,
  dayCount,
  totalSpent
} from "../utils/helpers";

const FILTERS = ["All", ...APPROVAL_STATES];

function AdminTrips() {
  const { trips, ownerOf, updateTrip } = useAdminTrips();
  const { destinations } = useDestinations();
  const [filter, setFilter] = useState("All");

  const counts = { All: trips.length };
  APPROVAL_STATES.forEach((state) => {
    counts[state] = trips.filter((trip) => getApproval(trip) === state).length;
  });

  const visibleTrips = trips
    .filter((trip) => filter === "All" || getApproval(trip) === filter)
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  const stamp = () => ({ reviewedAt: new Date().toISOString() });

  function accept(trip) {
    updateTrip(trip.id, {
      approval: "Accepted",
      progress: getProgress(trip) || "Planning",
      adminNote: "",
      ...stamp()
    });
  }

  function reject(trip) {
    const note = window.prompt(
      `Reject "${trip.title}"?\nReason (shown to the traveller, optional):`,
      ""
    );
    if (note === null) return; // admin pressed Cancel
    updateTrip(trip.id, {
      approval: "Rejected",
      adminNote: note.trim(),
      ...stamp()
    });
  }

  function cancel(trip) {
    const note = window.prompt(
      `Cancel "${trip.title}"?\nReason (shown to the traveller, optional):`,
      ""
    );
    if (note === null) return;
    updateTrip(trip.id, {
      approval: "Cancelled",
      adminNote: note.trim(),
      ...stamp()
    });
  }

  function backToPending(trip) {
    updateTrip(trip.id, { approval: "Pending", adminNote: "", ...stamp() });
  }

  function setProgress(trip, value) {
    updateTrip(trip.id, { progress: value, ...stamp() });
  }

  function sortedItinerary(trip) {
    return [...(trip.itinerary || [])].sort(
      (a, b) =>
        a.day - b.day || (a.time || "99:99").localeCompare(b.time || "99:99")
    );
  }

  return (
    <section className="section explore-page">
      <div className="explore-heading">
        <span className="eyebrow">TRIP REQUESTS</span>
        <h1>Trips created by users</h1>
        <p>Accept or reject new trips, track their progress, or cancel them.</p>
      </div>

      <div className="category-filters filter-row">
        {FILTERS.map((item) => (
          <button
            key={item}
            className={filter === item ? "filter-button selected" : "filter-button"}
            onClick={() => setFilter(item)}
          >
            {item} ({counts[item]})
          </button>
        ))}
      </div>

      {visibleTrips.length === 0 ? (
        <div className="empty-state">
          <span>📭</span>
          <h3>No trips here</h3>
          <p>
            {trips.length === 0
              ? "Trips will appear here when users create them."
              : "No trips match this filter."}
          </p>
        </div>
      ) : (
        <div className="admin-trip-list">
          {visibleTrips.map((trip) => {
            const approval = getApproval(trip);
            const progress = getProgress(trip);
            const owner = ownerOf(trip.owner);
            const place = destinations.find(
              (item) => item.id === trip.destinationId
            );
            const itinerary = sortedItinerary(trip);

            return (
              <div className="admin-trip" key={trip.id}>
                <div className="admin-trip-head">
                  <div>
                    <h3>{trip.title}</h3>
                    <p className="muted-line">
                      👤 {owner.name} · {owner.email}
                    </p>
                  </div>
                  <span className={`approval-badge static ${approval.toLowerCase()}`}>
                    {approval}
                  </span>
                </div>

                <div className="admin-trip-meta">
                  <div>
                    <span className="muted">Destination</span>
                    <strong>{place ? place.name : "Destination removed"}</strong>
                  </div>
                  <div>
                    <span className="muted">Dates</span>
                    <strong>
                      {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
                    </strong>
                    <span className="muted">
                      {dayCount(trip.startDate, trip.endDate)} days
                    </span>
                  </div>
                  <div>
                    <span className="muted">Budget</span>
                    <strong>{formatINR(trip.budget)}</strong>
                    <span className="muted">Spent {formatINR(totalSpent(trip))}</span>
                  </div>
                  <div>
                    <span className="muted">Requested</span>
                    <strong>
                      {trip.createdAt ? formatDate(trip.createdAt.slice(0, 10)) : "—"}
                    </strong>
                  </div>
                </div>

                {trip.notes && <p className="admin-trip-notes">“{trip.notes}”</p>}

                {trip.adminNote && (
                  <p className="admin-note">
                    <strong>Your note:</strong> {trip.adminNote}
                  </p>
                )}

                <details className="admin-details">
                  <summary>View itinerary ({itinerary.length} activities)</summary>
                  {itinerary.length === 0 ? (
                    <p className="empty-day">The user hasn't planned any activities yet.</p>
                  ) : (
                    itinerary.map((item) => (
                      <div className="admin-activity" key={item.id}>
                        <span className="activity-time">
                          Day {item.day} · {formatTime(item.time)}
                        </span>
                        <span>
                          {item.activity}
                          {item.location ? ` — ${item.location}` : ""}
                        </span>
                      </div>
                    ))
                  )}
                </details>

                <div className="admin-actions">
                  {approval === "Pending" && (
                    <>
                      <button className="primary-button" onClick={() => accept(trip)}>
                        ✓ Accept
                      </button>
                      <button className="danger-button" onClick={() => reject(trip)}>
                        ✕ Reject
                      </button>
                    </>
                  )}

                  {approval === "Accepted" && (
                    <>
                      <label className="progress-select">
                        <span>Progress</span>
                        <select
                          value={progress || "Planning"}
                          onChange={(e) => setProgress(trip, e.target.value)}
                        >
                          {PROGRESS_STEPS.map((step) => (
                            <option key={step} value={step}>
                              {step}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button className="danger-button" onClick={() => cancel(trip)}>
                        Cancel trip
                      </button>
                    </>
                  )}

                  {(approval === "Rejected" || approval === "Cancelled") && (
                    <>
                      <button className="outline-button" onClick={() => backToPending(trip)}>
                        ↺ Move back to pending
                      </button>
                      <button className="primary-button" onClick={() => accept(trip)}>
                        ✓ Accept
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AdminTrips;
