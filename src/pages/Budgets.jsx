import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Budgets.css";

import { getBudgets, addBudget, deleteBudget } from "../services/budgetService";

export default function Budgets({ transactions }) {
  const { user } = useAuth();

  const [budgets, setBudgets] = useState([]);

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (!user) return;

    loadBudgets();
  }, [user]);

  async function loadBudgets() {
    const data = await getBudgets(user.uid);
    setBudgets(data);
  }

  async function handleAddBudget() {
    if (!category || !limit) return;

    await addBudget(user.uid, {
      category,
      limit: Number(limit),
    });

    setCategory("");
    setLimit("");

    loadBudgets();
  }

  return (
    <div className="budgets-page">
      <div className="budget-header">
        <h2 className="text-gradient">Budget Manager</h2>

        <p>Track spending limits and stay on top of your finances.</p>
      </div>

      <div className="budget-form">
        <div className="budget-form-grid">
          {" "}
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Budget Amount"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
          <button className="create-budget-btn" onClick={handleAddBudget}>
            Create Budget
          </button>
        </div>
      </div>

      <div className="budgets-grid">
        {budgets.map((budget) => {
          const spent = transactions
            .filter(
              (t) => t.type === "expense" && t.category === budget.category,
            )
            .reduce((sum, t) => sum + Number(t.amount), 0);

          const percentage = Math.min((spent / budget.limit) * 100, 100);

          return (
            <div key={budget.id} className="budget-card">
              <div className="budget-card-top">
                <h3>{budget.category}</h3>

                <span className="budget-percent">{percentage.toFixed(0)}%</span>
              </div>

              <div className="budget-values">
                <div className="budget-spent">₹{spent.toLocaleString()}</div>

                <div className="budget-limit">
                  of ₹{budget.limit.toLocaleString()}
                </div>
              </div>

              <div className="progress-track">
                <div
                  className={`progress-fill ${
                    percentage >= 100
                      ? "danger"
                      : percentage >= 80
                        ? "warning"
                        : "safe"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              {percentage >= 100 && (
                <div className="budget-status danger">⚠ Budget Exceeded</div>
              )}

              {percentage >= 80 && percentage < 100 && (
                <div className="budget-status warning">
                  ⚡ Approaching Limit
                </div>
              )}

              {percentage < 80 && (
                <div className="budget-status safe">✓ Budget Healthy</div>
              )}
              <button
                className="delete-budget-btn"
                onClick={() => {
                  console.log("Deleting:", budget);
                  deleteBudget(user.uid, budget.id).then(loadBudgets);
                }}
              >
                Delete Budget
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
