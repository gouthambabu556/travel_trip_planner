// Shared helpers: localStorage access, dates, money and budget maths.

export function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked - ignore for this demo app
  }
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function formatINR(amount) {
  return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

/* ---------- dates (all dates are "YYYY-MM-DD" strings) ---------- */

export function parseDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function addDays(iso, count) {
  const date = parseDate(iso);
  date.setDate(date.getDate() + count);
  return toISO(date);
}

export function formatDate(iso) {
  if (!iso) return "";
  return parseDate(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function formatTime(time) {
  if (!time) return "Anytime";
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

// Number of days from start to end, both included.
export function dayCount(start, end) {
  if (!start || !end) return 0;
  return Math.round((parseDate(end) - parseDate(start)) / 86400000) + 1;
}

export function tripStatus(trip) {
  const today = todayISO();
  if (today < trip.startDate) return "Upcoming";
  if (today > trip.endDate) return "Completed";
  return "Ongoing";
}

/* ---------- budget ---------- */

export function totalSpent(trip) {
  return (trip.expenses || []).reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );
}

// Remaining = Total Budget - Sum of Expenses
export function remaining(trip) {
  return Number(trip.budget || 0) - totalSpent(trip);
}

/* ---------- admin approval & progress ---------- */

export const APPROVAL_STATES = ["Pending", "Accepted", "Rejected", "Cancelled"];

// Steps the admin moves an accepted trip through.
export const PROGRESS_STEPS = [
  "Planning",
  "Booking confirmed",
  "In progress",
  "Completed"
];

// Trips created before the admin feature have no approval field = Pending.
export function getApproval(trip) {
  return APPROVAL_STATES.includes(trip.approval) ? trip.approval : "Pending";
}

export function getProgress(trip) {
  return PROGRESS_STEPS.includes(trip.progress) ? trip.progress : null;
}
