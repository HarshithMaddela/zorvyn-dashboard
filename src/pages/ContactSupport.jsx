import { useState } from "react";
import { FiMail, FiBriefcase, FiClock, FiHelpCircle } from "react-icons/fi";
import "./LegalPages.css";

export default function ContactSupport() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        category: "General Inquiry",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="legal-page">
      <div className="contact-hero">
        <h1>Contact Support</h1>

        <p className="legal-intro">
          Need help with Finexa? Have a feature request, bug report, partnership
          proposal or general question? Our team is ready to assist.
        </p>

        <div className="support-status">
          <div className="support-dot"></div>
          <span>Support Team Available</span>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-grid">
          <div className="info-card">
            <FiMail size={28} />

            <h3>Customer Support</h3>

            <a
              href="mailto:harshithsai301@gmail.com"
              style={{
                color: "#b6bdf8",
                textDecoration: "none",
                fontWeight: "600",
                wordBreak: "break-word",
                transition: "0.3s ease",
              }}
            >
              harshithsai301@gmail.com
            </a>
          </div>

          <div className="info-card">
            <FiBriefcase size={28} />

            <h3>Business Inquiries</h3>

            <a
              href="mailto:harshithsai301@gmail.com"
              style={{
                color: "#b6bdf8",
                textDecoration: "none",
                fontWeight: "600",
                wordBreak: "break-word",
                transition: "0.3s ease",
              }}
            >
              harshithsai301@gmail.com
            </a>
          </div>
        </div>

        <div className="info-card">
          <FiClock size={28} />
          <h3>Response Time</h3>
          <p>Usually within 24 hours</p>
        </div>
      </div>

      {submitted && (
        <div className="success-message">
          ✅ Your support request has been submitted successfully. We'll get
          back to you soon.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>General Inquiry</option>
          <option>Technical Support</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Business Inquiry</option>
          <option>Partnership Request</option>
        </select>

        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows="7"
          placeholder="Describe your issue, request or feedback..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Support Request</button>
      </form>

      <section>
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list">
          <div className="faq-item">
            <h3>How long does support take?</h3>
            <p>Most requests receive a response within 24 hours.</p>
          </div>

          <div className="faq-item">
            <h3>How do I report a bug?</h3>
            <p>
              Select "Bug Report" from the category dropdown and provide
              detailed steps to reproduce the issue.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can I suggest new features?</h3>
            <p>Absolutely. Feature requests help us improve Finexa.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
