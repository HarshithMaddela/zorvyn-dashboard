import "./LegalPages.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>

      <p className="legal-intro">
        At Finexa, protecting your personal information is one of our highest
        priorities. This Privacy Policy explains how we collect, use, and
        safeguard your information.
      </p>

      <section>
        <h2>Information We Collect</h2>

        <ul>
          <li>Name and profile information</li>
          <li>Email address</li>
          <li>Authentication details</li>
          <li>Transaction records entered by users</li>
          <li>Budget and goal information</li>
          <li>Device and browser information</li>
          <li>Application usage analytics</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Information</h2>

        <ul>
          <li>Provide and maintain services</li>
          <li>Improve user experience</li>
          <li>Respond to support requests</li>
          <li>Enhance platform security</li>
          <li>Develop new features and functionality</li>
        </ul>
      </section>

      <section>
        <h2>Data Security</h2>

        <p>
          We implement industry-standard security measures including secure
          authentication, encrypted communication channels, restricted access
          controls and continuous monitoring to protect user data.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>

        <p>
          Finexa may utilize trusted third-party services such as Firebase
          Authentication, Cloud Firestore and analytics providers to deliver
          core functionality and improve service reliability.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>

        <ul>
          <li>Access your personal information</li>
          <li>Update inaccurate information</li>
          <li>Request deletion of your account</li>
          <li>Request export of your stored data</li>
        </ul>
      </section>

      <section>
        <h2>Policy Updates</h2>

        <p>
          This Privacy Policy may be updated periodically. Significant changes
          will be communicated through the application.
        </p>
      </section>
    </div>
  );
}
