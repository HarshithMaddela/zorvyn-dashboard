import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/merged-shape.svg";
import "./Login.css";

export default function Login() {
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div className="login-wrapper dark-theme-forced">
      <div className="dashboard-grid-bg"></div>
      <motion.div
        className="split-login-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="login-hero-pane">
          <div className="glow-shape shape-1"></div>
          <div className="glow-shape shape-2"></div>
          <div className="hero-content">
            <div className="hero-brand">
              <img src={logo} alt="Finexa Logo" className="hero-logo" />
              <span>Finexa</span>
            </div>
            <div className="hero-text">
              <h2>Master your personal finances.</h2>
              <p>
                Finexa brings together budgeting, expense tracking, savings
                goals, subscription management and financial insights into one
                seamless experience.
              </p>
              <p>
                Built for students, professionals and everyday users, Finexa
                helps you stay organized, understand your spending patterns and
                take control of your financial future.
              </p>
              <p>Simple. Intelligent. Secure.</p>
            </div>
            <div className="hero-features">
              <div>• Smart Expense Tracking</div>
              <div>• Budget & Goal Management</div>
              <div>• Subscription Monitoring</div>
              <div>• Wallet & Card Organization</div>
            </div>
          </div>
        </div>
        <div className="login-form-pane">
          <div className="form-container">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Continue your financial journey with Finexa.</p>
            </div>
            <button className="btn-google" onClick={loginWithGoogle}>
              <FcGoogle size={22} />
              <span>Continue with Google</span>
            </button>
            <p
              style={{
                marginTop: "24px",
                textAlign: "center",
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
              }}
            >
              Authenticate your account
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
