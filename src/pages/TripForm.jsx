import React, { useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import destinations from "../data/destination";
import useTrips from "../utils/useTrips";

// Used for both "create trip" (/trips/new) and "edit trip" (/trips/:id/edit).
function TripForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getTrip, addTrip, updateTrip } = useTrips();

  const existing = id ? getTrip(id) : null;
  const presetDestination = destinations.find(
    (item) => String(item.id) === searchParams.get("destination")
  );

  const [values, setValues] = useState(() => {
    if (existing) {
      return {
        destinationId: String(existing.destinationId),
        title: existing.title,
        startDate: existing.startDate,
        endDate: existing.endDate,
        budget: String(existing.budget),
        notes: existing.notes || ""
      };
    }

    return {
      destinationId: presetDestination ? String(presetDestination.id) : "",
      title: presetDestination ? `Trip to ${presetDestination.name}` : "",
      startDate: "",
      endDate: "",
      budget: presetDestination ? String(presetDestination.cost) : "",
      notes: ""
    };
  });
  const [errors, setErrors] = useState({});

  if (id && !existing) {
    return <Navigate to="/trips" replace />;
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  // Picking a destination pre-fills the title and budget if they are empty.
  function handleDestinationChange(e) {
    const place = destinations.find(
      (item) => String(item.id) === e.target.value
    );

    setValues({
      ...values,
      destinationId: e.target.value,
      title: values.title.trim() || !place ? values.title : `Trip to ${place.name}`,
      budget: values.budget || !place ? values.budget : String(place.cost)
    });
  }

  function validate() {
    const found = {};

    if (!values.destinationId) found.destinationId = "Please choose a destination.";
    if (!values.title.trim()) found.title = "Give your trip a name.";
    if (!values.startDate) found.startDate = "Pick a start date.";
    if (!values.endDate) found.endDate = "Pick an end date.";

    if (values.startDate && values.endDate && values.endDate < values.startDate) {
      found.endDate = "End date can't be before the start date.";
    }

    if (values.budget === "" || Number(values.budget) <= 0) {
      found.budget = "Enter a budget greater than 0.";
    }

    return found;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      destinationId: Number(values.destinationId),
      title: values.title.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
      budget: Number(values.budget),
      notes: values.notes.trim()
    };

    if (existing) {
      updateTrip(existing.id, data);
      navigate(`/trips/${existing.id}`);
    } else {
      const trip = addTrip(data);
      navigate(`/trips/${trip.id}`);
    }
  }

  return (
    <section className="section page-narrow">
      <div className="explore-heading">
        <span className="eyebrow">{existing ? "EDIT TRIP" : "NEW TRIP"}</span>
        <h1>{existing ? "Update your trip" : "Plan a new trip"}</h1>
        <p>Choose where you're going, when, and how much you plan to spend.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field full">
            <label htmlFor="destinationId">Destination</label>
            <select
              id="destinationId"
              name="destinationId"
              value={values.destinationId}
              onChange={handleDestinationChange}
              className={errors.destinationId ? "input-error" : ""}
            >
              <option value="">Select a destination</option>
              {destinations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {item.location}
                </option>
              ))}
            </select>
            {errors.destinationId && (
              <span className="field-error">{errors.destinationId}</span>
            )}
          </div>

          <div className="form-field full">
            <label htmlFor="title">Trip name</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Family holiday in Munnar"
              value={values.title}
              onChange={handleChange}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="startDate">Start date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={values.startDate}
              onChange={handleChange}
              className={errors.startDate ? "input-error" : ""}
            />
            {errors.startDate && (
              <span className="field-error">{errors.startDate}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="endDate">End date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              min={values.startDate || undefined}
              value={values.endDate}
              onChange={handleChange}
              className={errors.endDate ? "input-error" : ""}
            />
            {errors.endDate && (
              <span className="field-error">{errors.endDate}</span>
            )}
          </div>

          <div className="form-field full">
            <label htmlFor="budget">Total budget (₹)</label>
            <input
              id="budget"
              name="budget"
              type="number"
              min="1"
              placeholder="e.g. 15000"
              value={values.budget}
              onChange={handleChange}
              className={errors.budget ? "input-error" : ""}
            />
            {errors.budget && <span className="field-error">{errors.budget}</span>}
          </div>

          <div className="form-field full">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Anything you want to remember about this trip"
              value={values.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigate(existing ? `/trips/${existing.id}` : "/trips")}
          >
            Cancel
          </button>
          <button type="submit" className="primary-button">
            {existing ? "Save changes" : "Create trip"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TripForm;
