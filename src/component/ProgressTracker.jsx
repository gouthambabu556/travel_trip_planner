import React from "react";
import { PROGRESS_STEPS, getApproval, getProgress } from "../utils/helpers";

const MESSAGES = {
  Pending: "Your trip is waiting for the admin to review it.",
  Accepted: "Your trip has been accepted by the admin.",
  Rejected: "Your trip request was rejected by the admin.",
  Cancelled: "This trip was cancelled by the admin."
};

// Shows the admin's decision and, for accepted trips, how far along it is.
function ProgressTracker({ trip }) {
  const approval = getApproval(trip);
  const progress = getProgress(trip);
  const currentIndex = PROGRESS_STEPS.indexOf(progress || "Planning");

  return (
    <div className={`approval-panel ${approval.toLowerCase()}`}>
      <div className="approval-head">
        <span className={`approval-badge static ${approval.toLowerCase()}`}>
          {approval}
        </span>
        <span>{MESSAGES[approval]}</span>
      </div>

      {approval === "Accepted" && (
        <ol className="progress-steps">
          {PROGRESS_STEPS.map((step, index) => (
            <li
              key={step}
              className={
                index < currentIndex
                  ? "done"
                  : index === currentIndex
                  ? "current"
                  : ""
              }
            >
              <span className="step-dot">{index < currentIndex ? "✓" : index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      )}

      {trip.adminNote && (
        <p className="admin-note">
          <strong>Note from admin:</strong> {trip.adminNote}
        </p>
      )}
    </div>
  );
}

export default ProgressTracker;
