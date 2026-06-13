import { useState } from "react";
import "./EMICalculator.css";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(tenure) * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  };

  const result = calculateEMI();

  return (
    <div className="emi-container">
      <div className="emi-card">
        <h2>🏦 EMI Calculator</h2>

        <p>Calculate your monthly loan EMI instantly.</p>

        <div className="emi-form">
          <div className="input-group">
            <label>Loan Amount (₹)</label>

            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="500000"
            />
          </div>

          <div className="input-group">
            <label>Interest Rate (%)</label>

            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="8.5"
            />
          </div>

          <div className="input-group">
            <label>Tenure (Years)</label>

            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="5"
            />
          </div>
        </div>

        <div className="emi-results">
          <div className="result-card">
            <span>Monthly EMI</span>
            <h3>
              ₹{" "}
              {result.emi.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </h3>
          </div>

          <div className="result-card">
            <span>Total Interest</span>
            <h3>
              ₹{" "}
              {result.totalInterest.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </h3>
          </div>

          <div className="result-card">
            <span>Total Payment</span>
            <h3>
              ₹{" "}
              {result.totalPayment.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
