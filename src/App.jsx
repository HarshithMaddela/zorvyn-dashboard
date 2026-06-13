
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import Dock from "./pages/dock";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import logo from "../src/assets/merged-shape.svg";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Wallet from "./pages/Wallet";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactSupport from "./pages/ContactSupport";

import Subscriptions from "./pages/Subscriptions";
import { createNotification } from "./services/notificationService";
import { getNotifications } from "./services/notificationService";

import {
  VscDashboard,
  VscCreditCard,
  VscAccount,
  VscColorMode,
  VscBell,
  VscSettingsGear,
  VscTarget,
  VscGraph,
  VscRocket,
} from "react-icons/vsc";
import "./index.css";

import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "./services/transactionService";

export default function App() {
  const { user, logout } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!user) {
    return <Login />;
  }
  const [activePage, setActivePage] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (!user) return;

    async function loadNotifications() {
      const data = await getNotifications(user.uid);
      setNotifications(data);
    }

    loadNotifications();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const loadTransactions = async () => {
      const data = await getTransactions(user.uid);
      setTransactions(data);
    };

    loadTransactions();
  }, [user]);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const handleSaveTransaction = async (tx) => {
    if (tx.id) {
      await updateTransaction(user.uid, tx.id, tx);
      await createNotification(
        user.uid,
        `${tx.type === "income" ? "Income" : "Expense"} updated: ₹${tx.amount}`,
      );

      setTransactions((prev) => prev.map((t) => (t.id === tx.id ? tx : t)));
    } else {
      const newTx = {
        ...tx,
        date: tx.date || new Date().toISOString().slice(0, 10),
        category: tx.category || "Other",
        description:
          tx.description || (tx.type === "income" ? "Income" : "Expense"),
      };

      await addTransaction(user.uid, newTx);
      await createNotification(
        user.uid,
        `${newTx.type === "income" ? "Income" : "Expense"} added: ₹${newTx.amount}`,
      );

      const refreshed = await getTransactions(user.uid);

      setTransactions(refreshed);
    }

    setIsModalOpen(false);
    setEditingTx(null);
  };
  const handleDelete = async (id) => {
    await deleteTransaction(user.uid, id);
    await createNotification(user.uid, "Transaction deleted", "warning");

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const openAddModal = (type) => {
    setEditingTx({ type });
    setIsModalOpen(true);
  };
  const onAddIncome = () => {
    openAddModal("income");
  };

  const onAddExpense = () => {
    openAddModal("expense");
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
    // {
    //   icon: <VscGraph size={24} />,
    //   label: "Budgets",
    //   onClick: () => setActivePage("budgets"),
    // },
    {
      icon: <VscColorMode size={24} />,
      label: "Theme",
      onClick: () => setIsDarkMode((prev) => !prev),
    },
    // {
    //   icon: <VscRocket size={24} />,
    //   label: "Goals",
    //   onClick: () => setActivePage("goals"),
    // },

    {
      icon: <VscAccount size={24} />,
      label: "Profile",
      onClick: () => setActivePage("user"),
    },

    {
      icon: <VscRocket size={24} />,
      label: "Explore",
      onClick: () => setActivePage("explore"),
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
            onAddIncome={() => openAddModal("income")}
            onAddExpense={() => openAddModal("expense")}
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
      case "explore":
        return (
          <Settings
            setActivePage={setActivePage}
            openNotifications={() => setIsNotifOpen(true)}
          />
        );
      case "budgets":
        return <Budgets transactions={transactions} />;
      case "goals":
        return <Goals />;
      case "wallet":
        return <Wallet />;
      case "subscriptions":
        return <Subscriptions />;
      case "about":
        return <AboutUs />;

      case "privacy":
        return <PrivacyPolicy />;

      case "terms":
        return <TermsOfService />;

      case "contact":
        return <ContactSupport />;
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
            <img src={logo} alt="Finexa Logo" className="logo" />
            <h1>
              <span className="text-gradient">Finexa</span>
            </h1>
          </div>
        </div>

        <div className="header-right">
          <div className="notification-wrapper">
            <VscBell className="icon" onClick={() => setIsNotifOpen(true)} />

            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>

          <div
            className="user-box"
            onClick={() => setActivePage("user")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={user?.photoURL}
              alt="profile"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onLoad={() => console.log("LOADED")}
              onError={(e) => console.log("FAILED", e)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
              }}
            />

            <span>{user?.displayName}</span>
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
            <span className="text-gradient">Finexa</span>
          </div>
          <div className="footer-links">
            <button onClick={() => setActivePage("about")}>About Us</button>

            <button onClick={() => setActivePage("privacy")}>
              Privacy Policy
            </button>

            <button onClick={() => setActivePage("terms")}>
              Terms of Service
            </button>

            <button onClick={() => setActivePage("contact")}>
              Contact Support
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Finexa. M Harshith Sai Krishna. NITW
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
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className="notif-item">
                      {n.message}
                    </div>
                  ))
                ) : (
                  <div className="notif-item">No notifications yet</div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
