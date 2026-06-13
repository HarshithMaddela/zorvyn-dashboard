import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getSubscriptions,
  addSubscription,
  deleteSubscription,
} from "../services/subscriptionService";

import "./Subscriptions.css";

export default function Subscriptions() {
  const { user } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);

  const [form, setForm] = useState({
    name: "",
    cost: "",
    cycle: "Monthly",
    renewalDate: "",
    category: "",
  });

  useEffect(() => {
    if (!user) return;
    loadSubscriptions();
  }, [user]);

  async function loadSubscriptions() {
    const data = await getSubscriptions(user.uid);
    setSubscriptions(data);
  }

  async function handleAdd() {
    if (!form.name || !form.cost) return;

    await addSubscription(user.uid, {
      ...form,
      cost: Number(form.cost),
      createdAt: Date.now(),
    });

    setForm({
      name: "",
      cost: "",
      cycle: "Monthly",
      renewalDate: "",
      category: "",
    });

    loadSubscriptions();
  }

  async function handleDelete(id) {
    await deleteSubscription(user.uid, id);
    loadSubscriptions();
  }

  const monthlySpend = subscriptions.reduce(
    (sum, sub) => sum + (sub.cycle === "Yearly" ? sub.cost / 12 : sub.cost),
    0,
  );

  const yearlySpend = monthlySpend * 12;

  const getStatus = (renewalDate) => {
    if (!renewalDate) return "safe";

    const today = new Date();
    const renewal = new Date(renewalDate);

    const diff = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));

    if (diff <= 3) return "danger";
    if (diff <= 7) return "warning";

    return "safe";
  };

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-header">
        <h2 className="text-gradient">Subscription Manager</h2>

        <p>Keep track of recurring services and upcoming renewals.</p>
      </div>

      <div className="subscriptions-stats">
        <div className="sub-stat-card">
          <h4>Active Subscriptions</h4>
          <p>{subscriptions.length}</p>
        </div>

        <div className="sub-stat-card">
          <h4>Monthly Spend</h4>
          <p>₹{monthlySpend.toFixed(0)}</p>
        </div>

        <div className="sub-stat-card">
          <h4>Yearly Spend</h4>
          <p>₹{yearlySpend.toFixed(0)}</p>
        </div>
      </div>

      <div className="subscription-form glass-panel">
        <h3>Add Subscription</h3>

        <div className="subscription-form-grid">
          <input
            placeholder="Netflix..."
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Cost"
            value={form.cost}
            onChange={(e) =>
              setForm({
                ...form,
                cost: e.target.value,
              })
            }
          />

          <select
            value={form.cycle}
            onChange={(e) =>
              setForm({
                ...form,
                cycle: e.target.value,
              })
            }
          >
            <option>Monthly</option>
            <option>Yearly</option>
          </select>

          <input
            type="date"
            value={form.renewalDate}
            onChange={(e) =>
              setForm({
                ...form,
                renewalDate: e.target.value,
              })
            }
          />

          <input
            placeholder="Type(Streaming, Music, Other...)"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <button onClick={handleAdd}>Add Subscription</button>
        </div>
      </div>

      <div className="subscriptions-grid">
        {subscriptions.length === 0 ? (
          <div className="empty-subscriptions">No subscriptions added yet.</div>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub.id} className="subscription-card">
              <div className="subscription-top">
                <div>
                  <h3>{sub.name}</h3>
                  <span>{sub.category}</span>
                </div>

                <span
                  className={`subscription-status ${getStatus(
                    sub.renewalDate,
                  )}`}
                >
                  {sub.cycle}
                </span>
              </div>

              <div className="subscription-price">₹{sub.cost}</div>

              <div className="subscription-meta">
                Renews on:
                <strong> {sub.renewalDate || "Not Set"}</strong>
              </div>

              <button
                className="delete-sub-btn"
                onClick={() => handleDelete(sub.id)}
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
