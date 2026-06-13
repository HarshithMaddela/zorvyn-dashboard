import "./LegalPages.css";

export default function AboutUs() {
  return (
    <div className="legal-page">
      <h1>About Finexa</h1>

      <p className="legal-intro">
        Finexa is a modern personal finance platform designed to help
        individuals gain clarity, confidence and control over their money. We
        believe financial management should be simple, intuitive and accessible
        to everyone regardless of their financial background.
      </p>

      <section>
        <h2>Our Mission</h2>

        <p>
          Our mission is to empower people to make smarter financial decisions
          through intelligent tracking, insightful analytics, goal-based
          planning and a seamless user experience.
        </p>
      </section>

      <section>
        <h2>What Finexa Offers</h2>

        <ul>
          <li>Expense & income tracking</li>
          <li>Budget planning and monitoring</li>
          <li>Financial goal management</li>
          <li>Subscription tracking</li>
          <li>Spending analytics & insights</li>
          <li>Secure cloud-based storage</li>
          <li>Modern and intuitive dashboard experience</li>
        </ul>
      </section>

      <section>
        <h2>Our Vision</h2>

        <p>
          We envision a future where managing finances becomes effortless.
          Finexa aims to evolve into a complete financial companion that assists
          users in budgeting, saving, investing and achieving long-term
          financial goals.
        </p>
      </section>

      <section>
        <h2>Core Values</h2>

        <div className="info-grid">
          <div className="info-card">
            <h3>Privacy First</h3>
            <p>
              User privacy and data protection remain at the center of every
              decision we make.
            </p>
          </div>

          <div className="info-card">
            <h3>Transparency</h3>
            <p>
              We believe users deserve complete visibility into how their data
              is used and managed.
            </p>
          </div>

          <div className="info-card">
            <h3>Innovation</h3>
            <p>
              We continuously improve our platform with modern technologies and
              user-focused design.
            </p>
          </div>

          <div className="info-card">
            <h3>Simplicity</h3>
            <p>
              Financial tools should be easy to understand and enjoyable to use.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>Built For Everyone</h2>

        <p>
          Whether you're a student managing monthly expenses, a professional
          planning investments or a family budgeting household finances, Finexa
          provides the tools needed to stay financially organized.
        </p>
      </section>
    </div>
  );
}
