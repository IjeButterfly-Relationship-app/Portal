import React, { useState } from "react";
import "./VerificationQueue.css";

const VerificationQueue = () => {
  const [activeVerification, setActiveVerification] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);

  const verificationQueue = [
    {
      id: 1,
      name: "Dr. Elena Vance",
      email: "@vance_coach • evance.clinical@butterfly.com",
      status: "Pending",
      date: "Oct 24, 2023",
      trustScore: "93%",
      avatar: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Marcus Thorne",
      email: "@mthorne_coaching",
      status: "Reviewing",
      date: "Oct 23, 2023",
      trustScore: "87%",
      avatar: "👨‍🏫",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      email: "@sarah_wellness",
      status: "Pending",
      date: "Oct 23, 2023",
      trustScore: "91%",
      avatar: "👩‍⚕️",
    },
    {
      id: 4,
      name: "Liam O'Connell",
      email: "@liamo_coaching",
      status: "Flagged",
      date: "Oct 22, 2023",
      trustScore: "72%",
      avatar: "👨‍💼",
    },
    {
      id: 5,
      name: "Sofia Rodriguez",
      email: "@sofia_coaching",
      status: "Pending",
      date: "Oct 22, 2023",
      trustScore: "88%",
      avatar: "👩‍⚕️",
    },
  ];

  const auditTrail = [
    {
      timestamp: "Oct 24, 09:12 AM",
      actor: "Sarah Miller",
      role: "Sr. Moderator",
      action: "Document Viewed",
      details: "'Viewed Master_Degree_Clinical_P.pdf'",
    },
    {
      timestamp: "Oct 24, 09:10 AM",
      actor: "Sarah Miller",
      role: "Sr. Moderator",
      action: "Checklist Updated",
      details: "'Verified Educational Credential authenticity'",
    },
    {
      timestamp: "Oct 23, 02:45 PM",
      actor: "John Doe",
      role: "Compliance Lead",
      action: "Comment Added",
      details: "'Asked for clearer photo of ID back side'",
    },
    {
      timestamp: "Oct 23, 02:44 PM",
      actor: "System",
      role: "Automation",
      action: "Status Changed",
      details: "'Moved to 'Manual Review' queue'",
    },
    {
      timestamp: "Oct 23, 02:40 PM",
      actor: "Dr. Elena Vance",
      role: "Coach",
      action: "Submission Received",
      details: "'Initial verification package submitted'",
    },
  ];

  const statusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "badge-pending";
      case "Reviewing":
        return "badge-reviewing";
      case "Flagged":
        return "badge-flagged";
      default:
        return "";
    }
  };

  return (
    <div className="vq-container">
      {/* Sidebar Navigation */}
      <aside className="vq-sidebar">
        <div className="vq-sidebar-header">
          <div className="vq-logo">
            <span className="vq-logo-icon">🦋</span>
            <span className="vq-logo-text">Butterfly</span>
          </div>
        </div>

        <nav className="vq-sidebar-nav">
          <div className="vq-nav-item">
            <span className="vq-nav-icon">📊</span>
            <span>Dashboard</span>
          </div>
          <div className="vq-nav-item">
            <span className="vq-nav-icon">👥</span>
            <span>Coaches</span>
          </div>
          <div className="vq-nav-item active">
            <span className="vq-nav-icon">✓</span>
            <span>Verifications</span>
            <span className="vq-nav-more">⋮</span>
          </div>
          <div className="vq-nav-item">
            <span className="vq-nav-icon">⚖️</span>
            <span>Moderation</span>
          </div>
          <div className="vq-nav-item">
            <span className="vq-nav-icon">📜</span>
            <span>Activity Logs</span>
          </div>
          <div className="vq-nav-item">
            <span className="vq-nav-icon">⚙️</span>
            <span>Settings</span>
          </div>
        </nav>

        {/* Verification Queue List */}
        <div className="vq-queue-section">
          <h3 className="vq-queue-title">Verification Queue</h3>
          <p className="vq-queue-subtitle">6 coaches awaiting review</p>

          <div className="vq-queue-list">
            {verificationQueue.map((item, idx) => (
              <div
                key={item.id}
                className={`vq-queue-item ${activeVerification === idx ? "active" : ""}`}
                onClick={() => setActiveVerification(idx)}
              >
                <div className="vq-queue-avatar">{item.avatar}</div>
                <div className="vq-queue-info">
                  <h4>{item.name}</h4>
                  <p>{item.email}</p>
                  <span
                    className={`vq-queue-status ${statusBadgeClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                  <span className="vq-queue-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vq-sidebar-footer">
          <div className="vq-review-status">
            <h4>REVIEW STATUS</h4>
            <p className="vq-review-count">12</p>
            <span className="vq-review-label">Pending Today</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="vq-main">
        {/* Top Bar */}
        <div className="vq-topbar">
          <div className="vq-search-box">
            <span className="vq-search-icon">🔍</span>
            <input placeholder="Search coaches, documents, or IDs..." />
          </div>

          <div className="vq-topbar-right">
            <button className="vq-topbar-icon">🔔</button>
            <div className="vq-user-profile">
              <span className="vq-user-avatar">SM</span>
              <div className="vq-user-info">
                <p className="vq-user-name">Sarah Miller</p>
                <p className="vq-user-role">MODERATOR, ADMIN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="vq-content">
          {/* Coach Profile Card */}
          <div className="vq-profile-card">
            <div className="vq-profile-actions">
              <button className="vq-btn vq-btn-outline">
                <span>📋</span> Review Modal Manual
              </button>
              <button className="vq-btn vq-btn-reject">
                <span>❌</span> Reject
              </button>
              <button className="vq-btn vq-btn-email">
                <span>✉️</span> Send rejection email
              </button>
              <button className="vq-btn vq-btn-verify">
                <span>✓</span> Verify Coach
              </button>
            </div>

            <div className="vq-profile-header">
              <div className="vq-profile-avatar-large">👩‍⚕️</div>
              <div className="vq-profile-info">
                <h2>Dr. Elena Vance</h2>
                <p className="vq-profile-subtitle">Pending Verification</p>
                <p className="vq-profile-contact">
                  @vance_coach • evance.clinical@butterfly.com
                </p>
                <p className="vq-profile-meta">
                  Submitted 2 hours ago • Trust Score: 93%
                </p>
              </div>
              <button className="vq-btn vq-btn-secondary">
                View Full Profile
              </button>
              <button className="vq-btn vq-btn-flag">🚩 Flag Account</button>
            </div>
          </div>

          <div className="vq-content-grid">
            {/* Document Viewer */}
            <div className="vq-document-section">
              <div className="vq-document-viewer">
                <div className="vq-document-header">
                  <span className="vq-doc-label">
                    Master_Degree_Clinical_P.pdf (2.4 MB)
                  </span>
                  <div className="vq-doc-controls">
                    <button>−</button>
                    <span>Page 1 of 4 • 100% Zoom</span>
                    <button>+</button>
                  </div>
                </div>

                <div className="vq-document-content">
                  <div className="vq-pdf-placeholder">
                    <div className="vq-pdf-logo">📄</div>
                  </div>
                </div>

                <div className="vq-document-footer">
                  <button className="vq-btn vq-btn-outline">Previous</button>
                  <span>Page 1 of 4</span>
                  <button className="vq-btn vq-btn-outline">Next Page</button>
                </div>
              </div>

              {/* Reviewer Notes */}
              <div className="vq-notes-section">
                <h3 className="vq-notes-title">Reviewer Notes & Feedback</h3>

                <div className="vq-notes-list">
                  <div className="vq-note">
                    <div className="vq-note-avatar">JD</div>
                    <div className="vq-note-content">
                      <p className="vq-note-author">John Doe Compliance Lead</p>
                      <p className="vq-note-time">Oct 23, 02:45 PM</p>
                      <p className="vq-note-text">
                        The Master's degree looks legitimate, but the seal is
                        slightly blurry in this scan, Sarah, can you
                        double-check the University database or request a
                        high-res scan if you're unsure?
                      </p>
                    </div>
                  </div>

                  <div className="vq-note">
                    <div className="vq-note-avatar sm">SM</div>
                    <div className="vq-note-content">
                      <p className="vq-note-author">Sarah Miller (You)</p>
                      <p className="vq-note-time">Today, 09:12 AM</p>
                      <p className="vq-note-text">
                        I've cross-referenced with the official registry. The
                        serial number #11-192-011 matches. No re-scan needed.
                        Moving to checklist verification now.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="vq-note-input">
                  <input placeholder="Type a note or specific feedback for the coach..." />
                  <button className="vq-btn vq-btn-icon">💬</button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="vq-right-sidebar">
              {/* Review Progress */}
              <div className="vq-card vq-progress-card">
                <h3 className="vq-card-title">Review Progress</h3>
                <div className="vq-progress-bar">
                  <div
                    className="vq-progress-fill"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <p className="vq-progress-text">CHECKLIST COMPLETION: 80%</p>

                <div className="vq-checklist">
                  <div className="vq-checklist-note">
                    Note: All automated checks passed. Manual verification
                    required for the final step.
                  </div>
                  <p className="vq-checklist-protocol">
                    BUTTERFLY PROTOCOL V2.4
                  </p>
                </div>

                <div className="vq-verification-checklist">
                  <h4>VERIFICATION CHECKLIST</h4>
                  <div className="vq-check-item completed">
                    <span className="vq-check-icon">✓</span>
                    <span>Full Name matches ID</span>
                  </div>
                  <div className="vq-check-item completed">
                    <span className="vq-check-icon">✓</span>
                    <span>Degree Credential verified</span>
                  </div>
                  <div className="vq-check-item completed">
                    <span className="vq-check-icon">✓</span>
                    <span>University seal clearly visible</span>
                  </div>
                  <div className="vq-check-item completed">
                    <span className="vq-check-icon">✓</span>
                    <span>Profile photo matches ID</span>
                  </div>
                  <div className="vq-check-item">
                    <span className="vq-check-icon">□</span>
                    <span>ID is not expired</span>
                  </div>
                </div>
              </div>

              {/* Document Metadata */}
              <div className="vq-card vq-metadata-card">
                <h3 className="vq-card-title">DOCUMENT METADATA</h3>
                <div className="vq-metadata">
                  <div className="vq-meta-item">
                    <span className="vq-meta-label">EXTRACTED FULL NAME</span>
                    <span className="vq-meta-value">ELENA VICTORIA VANCE</span>
                  </div>
                  <div className="vq-meta-item">
                    <span className="vq-meta-label">ID NUMBER</span>
                    <span className="vq-meta-value">PA-9R2203321-X</span>
                  </div>
                  <div className="vq-meta-item">
                    <span className="vq-meta-label">EXPIRY DATE</span>
                    <span className="vq-meta-value">Nov 12, 2028</span>
                  </div>
                  <div className="vq-meta-item">
                    <span className="vq-meta-label">FILE SECURITY TAGS</span>
                    <span className="vq-meta-value">MILVERFILED</span>
                  </div>
                  <div className="vq-meta-item">
                    <span className="vq-meta-label">ENCRYPTED</span>
                    <span className="vq-meta-value">ENCRYPTED</span>
                  </div>
                  <div className="vq-meta-item">
                    <span className="vq-meta-label">COLLATABLE</span>
                    <span className="vq-meta-value">COLLATABLE</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Moderation Audit Trail */}
          <div className="vq-audit-section">
            <div className="vq-audit-header">
              <h3>Moderation Audit Trail</h3>
              <div className="vq-audit-controls">
                <button className="vq-btn vq-btn-sm">Filters ›</button>
                <button className="vq-btn vq-btn-sm">Export Logs</button>
              </div>
            </div>

            <table className="vq-audit-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {auditTrail.map((entry, idx) => (
                  <tr key={idx}>
                    <td className="vq-td-mono">{entry.timestamp}</td>
                    <td>{entry.actor}</td>
                    <td>{entry.role}</td>
                    <td className="vq-td-action">{entry.action}</td>
                    <td className="vq-td-details">{entry.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="vq-footer">
          <a href="#">PLATFORM COMPLIANCE</a>
          <span>•</span>
          <a href="#">PRIVACY POLICY</a>
          <span>•</span>
          <a href="#">HELP CENTER</a>
          <span>BUTTERFLY VERIFICATION PROTOCOL V2.4.3</span>
        </footer>
      </main>
    </div>
  );
};

export default VerificationQueue;
