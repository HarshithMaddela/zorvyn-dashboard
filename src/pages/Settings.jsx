import React, { useState, useEffect } from "react";
import "./Settings.css";
import EMICalculator from "./EMICalculator";

const settingsData = [
  {
    title: "Account",
    items: ["Profile", "Notifications"],
  },

  {
    title: "Finance",
    items: ["Cards", "Budgets", "Savings Goals", "Subscriptions"],
  },

  {
    title: "Tools",
    items: ["EMI Calculator"],
  },
];

export default function Settings({ setActivePage, openNotifications }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filtered = settingsData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase()),
    ),
  }));

  const renderDetailContent = (item) => {
    switch (item) {
      case "EMI Calculator":
        return <EMICalculator />;
      case "Currencies":
        return (
          <div className="settings-custom-content">
            <p>Manage the currencies you use for transactions.</p>
            <table className="settings-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Symbol</th>
                  <th>Exchange Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>USD</td>
                  <td>$</td>
                  <td>1.00</td>
                </tr>
                <tr>
                  <td>INR</td>
                  <td>₹</td>
                  <td>83.12</td>
                </tr>
                <tr>
                  <td>EUR</td>
                  <td>€</td>
                  <td>0.92</td>
                </tr>
              </tbody>
            </table>
            <button
              className="add-card-btn"
              style={{ borderStyle: "solid", marginTop: "20px" }}
            >
              + Add Currency
            </button>
          </div>
        );

      case "Taxes":
        return (
          <div className="card-form" style={{ marginTop: 0 }}>
            <label>Tax Registration Number</label>
            <input placeholder="GSTIN / VAT ID" />
            <label>Default Tax Rate (%)</label>
            <input type="number" placeholder="18" />
            <div style={{ display: "flex", gap: "10px" }}>
              <label>
                <input type="checkbox" /> Digital Services Tax
              </label>
            </div>
            <button>Save Tax Settings</button>
          </div>
        );

      case "Users & Roles":
        return (
          <div className="settings-custom-content">
            <div className="card-list-item">
              <div>
                <strong>Admin (You)</strong>
                <div style={{ fontSize: "12px" }}>Full Access</div>
              </div>
              <button
                className="close-x-btn"
                style={{ position: "relative", top: 0, right: 0 }}
              >
                ✎
              </button>
            </div>
            <div className="card-list-item">
              <div>
                <strong>Staff Member</strong>
                <div style={{ fontSize: "12px" }}>View Only</div>
              </div>
              <button
                className="close-x-btn"
                style={{ position: "relative", top: 0, right: 0 }}
              >
                ✎
              </button>
            </div>
            <button className="add-card-btn">+ Invite User</button>
          </div>
        );

      case "General":
        return (
          <div className="card-form" style={{ marginTop: 0 }}>
            <label>Language</label>
            <select>
              <option>English</option>
              <option>Spanish</option>
            </select>
            <label>Time Zone</label>
            <select>
              <option>(GMT+05:30) India Standard Time</option>
            </select>
            <label>Date Format</label>
            <select>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
            <button>Update Preferences</button>
          </div>
        );

      case "Branding":
        return (
          <div
            className="settings-custom-content"
            style={{ textAlign: "center", padding: "20px" }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                background: "var(--accent-soft)",
                borderRadius: "50%",
                margin: "0 auto 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed var(--border)",
              }}
            >
              Upload Logo
            </div>
            <input
              type="color"
              defaultValue="#6366f1"
              style={{
                width: "50px",
                height: "50px",
                padding: 0,
                border: "none",
                borderRadius: "5px",
              }}
            />
            <p>Primary Brand Color</p>
            <button className="add-card-btn" style={{ borderStyle: "solid" }}>
              Save Branding
            </button>
          </div>
        );

      default:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <p className="placeholder-text">
              Configure your {item} settings below:
            </p>
            <label>
              <input type="checkbox" /> Enable {item} Tracking
            </label>
            <label>
              <input type="checkbox" /> Send Email Alerts
            </label>
            <label>
              Default Template:
              <select>
                <option>Modern</option>
                <option>Classic</option>
              </select>
            </label>
            <button
              className="add-card-btn"
              style={{ background: "#6366f1", color: "white", border: "none" }}
            >
              Save {item}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="settings-page">
      <h2 className="text-gradient">Explore</h2>
      <p className="explore-subtitle">
        Discover financial tools, cards, reports, budgets, goals and
        productivity features.
      </p>{" "}
      <input
        className="settings-search"
        placeholder="Search Explore features (Cards, Reports, Goals, Taxes...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="settings-grid">
        {filtered.map((section, i) => (
          <React.Fragment key={i}>
            <div className="settings-card">
              <h3>{section.title}</h3>
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`settings-item ${selected === item ? "active" : ""}`}
                  onClick={() => {
                    if (item === "Profile") {
                      setSelected(null);
                      setActivePage("user");
                    } else if (item === "Notifications") {
                      setSelected(null);
                      openNotifications();
                    } else if (item === "Cards") {
                      setSelected(null);
                      setActivePage("wallet");
                    } else if (item === "Budgets") {
                      setSelected(null);
                      setActivePage("budgets");
                    } else if (item === "Savings Goals") {
                      setSelected(null);
                      setActivePage("goals");
                    } else if (item === "Subscriptions") {
                      setSelected(null);
                      setActivePage("subscriptions");
                    } else {
                      setSelected(item);
                      setSelectedIndex(i);
                    }
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {selected && selectedIndex === i && (
              <div className="settings-detail inline">
                <div className="settings-header">
                  <h3>{selected}</h3>
                  <button
                    className="close-x-btn"
                    onClick={() => setSelected(null)}
                  >
                    ✕
                  </button>
                </div>
                {renderDetailContent(selected)}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
