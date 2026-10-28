import React, { useState } from "react";
import {
  uid,
  formatINR,
  formatDate,
  todayISO,
  totalSpent,
  remaining
} from "../utils/helpers";

const CATEGORIES = ["Stay", "Food", "Transport", "Activities", "Shopping", "Other"];

function BudgetTracker({ trip, onChange }) {
  const expenses = trip.expenses || [];

  const [form, setForm] = useState({
    title: "",
    category: "Food",
    amount: "",
    date: todayISO()
  });
  const [errors, setErrors] = useState({});

  const budget = Number(trip.budget || 0);
  const spent = totalSpent(trip);
  const left = remaining(trip); // Remaining = Total Budget - Sum of Expenses
  const isOver = left < 0;
  const percent = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const found = {};
    if (!form.title.trim()) found.title = "What was this expense for?";
    if (form.amount === "" || Number(form.amount) <= 0) {
      found.amount = "Enter an amount greater than 0.";
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onChange([
      ...expenses,
      {
        id: uid(),
        title: form.title.trim(),
        category: form.category,
        amount: Number(form.amount),
        date: form.date
      }
    ]);

    setForm({ ...form, title: "", amount: "" });
  }

  function handleDelete(id) {
    onChange(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <div>
      <div className="budget-summary">
        <div className="stat-tile">
          <span className="muted">Total budget</span>
          <strong>{formatINR(budget)}</strong>
        </div>
        <div className="stat-tile">
          <span className="muted">Total spent</span>
          <strong>{formatINR(spent)}</strong>
        </div>
        <div className="stat-tile">
          <span className="muted">{isOver ? "Over budget by" : "Remaining"}</span>
          <strong className={isOver ? "over" : ""}>
            {formatINR(Math.abs(left))}
          </strong>
        </div>
      </div>

      <div className="progress" aria-label="Budget used">
        <div
          className={isOver ? "progress-bar over" : "progress-bar"}
          style={{ width: `${percent}%` }}
        />
      </div>

      {isOver ? (
        <div className="budget-alert" role="alert">
          ⚠ You have exceeded your budget by {formatINR(-left)}. Consider
          reviewing your expenses or increasing the trip budget.
        </div>
      ) : (
        <div className="budget-ok">
          ✓ You are within budget — {formatINR(left)} left to spend.
        </div>
      )}

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h3 className="form-title">Add an expense</h3>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="exp-title">Description</label>
            <input
              id="exp-title"
              name="title"
              type="text"
              placeholder="e.g. Houseboat booking"
              value={form.title}
              onChange={handleChange}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="exp-category">Category</label>
            <select
              id="exp-category"
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
            <label htmlFor="exp-amount">Amount (₹)</label>
            <input
              id="exp-amount"
              name="amount"
              type="number"
              min="1"
              placeholder="e.g. 2500"
              value={form.amount}
              onChange={handleChange}
              className={errors.amount ? "input-error" : ""}
            />
            {errors.amount && <span className="field-error">{errors.amount}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="exp-date">Date</label>
            <input
              id="exp-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Add expense
          </button>
        </div>
      </form>

      <div className="day-card">
        <div className="day-header">
          <h3>Expenses</h3>
          <span className="muted">{expenses.length} recorded</span>
        </div>

        {expenses.length === 0 ? (
          <p className="empty-day">No expenses added yet.</p>
        ) : (
          expenses.map((expense) => (
            <div className="expense-row" key={expense.id}>
              <div>
                <div className="activity-title">{expense.title}</div>
                <div className="activity-sub">
                  {expense.category}
                  {expense.date ? ` · ${formatDate(expense.date)}` : ""}
                </div>
              </div>
              <strong>{formatINR(expense.amount)}</strong>
              <button
                className="icon-button danger"
                onClick={() => handleDelete(expense.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetTracker;
