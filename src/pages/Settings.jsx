import React, { useState, useEffect } from "react";
import "./Settings.css";

const settingsData = [
  {
    title: "Organization",
    items: ["Profile", "Branding", "Currencies", "Opening Balances"],
  },
  {
    title: "Banking & Payments",
    items: ["Cards", "Bank Accounts"],
  },
  {
    title: "Taxes & Compliance",
    items: ["Taxes", "Users & Roles"],
  },
  {
    title: "Preferences",
    items: [
      "General",
      "Customers and Vendors",
      "Accountant",
      "Timesheet",
      "Customer Portal",
    ],
  },
  {
    title: "Sales",
    items: ["Estimates", "Invoices", "Recurring Invoices", "Credit Notes"],
  },
  {
    title: "Purchases",
    items: ["Expenses", "Recurring Bills", "Purchase Orders"],
  },
  {
    title: "Customisation",
    items: ["Reporting Tags", "Transaction Number Series"],
  },
];

function CardsPanel() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            bank: "Chase",
            type: "Credit",
            brand: "Visa",
            last4: "4242",
            expiry: "12/26",
            cardholder: "Harshith",
            balance: 50000,
            due: 12000,
            dueDate: "2026-04-15",
            theme: "linear-gradient(135deg, #1e3c72, #2a5298)",
          },
        ];
  });

  const [activeCard, setActiveCard] = useState(() => {
    const savedId = localStorage.getItem("activeCardId");
    return cards.find((c) => c.id == savedId) || cards[0] || null;
  });

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    bank: "",
    type: "Credit",
    brand: "",
    last4: "",
    expiry: "",
    cardholder: "",
    balance: "",
    due: "",
    dueDate: "",
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    if (activeCard) localStorage.setItem("activeCardId", activeCard.id);
  }, [activeCard]);

  const resetForm = () =>
    setForm({
      bank: "",
      type: "Credit",
      brand: "",
      last4: "",
      expiry: "",
      cardholder: "",
      balance: "",
      due: "",
      dueDate: "",
    });

  const handleAddCard = () => {
    const newCard = {
      ...form,
      id: Date.now(),
      theme: "linear-gradient(135deg, #667eea, #764ba2)",
    };
    setCards([...cards, newCard]);
    setActiveCard(newCard);
    setShowForm(false);
    resetForm();
  };

  const handleDelete = () => {
    const updated = cards.filter((c) => c.id !== activeCard.id);
    setCards(updated);
    setActiveCard(updated[0] || null);
  };

  const handleEdit = () => {
    const updated = cards.map((c) =>
      c.id === activeCard.id ? { ...activeCard, ...form } : c,
    );
    setCards(updated);
    setActiveCard({ ...activeCard, ...form });
    setEditMode(false);
    setShowForm(false);
  };

  return (
    <div className="cards-panel">
      <div className="cards-list">
        <h4>Your Saved Cards</h4>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card-list-item ${activeCard?.id === card.id ? "active" : ""}`}
            onClick={() => setActiveCard(card)}
          >
            <div>
              <strong>
                {card.bank} {card.brand}
              </strong>
              <span> •••• {card.last4}</span>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>{card.type}</div>
            </div>
          </div>
        ))}
        <button
          className="add-card-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
            setEditMode(false);
          }}
        >
          + Add New Card
        </button>
      </div>

      {activeCard && !showForm && (
        <div className="card-preview">
          <h4>{activeCard.type} Card Details</h4>
          <div className="visual-card" style={{ background: activeCard.theme }}>
            <p>{activeCard.bank}</p>
            <p className="vc-number">•••• •••• •••• {activeCard.last4}</p>
            <p>{activeCard.cardholder}</p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Balance:</strong> ₹{activeCard.balance}
            </p>
            {activeCard.type === "Credit" && (
              <>
                <p>
                  <strong>Due:</strong> ₹{activeCard.due}
                </p>
                <p>
                  <strong>Due Date:</strong> {activeCard.dueDate}
                </p>
              </>
            )}
          </div>
          <div className="card-actions">
            <button
              onClick={() => {
                setForm(activeCard);
                setEditMode(true);
                setShowForm(true);
              }}
            >
              Edit
            </button>
            <button className="danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="card-form">
          <h4>{editMode ? "Edit Card" : "Add Card"}</h4>
          <input
            placeholder="Bank Name"
            value={form.bank}
            onChange={(e) => setForm({ ...form, bank: e.target.value })}
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Credit</option>
            <option>Debit</option>
          </select>
          <input
            placeholder="Brand (Visa/Mastercard)"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <input
            placeholder="Last 4 Digits"
            maxLength="4"
            value={form.last4}
            onChange={(e) => setForm({ ...form, last4: e.target.value })}
          />
          <input
            placeholder="Cardholder Name"
            value={form.cardholder}
            onChange={(e) => setForm({ ...form, cardholder: e.target.value })}
          />
          <button onClick={editMode ? handleEdit : handleAddCard}>
            {editMode ? "Update Card" : "Save Card"}
          </button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default function Settings({ setActivePage }) {
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
      case "Cards":
        return <CardsPanel />;

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
      <h2>All Settings</h2>
      <input
        className="settings-search"
        placeholder="Search for settings (e.g. Taxes, Cards)..."
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
