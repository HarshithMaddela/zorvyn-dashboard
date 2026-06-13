import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getCards,
  addCard,
  updateCard,
  deleteCard,
} from "../services/cardService";

import "./Wallet.css";

export default function Wallet() {
  const { user } = useAuth();

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    bank: "",
    type: "Credit",
    brand: "",
    last4: "",
    cardholder: "",
    balance: "",
    due: "",
    dueDate: "",
  });

  useEffect(() => {
    if (!user) return;
    loadCards();
  }, [user]);

  async function loadCards() {
    const data = await getCards(user.uid);

    setCards(data);

    if (data.length > 0) {
      setSelectedCard(data[0]);
    }
  }

  const totalBalance = cards.reduce(
    (sum, card) => sum + Number(card.balance || 0),
    0,
  );

  async function handleSave() {
    if (!form.bank || !form.last4) return;

    if (editing) {
      await updateCard(user.uid, selectedCard.id, form);
    } else {
      await addCard(user.uid, {
        ...form,
        theme: "linear-gradient(135deg,#667eea,#764ba2)",
      });
    }

    setShowForm(false);
    setEditing(false);

    resetForm();

    loadCards();
  }

  async function handleDelete() {
    if (!selectedCard) return;

    await deleteCard(user.uid, selectedCard.id);

    setSelectedCard(null);

    loadCards();
  }

  function resetForm() {
    setForm({
      bank: "",
      type: "Credit",
      brand: "",
      last4: "",
      cardholder: "",
      balance: "",
      due: "",
      dueDate: "",
    });
  }

  return (
    <div className="wallet-page">
      <div className="wallet-header">
        <h2 className="text-gradient">Wallet</h2>
        <p>Manage all your cards in one place.</p>
      </div>

      <div className="wallet-stats">
        <div className="wallet-stat-card">
          <h4>Total Cards</h4>
          <p>{cards.length}</p>
        </div>

        <div className="wallet-stat-card">
          <h4>Total Balance</h4>
          <p>₹{totalBalance.toLocaleString()}</p>
        </div>

        <div className="wallet-stat-card">
          <h4>Credit Cards</h4>
          <p>{cards.filter((c) => c.type === "Credit").length}</p>
        </div>
      </div>

      <div className="wallet-grid">
        <div className="wallet-sidebar glass-panel">
          <div className="wallet-sidebar-header">
            <h3>Cards</h3>

            <button
              className="add-wallet-btn"
              onClick={() => {
                resetForm();
                setEditing(false);
                setShowForm(true);
              }}
            >
              + Add
            </button>
          </div>

          {cards.map((card) => (
            <div
              key={card.id}
              className={`wallet-list-item ${
                selectedCard?.id === card.id ? "active" : ""
              }`}
              onClick={() => setSelectedCard(card)}
            >
              <strong>{card.bank}</strong>

              <span>•••• {card.last4}</span>
            </div>
          ))}
        </div>

        <div className="wallet-main glass-panel">
          {selectedCard ? (
            <>
              <div
                className="wallet-card-preview"
                style={{
                  background:
                    selectedCard.theme ||
                    "linear-gradient(135deg,#6366f1,#8b5cf6)",
                }}
              >
                <span>{selectedCard.bank}</span>

                <div className="wallet-card-number">
                  •••• •••• •••• {selectedCard.last4}
                </div>

                <span>{selectedCard.cardholder}</span>
              </div>

              <div className="wallet-details">
                <p>
                  <strong>Type:</strong> {selectedCard.type}
                </p>

                <p>
                  <strong>Balance:</strong> ₹{selectedCard.balance}
                </p>

                {selectedCard.type === "Credit" && (
                  <>
                    <p>
                      <strong>Due:</strong> ₹{selectedCard.due}
                    </p>

                    <p>
                      <strong>Due Date:</strong> {selectedCard.dueDate}
                    </p>
                  </>
                )}
              </div>

              <div className="wallet-actions">
                <button
                  onClick={() => {
                    setForm(selectedCard);
                    setEditing(true);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>

                <button className="danger-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="wallet-empty">No cards available.</div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="wallet-modal-overlay">
          <div className="wallet-modal">
            <h3>{editing ? "Edit Card" : "Add Card"}</h3>

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
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />

            <input
              placeholder="Last 4 Digits"
              value={form.last4}
              onChange={(e) => setForm({ ...form, last4: e.target.value })}
            />

            <input
              placeholder="Cardholder"
              value={form.cardholder}
              onChange={(e) =>
                setForm({
                  ...form,
                  cardholder: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Balance"
              value={form.balance}
              onChange={(e) => setForm({ ...form, balance: e.target.value })}
            />

            {form.type === "Credit" && (
              <>
                <input
                  type="number"
                  placeholder="Due Amount"
                  value={form.due}
                  onChange={(e) => setForm({ ...form, due: e.target.value })}
                />

                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dueDate: e.target.value,
                    })
                  }
                />
              </>
            )}

            <button onClick={handleSave}>{editing ? "Update" : "Save"}</button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
