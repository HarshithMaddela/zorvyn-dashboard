import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscAccount, VscShield, VscCheck, VscError } from "react-icons/vsc";
import "./Profile.css";

export default function Profile({ role, setRole, onAddIncome, onAddExpense }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const [showCardForm, setShowCardForm] = useState(false);

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

  const handleAddCard = () => {
    const existing = JSON.parse(localStorage.getItem("cards")) || [];

    const newCard = {
      ...form,
      id: Date.now(),
      theme: "linear-gradient(135deg, #667eea, #764ba2)",
    };

    localStorage.setItem("cards", JSON.stringify([...existing, newCard]));

    setShowCardForm(false);

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
  };

  return (
    <motion.div
      className="profile-container"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="profile-header">
        <h2 className="text-gradient">Profile </h2>
        <p>Manage your account, roles and quick actions</p>
      </div>

      <div className="profile-grid">
        <motion.div
          variants={itemVariants}
          className="profile-card glass-panel"
        >
          <div className="avatar-large">👤</div>
          <h3>Harshith Sai</h3>
          <a
            href="mailto:harshithsai301@gmail.com"
            style={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              padding: "10px",
            }}
          >
            harshithsai301@gmail.com
          </a>
          <div className={`role-badge ${role}`}>
            <VscShield /> {role.toUpperCase()}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="profile-card glass-panel text-left"
        >
          <h3>
            <VscShield className="inline-icon" /> Role Management
          </h3>
          <p className="description">
            Simulate Role-Based UI. Viewers can only see data, while Admins can
            modify records.
          </p>

          <div className="role-selector">
            <label>Current Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-dropdown"
            >
              <option value="admin">Admin (Full Access)</option>
              <option value="viewer">Viewer (Read Only)</option>
            </select>
          </div>

          <div className="permissions-list">
            <div className="permission">
              <VscCheck className="allow" />
              <span>View Dashboards & Charts</span>
            </div>
            <div className="permission">
              <VscCheck className="allow" />
              <span>View Transaction History</span>
            </div>
            <div className="permission">
              {role === "admin" ? (
                <VscCheck className="allow" />
              ) : (
                <VscError className="deny" />
              )}
              <span>Add / Edit Transactions</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {role === "admin" && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="profile-card glass-panel text-left admin-actions"
            >
              <h3>Quick Actions</h3>
              <p className="description">
                Use these shortcuts to quickly log transactions without going
                back to the dashboard.
              </p>

              <div className="action-buttons">
                {/* Row 1 */}
                <div className="action-row">
                  <button className="btn-income" onClick={onAddIncome}>
                    + Income
                  </button>
                  <button className="btn-expense" onClick={onAddExpense}>
                    + Expense
                  </button>
                </div>

                <div className="action-row single">
                  <button
                    className="btn-card"
                    onClick={() => setShowCardForm(true)}
                  >
                    + Add Card
                  </button>
                </div>
              </div>

              {showCardForm && (
                <div className="card-form">
                  <h4>Add Card</h4>

                  <input
                    placeholder="Bank"
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
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                  />

                  <input
                    placeholder="Last 4 digits"
                    value={form.last4}
                    onChange={(e) =>
                      setForm({ ...form, last4: e.target.value })
                    }
                  />

                  <input
                    placeholder="Expiry"
                    value={form.expiry}
                    onChange={(e) =>
                      setForm({ ...form, expiry: e.target.value })
                    }
                  />

                  <input
                    placeholder="Cardholder"
                    value={form.cardholder}
                    onChange={(e) =>
                      setForm({ ...form, cardholder: e.target.value })
                    }
                  />

                  <input
                    placeholder="Balance"
                    value={form.balance}
                    onChange={(e) =>
                      setForm({ ...form, balance: e.target.value })
                    }
                  />

                  {form.type === "Credit" && (
                    <>
                      <input
                        placeholder="Due"
                        value={form.due}
                        onChange={(e) =>
                          setForm({ ...form, due: e.target.value })
                        }
                      />

                      <input
                        type="date"
                        value={form.dueDate}
                        onChange={(e) =>
                          setForm({ ...form, dueDate: e.target.value })
                        }
                      />
                    </>
                  )}

                  <button onClick={handleAddCard}>Add Card</button>
                  <button onClick={() => setShowCardForm(false)}>Cancel</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
