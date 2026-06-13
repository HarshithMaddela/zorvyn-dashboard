import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} from "../services/goalService";

import "./Goals.css";

export default function Goals() {
  const { user } = useAuth();

  const [goals, setGoals] = useState([]);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (!user) return;
    loadGoals();
  }, [user]);

  async function loadGoals() {
    const data = await getGoals(user.uid);
    setGoals(data);
  }

  async function handleCreateGoal() {
    if (!title || !target) return;

    await addGoal(user.uid, {
      title,
      target: Number(target),
      saved: 0,
    });

    setTitle("");
    setTarget("");

    loadGoals();
  }

  async function handleAddSavings(goal) {
    const amount = Number(prompt("Enter amount to add"));

    if (!amount || amount <= 0) return;

    await updateGoal(user.uid, goal.id, {
      ...goal,
      saved: goal.saved + amount,
    });

    loadGoals();
  }

  async function handleDeleteGoal(id) {
    await deleteGoal(user.uid, id);
    loadGoals();
  }

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2 className="text-gradient">Savings Goals</h2>
        <p>Plan your future and track your progress.</p>
      </div>

      <div className="goal-form">
        <div className="goal-form-grid">
          <input
            placeholder="Goal Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Target Amount"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <button className="create-goal-btn" onClick={handleCreateGoal}>
            Create Goal
          </button>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="empty-goals">
          No goals yet. Create your first savings goal 🚀
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => {
            const progress = Math.min((goal.saved / goal.target) * 100, 100);

            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-top">
                  <h3>{goal.title}</h3>

                  <span className="goal-percent">{progress.toFixed(0)}%</span>
                </div>

                <div className="goal-values">
                  <div className="goal-saved">
                    ₹{goal.saved.toLocaleString()}
                  </div>

                  <div className="goal-target">
                    of ₹{goal.target.toLocaleString()}
                  </div>
                </div>

                <div className="goal-progress-track">
                  <div
                    className="goal-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                {progress >= 100 ? (
                  <div className="goal-complete">🎉 Goal Completed</div>
                ) : (
                  <div className="goal-remaining">
                    ₹{(goal.target - goal.saved).toLocaleString()}
                    remaining
                  </div>
                )}

                <div className="goal-actions">
                  <button
                    className="add-money-btn"
                    onClick={() => handleAddSavings(goal)}
                  >
                    Add Savings
                  </button>

                  <button
                    className="delete-goal-btn"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
