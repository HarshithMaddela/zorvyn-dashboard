import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  VscSearch,
  VscFilter,
  VscArrowDown,
  VscArrowUp,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";
import "./Transactions.css";

export default function Transactions({
  transactions = [],
  role,
  onEdit,
  onDelete,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      result = result.filter(
        (t) =>
          (t.description &&
            t.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (t.category &&
            t.category.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (filterType !== "all") {
      result = result.filter((t) => t.type === filterType);
    }

    result.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [searchTerm, filterType, sortBy, transactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h2 className="text-gradient">Transactions</h2>
        <p>Manage and track your recent activity</p>
      </div>

      <div className="controls-container glass-panel">
        <div className="search-bar">
          <VscSearch className="control-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <VscFilter className="control-icon" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      <motion.div
        className="transactions-list"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {filteredAndSortedTransactions.length > 0 ? (
            filteredAndSortedTransactions.map((t) => (
              <motion.div
                key={t.id}
                variants={itemVariants}
                exit={{ opacity: 0, x: -20 }}
                layout
                className="transaction-card glass-panel"
              >
                <div className="tx-left">
                  <div className={`tx-icon ${t.type}`}>
                    {t.type === "income" ? <VscArrowDown /> : <VscArrowUp />}
                  </div>
                  <div className="tx-details">
                    <h4>{t.description}</h4>
                    <span>{t.category}</span>
                  </div>
                </div>

                <div className="tx-right">
                  <div className={`tx-amount ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}₹
                    {t.amount.toLocaleString()}
                  </div>

                  <div className="tx-date">{t.date}</div>

                  {role === "admin" && (
                    <div
                      style={{ display: "flex", gap: "8px", marginTop: "6px" }}
                    >
                      <button
                        onClick={() => onEdit(t)}
                        style={{
                          background: "transparent",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "2px 6px",
                          cursor: "pointer",
                        }}
                      >
                        <VscEdit />
                      </button>

                      <button
                        onClick={() => onDelete(t.id)}
                        style={{
                          background: "transparent",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "2px 6px",
                          cursor: "pointer",
                        }}
                      >
                        <VscTrash />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-results"
            >
              {transactions.length === 0
                ? "No transactions yet. Add your first one 🚀"
                : "No matching transactions found."}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
