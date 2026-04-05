import React, { useMemo } from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard({ transactions }) {
  const { income, expense, balance } = useMemo(() => {
    let inc = 0,
      exp = 0;
    transactions.forEach((t) => {
      t.type === "income" ? (inc += t.amount) : (exp += t.amount);
    });
    return { income: inc, expense: exp, balance: inc - exp };
  }, [transactions]);

  const timeData = useMemo(() => {
    const map = {};
    let runningBalance = 0;

    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    sorted.forEach((t) => {
      const day = t.date.slice(5);

      if (!map[day]) {
        map[day] = { day, expense: 0, balance: 0 };
      }

      if (t.type === "income") {
        runningBalance += t.amount;
      } else {
        runningBalance -= t.amount;
        map[day].expense += t.amount;
      }

      map[day].balance = runningBalance;
    });

    return Object.values(map);
  }, [transactions]);

  const expenseData = useMemo(() => {
    const map = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    const colors = ["#818cf8", "#c084fc", "#f472b6", "#22c55e"];

    return Object.keys(map).map((k, i) => ({
      name: k,
      value: map[k],
      color: colors[i % colors.length],
    }));
  }, [transactions]);

  const insights = useMemo(() => {
    if (!transactions || transactions.length === 0) return null;

    const categoryTotals = {};
    let totalInc = 0;
    let totalExp = 0;

    transactions.forEach((t) => {
      if (t.type === "expense") {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
        totalExp += t.amount;
      } else {
        totalInc += t.amount;
      }
    });

    let highestCat = "None";
    let highestCatAmount = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > highestCatAmount) {
        highestCatAmount = amt;
        highestCat = cat;
      }
    });

    let observation = "Add more transactions to see insights.";
    if (totalInc > 0) {
      const savingsRate = (((totalInc - totalExp) / totalInc) * 100).toFixed(1);
      if (savingsRate > 20) {
        observation = `Great! You are saving ${savingsRate}% of your income.`;
      } else if (savingsRate > 0) {
        observation = `You saved ${savingsRate}% of your income. Try pushing it to 20%!`;
      } else {
        observation = (
          <span style={{ color: "red", fontWeight: "500" }}>
            Watch out! You spent more than you earned. Review your expenses.
          </span>
        );
      }
    }

    const expensesOnly = transactions.filter((t) => t.type === "expense");
    let largestExpense = null;
    if (expensesOnly.length > 0) {
      largestExpense = expensesOnly.reduce((prev, current) =>
        prev.amount > current.amount ? prev : current,
      );
    }

    return {
      highestCategory: highestCat,
      highestCategoryAmount: highestCatAmount,
      observation,
      largestExpenseName: largestExpense ? largestExpense.description : "N/A",
      largestExpenseAmount: largestExpense ? largestExpense.amount : 0,
    };
  }, [transactions]);

  return (
    <motion.div
      className="dashboard"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        gap: "2rem",
      }}
    >
      <div
        className="summary-grid"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <div className="card glass">
          <h4>Total Income</h4>
          <p>₹{income.toLocaleString()}</p>
        </div>

        <div className="card glass">
          <h4>Total Expense</h4>
          <p>₹{expense.toLocaleString()}</p>
        </div>

        <div className="card glass">
          <h4>Net Balance</h4>
          <p className="gradient-text">₹{balance.toLocaleString()}</p>
        </div>
      </div>

      {insights && (
        <div
          className="insights-container glass"
          style={{
            width: "100%",
            maxWidth: "1000px",
            padding: "1.5rem",
            borderRadius: "1rem",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
            Data Insights
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="insight-item">
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Top Spending Category
              </span>
              <h4 style={{ margin: "0.5rem 0", color: "#f472b6" }}>
                {insights.highestCategory}
              </h4>
              <small>
                ₹{insights.highestCategoryAmount.toLocaleString()} total
              </small>
            </div>

            <div className="insight-item">
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Largest Single Expense
              </span>
              <h4 style={{ margin: "0.5rem 0", color: "#ef4444" }}>
                {insights.largestExpenseName}
              </h4>
              <small>₹{insights.largestExpenseAmount.toLocaleString()}</small>
            </div>

            <div className="insight-item">
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Monthly Observation
              </span>
              <h4
                style={{
                  margin: "0.5rem 0",
                  color: "#22c55e",
                  fontSize: "1.1rem",
                  lineHeight: "1.4",
                }}
              >
                {insights.observation}
              </h4>
            </div>
          </div>
        </div>
      )}

      <div
        className="charts-grid"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <div className="card glass">
          <h3>Balance & Expenses Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={timeData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#6366f1"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card glass">
          <h3>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `₹${v}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
