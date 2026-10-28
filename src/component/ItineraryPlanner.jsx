import React, { useState } from "react";
import {
  uid,
  addDays,
  dayCount,
  formatDate,
  formatTime
} from "../utils/helpers";
import { getSuggestedActivities } from "../data/activities";

const EMPTY_FORM = { day: 1, time: "", activity: "", location: "", notes: "" };

// Day-wise itinerary: add, edit and remove activities for each day of a trip.
// `destination` (optional) is used to show ready-made activity ideas.
function ItineraryPlanner({ trip, onChange, destination }) {
  const itinerary = trip.itinerary || [];
  const { items: suggestions, generic } = getSuggestedActivities(destination);
  const [suggestDay, setSuggestDay] = useState(1);
  const [notice, setNotice] = useState("");

  const tripDays = dayCount(trip.startDate, trip.endDate);
  const lastUsedDay = Math.max(0, ...itinerary.map((item) => item.day));
  const totalDays = Math.max(tripDays, lastUsedDay);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function setField(name, value) {
    setForm({ ...form, [name]: value });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.activity.trim()) {
      setError("Please describe the activity.");
      return;
    }

    const entry = {
      day: Number(form.day),
      time: form.time,
      activity: form.activity.trim(),
      location: form.location.trim(),
      notes: form.notes.trim()
    };

    if (editingId) {
      onChange(
        itinerary.map((item) =>
          item.id === editingId ? { ...item, ...entry } : item
        )
      );
    } else {
      onChange([...itinerary, { id: uid(), ...entry }]);
    }

    // keep the chosen day so several activities can be added quickly
    setForm({ ...EMPTY_FORM, day: entry.day });
    setEditingId(null);
    setError("");
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      day: item.day,
      time: item.time,
      activity: item.activity,
      location: item.location,
      notes: item.notes
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toEntry(suggestion, day) {
    return {
      id: uid(),
      day,
      time: suggestion.time || "",
      activity: suggestion.title,
      location: suggestion.location || "",
      notes: suggestion.tip || "",
      suggestionId: suggestion.id
    };
  }

  // One-click add of a suggested activity to the chosen day.
  function addSuggestion(suggestion, day) {
    setNotice("");
    onChange([...itinerary, toEntry(suggestion, day)]);
  }

  function isAdded(suggestion, day) {
    return itinerary.some(
      (item) => item.suggestionId === suggestion.id && item.day === day
    );
  }

  // Spreads the ideas that are not in the itinerary yet across the trip days
  // (at most 3 per day). The user can still edit or delete anything afterwards.
  function autoPlan() {
    const missing = suggestions.filter(
      (item) => !itinerary.some((entry) => entry.suggestionId === item.id)
    );

    if (missing.length === 0) {
      setNotice("All the suggested activities are already in your itinerary.");
      return;
    }

    const days = Math.max(1, tripDays);
    const perDay = Math.min(3, Math.ceil(missing.length / days));
    const picked = missing.slice(0, perDay * days);

    onChange([
      ...itinerary,
      ...picked.map((item, index) => toEntry(item, Math.floor(index / perDay) + 1))
    ]);
    setNotice(
      `Added ${picked.length} activities across your trip days. Edit or delete anything you don't want.`
    );
  }

  function handleDelete(id) {
    onChange(itinerary.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  }

  function activitiesForDay(day) {
    return itinerary
      .filter((item) => item.day === day)
      .sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
  }

  const dayNumbers = Array.from({ length: totalDays }, (_, index) => index + 1);
  const activeDay = Math.min(suggestDay, totalDays) || 1;

  return (
    <div>
      {suggestions.length > 0 && (
        <div className="suggest-panel">
          <div className="suggest-head">
            <div>
              <h3 className="form-title">
                Things to do in {destination.name}
              </h3>
              <p className="suggest-sub">
                {generic
                  ? "General ideas for this kind of place. Add the ones you like."
                  : "Ready-made ideas for your trip. Pick a day and tap Add."}
              </p>
            </div>

            <div className="suggest-controls">
              <label className="suggest-day">
                <span>Add to</span>
                <select
                  value={activeDay}
                  onChange={(e) => setSuggestDay(Number(e.target.value))}
                >
                  {dayNumbers.map((day) => (
                    <option key={day} value={day}>
                      Day {day}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="outline-button small"
                onClick={autoPlan}
              >
                ✨ Auto-plan my days
              </button>
            </div>
          </div>

          {notice && <p className="form-success">{notice}</p>}

          <div className="suggest-grid">
            {suggestions.map((item) => {
              const added = isAdded(item, activeDay);

              return (
                <div className="suggest-card" key={item.id}>
                  {item.tag && (
                    <span className={`suggest-tag ${item.tag.toLowerCase()}`}>
                      {item.tag}
                    </span>
                  )}
                  <h4>{item.title}</h4>
                  <p className="suggest-meta">
                    {item.location && <>📍 {item.location}</>}
                    {item.time && <> · 🕒 {formatTime(item.time)}</>}
                    {item.duration && <> · {item.duration}</>}
                  </p>
                  {item.tip && <p className="suggest-tip">{item.tip}</p>}

                  <button
                    type="button"
                    className={added ? "suggest-add added" : "suggest-add"}
                    disabled={added}
                    onClick={() => addSuggestion(item, activeDay)}
                  >
                    {added ? `✓ Added to Day ${activeDay}` : `+ Add to Day ${activeDay}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h3 className="form-title">
          {editingId ? "Edit activity" : "Add an activity"}
        </h3>

        <div className="form-grid three">
          <div className="form-field">
            <label htmlFor="act-day">Day</label>
            <select
              id="act-day"
              value={form.day}
              onChange={(e) => setField("day", e.target.value)}
            >
              {dayNumbers.map((day) => (
                <option key={day} value={day}>
                  Day {day}
                  {day <= tripDays
                    ? ` — ${formatDate(addDays(trip.startDate, day - 1))}`
                    : " (outside trip dates)"}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="act-time">Time</label>
            <input
              id="act-time"
              type="time"
              value={form.time}
              onChange={(e) => setField("time", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="act-location">Location</label>
            <input
              id="act-location"
              type="text"
              placeholder="e.g. Eravikulam National Park"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </div>

          <div className="form-field full">
            <label htmlFor="act-activity">Activity</label>
            <input
              id="act-activity"
              type="text"
              placeholder="e.g. Sunrise trek and tea garden visit"
              value={form.activity}
              onChange={(e) => setField("activity", e.target.value)}
              className={error ? "input-error" : ""}
            />
            {error && <span className="field-error">{error}</span>}
          </div>

          <div className="form-field full">
            <label htmlFor="act-notes">Personal notes (optional)</label>
            <textarea
              id="act-notes"
              rows="2"
              placeholder="Tickets, reminders, things to carry..."
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          {editingId && (
            <button type="button" className="outline-button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
          <button type="submit" className="primary-button">
            {editingId ? "Save activity" : "Add activity"}
          </button>
        </div>
      </form>

      <div className="day-list">
        {dayNumbers.map((day) => {
          const items = activitiesForDay(day);

          return (
            <div className="day-card" key={day}>
              <div className="day-header">
                <h3>Day {day}</h3>
                <span className="muted">
                  {day <= tripDays
                    ? formatDate(addDays(trip.startDate, day - 1))
                    : "Outside trip dates"}
                </span>
              </div>

              {items.length === 0 ? (
                <p className="empty-day">Nothing planned yet for this day.</p>
              ) : (
                items.map((item) => (
                  <div className="activity-row" key={item.id}>
                    <span className="activity-time">{formatTime(item.time)}</span>

                    <div>
                      <div className="activity-title">{item.activity}</div>
                      {item.location && (
                        <div className="activity-sub">📍 {item.location}</div>
                      )}
                      {item.notes && (
                        <div className="activity-sub">📝 {item.notes}</div>
                      )}
                    </div>

                    <div className="row-actions">
                      <button className="icon-button" onClick={() => startEdit(item)}>
                        Edit
                      </button>
                      <button
                        className="icon-button danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItineraryPlanner;
