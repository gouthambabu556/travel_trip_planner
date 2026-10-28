import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDestinations, {
  CATEGORIES,
  DEFAULT_IMAGE
} from "../utils/useDestinations";
import useAdminTrips from "../utils/useAdminTrips";
import { readJSON, formatINR, getApproval } from "../utils/helpers";

const EMPTY_FORM = {
  name: "",
  location: "",
  category: "Beach",
  cost: "",
  image: "",
  description: "",
  activities: ""
};

function AdminDashboard() {
  const { destinations, addDestination, updateDestination, deleteDestination } =
    useDestinations();
  const { trips } = useAdminTrips();
  const userCount = readJSON("travel_users", []).length;

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const countOf = (state) =>
    trips.filter((trip) => getApproval(trip) === state).length;
  const pendingCount = countOf("Pending");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const found = {};

    if (!form.name.trim()) found.name = "Enter the package name.";
    if (!form.location.trim()) found.location = "Enter the location.";
    if (form.cost === "" || Number(form.cost) <= 0) {
      found.cost = "Enter a cost greater than 0.";
    }
    if (!form.description.trim()) found.description = "Add a short description.";
    if (form.image.trim() && !/^https?:\/\//i.test(form.image.trim())) {
      found.image = "Image link must start with http:// or https://";
    }

    return found;
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      name: form.name.trim(),
      location: form.location.trim(),
      category: form.category,
      cost: Number(form.cost),
      description: form.description.trim(),
      image: form.image.trim() || DEFAULT_IMAGE,
      // one suggested activity per line; empty = use ideas for the category
      activities: form.activities
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    };

    if (editingId) {
      updateDestination(editingId, data);
      setMessage(`"${data.name}" was updated.`);
    } else {
      addDestination(data);
      setMessage(`"${data.name}" was added. Users can now see it on Explore.`);
    }

    resetForm();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      location: item.location,
      category: item.category,
      cost: String(item.cost),
      image: item.image === DEFAULT_IMAGE ? "" : item.image,
      description: item.description,
      activities: (item.activities || []).join("\n")
    });
    setErrors({});
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(item) {
    const used = trips.filter((trip) => trip.destinationId === item.id).length;
    const warning = used
      ? `\n\n${used} user trip(s) use this package. They will show "Destination removed".`
      : "";

    if (window.confirm(`Delete "${item.name}"?${warning}`)) {
      deleteDestination(item.id);
      if (editingId === item.id) resetForm();
    }
  }

  return (
    <section className="section explore-page">
      <div className="explore-heading">
        <span className="eyebrow">ADMIN DASHBOARD</span>
        <h1>Welcome, Admin</h1>
        <p>Add travel packages and keep an eye on trip requests.</p>
      </div>

      <div className="admin-stats">
        <div className="stat-tile">
          <span className="muted">Registered users</span>
          <strong>{userCount}</strong>
        </div>
        <div className="stat-tile">
          <span className="muted">Total trips</span>
          <strong>{trips.length}</strong>
        </div>
        <div className="stat-tile highlight">
          <span className="muted">Pending requests</span>
          <strong>{pendingCount}</strong>
          <Link to="/admin/trips" className="stat-link">
            Review now →
          </Link>
        </div>
        <div className="stat-tile">
          <span className="muted">Accepted trips</span>
          <strong>{countOf("Accepted")}</strong>
        </div>
        <div className="stat-tile">
          <span className="muted">Packages</span>
          <strong>{destinations.length}</strong>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h3 className="form-title">
          {editingId ? "Edit package" : "Add a new travel package"}
        </h3>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="pkg-name">Package / place name</label>
            <input
              id="pkg-name"
              name="name"
              type="text"
              placeholder="e.g. Coorg"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="pkg-location">Location</label>
            <input
              id="pkg-location"
              name="location"
              type="text"
              placeholder="e.g. Karnataka, India"
              value={form.location}
              onChange={handleChange}
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && (
              <span className="field-error">{errors.location}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="pkg-category">Category</label>
            <select
              id="pkg-category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="pkg-cost">Estimated cost (₹)</label>
            <input
              id="pkg-cost"
              name="cost"
              type="number"
              min="1"
              placeholder="e.g. 6500"
              value={form.cost}
              onChange={handleChange}
              className={errors.cost ? "input-error" : ""}
            />
            {errors.cost && <span className="field-error">{errors.cost}</span>}
          </div>

          <div className="form-field full">
            <label htmlFor="pkg-image">Image link (optional)</label>
            <input
              id="pkg-image"
              name="image"
              type="text"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <span className="field-error">{errors.image}</span>}
          </div>

          <div className="form-field full">
            <label htmlFor="pkg-description">Description</label>
            <textarea
              id="pkg-description"
              name="description"
              rows="3"
              placeholder="What makes this place worth visiting?"
              value={form.description}
              onChange={handleChange}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && (
              <span className="field-error">{errors.description}</span>
            )}
          </div>

          <div className="form-field full">
            <label htmlFor="pkg-activities">
              Suggested activities (optional, one per line)
            </label>
            <textarea
              id="pkg-activities"
              name="activities"
              rows="4"
              placeholder={"Jeep safari\nCoffee estate walk\nSunset at the viewpoint"}
              value={form.activities}
              onChange={handleChange}
            />
            <span className="field-hint">
              Users can add these to their itinerary with one tap. If you leave
              this empty, general ideas for the category are shown instead.
            </span>
          </div>
        </div>

        {message && <p className="form-success">{message}</p>}

        <div className="form-actions">
          {editingId && (
            <button type="button" className="outline-button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
          <button type="submit" className="primary-button">
            {editingId ? "Save package" : "Add package"}
          </button>
        </div>
      </form>

      <div className="day-card">
        <div className="day-header">
          <h3>All packages</h3>
          <span className="muted">{destinations.length} in total</span>
        </div>

        {destinations.map((item) => (
          <div className="package-row" key={item.id}>
            <img src={item.image} alt={item.name} loading="lazy" />

            <div>
              <div className="activity-title">{item.name}</div>
              <div className="activity-sub">
                📍 {item.location} · {item.category} · {formatINR(item.cost)}
              </div>
            </div>

            {item.custom ? (
              <div className="row-actions">
                <button className="icon-button" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button
                  className="icon-button danger"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <span className="built-in-tag">Built-in</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
