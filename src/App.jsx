import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dock from "./pages/dock";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import logo from "../src/assets/merged-shape.svg";
import {
  VscDashboard,
  VscCreditCard,
  VscAccount,
  VscColorMode,
  VscBell,
  VscSettingsGear,
} from "react-icons/vsc";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("zorvyn-transactions");
    if (savedTransactions) return JSON.parse(savedTransactions);

    return [
      {
        id: 1,
        date: "2026-04-01",
        amount: 30000,
        category: "Salary",
        type: "income",
        description: "Tech Corp Inc.",
      },
      {
        id: 2,
        date: "2026-04-01",
        amount: 500,
        category: "Food",
        type: "expense",
        description: "Starbucks",
      },
      {
        id: 3,
        date: "2026-04-02",
        amount: 1200,
        category: "Shopping",
        type: "expense",
        description: "Amazon Gadgets",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("zorvyn-transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const handleSaveTransaction = (tx) => {
    if (tx.id) {
      setTransactions((prev) => prev.map((t) => (t.id === tx.id ? tx : t)));
    } else {
      const newTx = {
        ...tx,
        id: Date.now(),
        // Fallbacks in case the user leaves fields blank
        date: tx.date || new Date().toISOString().slice(0, 10),
        category: tx.category || "Other",
        description:
          tx.description || (tx.type === "income" ? "Income" : "Expense"),
      };
      setTransactions((prev) => [...prev, newTx]);
    }

    setIsModalOpen(false);
    setEditingTx(null);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const openAddModal = (type) => {
    setEditingTx({ type });
    setIsModalOpen(true);
  };

  const items = [
    {
      icon: <VscDashboard size={24} />,
      label: "Dashboard",
      onClick: () => setActivePage("dashboard"),
    },
    {
      icon: <VscCreditCard size={24} />,
      label: "Transactions",
      onClick: () => setActivePage("transactions"),
    },
    {
      icon: <VscAccount size={24} />,
      label: "Profile",
      onClick: () => setActivePage("user"),
    },
    {
      icon: <VscColorMode size={24} />,
      label: "Theme",
      onClick: () => setIsDarkMode((prev) => !prev),
    },
    {
      icon: <VscSettingsGear size={24} />,
      label: "Settings",
      onClick: () => setActivePage("settings"),
    },
  ];

  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard transactions={transactions} />;
      case "transactions":
        return (
          <Transactions
            transactions={transactions}
            role={userRole}
            onEdit={(tx) => {
              setEditingTx(tx);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        );
      case "user":
        return (
          <Profile
            role={userRole}
            setRole={setUserRole}
            onAddIncome={() => openAddModal("income")}
            onAddExpense={() => openAddModal("expense")}
          />
        );
      case "settings":
        return <Settings setActivePage={setActivePage} />;
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="bg-mesh"></div>
      <header className="app-header">
        <div className="header-left">
          <div
            className="brand"
            onClick={() => setActivePage("dashboard")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="Zorvyn Logo" className="logo" />
            <h1>
              <span className="text-gradient">Zorvyn</span> Insights
            </h1>
          </div>
        </div>
        <div className="header-right">
          <VscBell className="icon" onClick={() => setIsNotifOpen(true)} />
          <div
            className="user-box"
            onClick={() => setActivePage("user")}
            style={{ cursor: "pointer" }}
          >
            <span className="avatar">👤</span>
            <span>Harshith</span>
          </div>
        </div>
      </header>

      <main
        style={{
          padding: "5rem 2rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          flex: "1 0 auto",
          width: "100%",
        }}
      >
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editingTx?.id ? "Edit Transaction" : "Add Transaction"}</h3>

              <input
                placeholder="Amount"
                type="number"
                value={editingTx?.amount || ""}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, amount: Number(e.target.value) })
                }
              />

              <input
                placeholder="Category"
                value={editingTx?.category || ""}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, category: e.target.value })
                }
              />

              <input
                placeholder="Description"
                value={editingTx?.description || ""}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, description: e.target.value })
                }
              />

              <input
                type="date"
                value={editingTx?.date || new Date().toISOString().slice(0, 10)}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, date: e.target.value })
                }
              />

              <select
                value={editingTx?.type || "expense"}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, type: e.target.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <button onClick={() => handleSaveTransaction(editingTx)}>
                Save
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTx(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="text-gradient">Zorvyn</span> Insights
          </div>
          <div className="footer-links">
            <a href="#about">About Us</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Support</a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Zorvyn Insights. All rights
          reserved. Made in India.
        </div>
      </footer>

      <Dock items={items} />

      <AnimatePresence>
        {isNotifOpen && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotifOpen(false)}
            />
            <motion.div
              className="notif-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="notif-header">
                <h3>Notifications</h3>
                <button onClick={() => setIsNotifOpen(false)}>✕</button>
              </div>
              <div className="notif-list">
                <div className="notif-item">
                  ₹30,000 added to balance <span>2 min ago</span>
                </div>
                <div className="notif-item">
                  ₹1,200 spent on Shopping <span>10 min ago</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
