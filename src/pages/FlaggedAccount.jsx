import React from "react";
import "../styles/FlaggedAccount.css";

const FlaggedAccount = () => {
  return (
    <div className="ba-root">
      <header className="ba-page-header">
        <h1>Flagged Account Review</h1>
      </header>

      <main className="ba-main">
        <section className="ba-alerts">
          <h2>Review Summary</h2>
          <div className="ba-alert-item">Face mismatch</div>
          <div className="ba-alert-item">IP Geolocation Mismatch</div>
          <div className="ba-alert-item">
            Device ID shared with 3 previously banned accounts
          </div>
        </section>

        <section className="ba-previous-flags">
          <h3>Previous Flags</h3>
          <div className="ba-flag-entry">suspicious messaging rate</div>
          <div className="ba-flag-entry">ID Verified (Primary Level)</div>
        </section>

        <section className="ba-actions">
          <button type="button">Approve Profile</button>
          <button type="button">Reject Submission</button>
          <button type="button">Flag for Review</button>
          <button type="button">Escalate to Super Admin</button>
        </section>
      </main>
    </div>
  );
};

export default FlaggedAccount;
