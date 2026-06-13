import "./LegalPages.css";

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>

      <p className="legal-intro">
        These Terms of Service govern your access to and use of Finexa. By using
        our services, you agree to comply with these terms.
      </p>

      <section>
        <h2>Acceptance of Terms</h2>

        <p>
          By creating an account or using Finexa, you acknowledge that you have
          read, understood and agreed to these Terms of Service.
        </p>
      </section>

      <section>
        <h2>User Responsibilities</h2>

        <ul>
          <li>Provide accurate account information.</li>
          <li>Maintain account security.</li>
          <li>Comply with applicable laws.</li>
          <li>Use services responsibly.</li>
        </ul>
      </section>

      <section>
        <h2>Prohibited Activities</h2>

        <ul>
          <li>Unauthorized access attempts.</li>
          <li>Reverse engineering the platform.</li>
          <li>Data scraping or automated extraction.</li>
          <li>Fraudulent or malicious activity.</li>
          <li>Interference with platform operations.</li>
        </ul>
      </section>

      <section>
        <h2>Service Availability</h2>

        <p>
          Finexa is provided on an "as available" and "as is" basis. We strive
          to maintain uptime and reliability but cannot guarantee uninterrupted
          service.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>

        <p>
          Finexa provides financial tracking and organizational tools. We are
          not financial advisors and cannot guarantee financial outcomes
          resulting from user decisions.
        </p>
      </section>

      <section>
        <h2>Account Suspension</h2>

        <p>
          Accounts engaging in abuse, fraud, unauthorized access attempts or
          violations of these terms may be suspended or terminated.
        </p>
      </section>

      <section>
        <h2>Changes To Terms</h2>

        <p>
          We reserve the right to update these Terms of Service at any time.
          Continued use of Finexa constitutes acceptance of updated terms.
        </p>
      </section>
    </div>
  );
}
