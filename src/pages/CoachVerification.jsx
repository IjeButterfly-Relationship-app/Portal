import React, { useState } from "react";
import "./ButterflyVerification.css";
import {
  ChevronDown,
  Search,
  Flag,
  Mail,
  CheckCircle,
  Eye,
  MessageSquare,
  Filter,
  Download,
  Clock,
} from "lucide-react";

const ButterflyVerification = () => {
  const [selectedCoach, setSelectedCoach] = useState("dr-elena-vance");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const coaches = [
    {
      id: "dr-elena-vance",
      name: "Dr. Elena Vance",
      email: "evance@butterfly.com",
      handle: "@vance_coach",
      status: "Pending",
      date: "Oct 24, 2023",
      avatar: "👩‍⚕️",
      trustScore: "92%",
      documentUrl: "Master_Degree_Clinical.pdf",
      submittedDate: "Oct 23, 2023",
      trustId: "#V-29301",
    },
    {
      id: "marcus-thorne",
      name: "Marcus Thorne",
      email: "mthorne@butterfly.com",
      handle: "@marcus_coaching",
      status: "Reviewing",
      date: "Oct 23, 2023",
      avatar: "👨‍💼",
      trustScore: "87%",
      documentUrl: "Business_Credentials.pdf",
      submittedDate: "Oct 22, 2023",
      trustId: "#V-29300",
    },
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      email: "sjenkins@butterfly.com",
      handle: "@sarah_coaching",
      status: "Pending",
      date: "Oct 22, 2023",
      avatar: "👩‍🏫",
      trustScore: "89%",
      documentUrl: "Education_Certificate.pdf",
      submittedDate: "Oct 21, 2023",
      trustId: "#V-29299",
    },
    {
      id: "liam-oconnell",
      name: "Liam O'Connell",
      email: "loconnell@butterfly.com",
      handle: "@liam_coach",
      status: "Flagged",
      date: "Oct 22, 2023",
      avatar: "👨‍🎓",
      trustScore: "76%",
      documentUrl: "License_Documentation.pdf",
      submittedDate: "Oct 20, 2023",
      trustId: "#V-29298",
    },
    {
      id: "sofia-rodriguez",
      name: "Sofia Rodriguez",
      email: "srodriguez@butterfly.com",
      handle: "@sofia_coaching",
      status: "Pending",
      date: "Oct 21, 2023",
      avatar: "👩‍💻",
      trustScore: "94%",
      documentUrl: "Professional_Credentials.pdf",
      submittedDate: "Oct 20, 2023",
      trustId: "#V-29297",
    },
  ];

  const selectedCoachData = coaches.find((c) => c.id === selectedCoach);

  const auditTrail = [
    {
      timestamp: "Oct 24, 09:12 AM",
      actor: "Sarah Miller",
      role: "Moderator",
      action: "Document Viewed",
      details: '"Viewed Master_Degree_Clinical.pdf"',
    },
    {
      timestamp: "Oct 24, 09:10 AM",
      actor: "Sarah Miller",
      role: "Moderator",
      action: "Checklist Updated",
      details: '"Verified Educational Credential authenticity"',
    },
    {
      timestamp: "Oct 23, 02:45 PM",
      actor: "John Doe",
      role: "Compliance Lead",
      action: "Comment Added",
      details: '"Asked for clearer photo of ID back side"',
    },
    {
      timestamp: "Oct 23, 02:44 PM",
      actor: "System",
      role: "Automation",
      action: "Status Changed",
      details: '"Moved to "Manual Review" queue"',
    },
    {
      timestamp: "Oct 23, 02:40 PM",
      actor: "Dr. Elena Vance",
      role: "Coach",
      action: "Submission Received",
      details: '"Initial verification package submitted"',
    },
  ];

  const checklistItems = [
    { label: "Full Name matches ID", completed: true },
    { label: "Degree Credential verified", completed: true },
    { label: "University seal clearly visible", completed: true },
    { label: "Profile photo matches ID", completed: false },
    { label: "ID is not expired", completed: false },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFA500";
      case "Reviewing":
        return "#1E90FF";
      case "Flagged":
        return "#FF6B6B";
      case "Approved":
        return "#4CAF50";
      default:
        return "#808080";
    }
  };

  return (
    <div className="butterfly-container">
      {/* Sidebar Navigation */}
      <aside className="butterfly-sidebar">
        <div className="sidebar-header">
          <div className="butterfly-logo">
            <span className="butterfly-icon">🦋</span>
            <span className="butterfly-text">Butterfly</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item">
            <span>📊</span>
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <span>👥</span>
            <span>Coaches</span>
          </div>
          <div className="nav-item active">
            <span>✓</span>
            <span>Verifications</span>
            <span className="nav-badge">⋮</span>
          </div>
          <div className="nav-item">
            <span>🔍</span>
            <span>Moderation</span>
          </div>
          <div className="nav-item">
            <span>📋</span>
            <span>Activity Logs</span>
          </div>
          <div className="nav-item">
            <span>⚙️</span>
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="review-status">
            <div className="status-number">12</div>
            <div className="status-text">Pending Today</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="butterfly-main">
        {/* Header */}
        <header className="butterfly-header">
          <div className="header-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search coaches, documents, or IDs..."
            />
          </div>
          <div className="header-right">
            <div className="notification-bell">
              <span>🔔</span>
            </div>
            <div className="user-profile">
              <span className="user-avatar">SM</span>
              <span className="user-name">Sarah Miller</span>
            </div>
          </div>
        </header>

        <div className="butterfly-content">
          {/* Left Panel - Queue */}
          <section className="queue-panel">
            <h2 className="panel-title">Verification Queue</h2>
            <p className="queue-subtitle">5 coaches awaiting review</p>

            <div className="coaches-list">
              {coaches.map((coach) => (
                <div
                  key={coach.id}
                  className={`coach-card ${
                    selectedCoach === coach.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCoach(coach.id)}
                >
                  <div className="coach-avatar">{coach.avatar}</div>
                  <div className="coach-info">
                    <div className="coach-name">{coach.name}</div>
                    <div className="coach-email">{coach.email}</div>
                    <div className="coach-date">{coach.date}</div>
                  </div>
                  <div
                    className="coach-status"
                    style={{ color: getStatusColor(coach.status) }}
                  >
                    {coach.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Middle Panel - Details & Document */}
          <section className="details-panel">
            {/* Quick Actions */}
            <div className="actions-bar">
              <button className="action-btn secondary">
                <span>⚙️</span> Review Model Manual
              </button>
              <button className="action-btn danger">
                <Flag size={16} /> Reject
              </button>
              <button className="action-btn secondary">
                <Mail size={16} /> Send rejection email
              </button>
              <button className="action-btn primary">
                <CheckCircle size={16} /> Verify Coach
              </button>
            </div>

            {/* Coach Profile Summary */}
            <div className="coach-summary">
              <div className="summary-left">
                <div className="summary-avatar">
                  {selectedCoachData?.avatar}
                </div>
                <div className="summary-info">
                  <h3 className="summary-name">{selectedCoachData?.name}</h3>
                  <p className="summary-meta">
                    {selectedCoachData?.handle} • {selectedCoachData?.email}
                  </p>
                  <p className="summary-submitted">
                    Submitted {selectedCoachData?.submittedDate}
                  </p>
                </div>
              </div>
              <div className="summary-right">
                <button className="view-profile-btn">
                  <Eye size={16} /> View Full Profile
                </button>
                <button className="flag-btn">
                  <Flag size={16} /> Flag Account
                </button>
              </div>
            </div>

            {/* Trust Score */}
            <div className="trust-score-bar">
              <div className="trust-label">
                Trust Score
                <span className="trust-value">
                  {selectedCoachData?.trustScore}
                </span>
              </div>
              <div className="trust-id">
                Trust ID: {selectedCoachData?.trustId}
              </div>
            </div>

            {/* Document Viewer */}
            <div className="document-viewer">
              <div className="doc-header">
                <div className="doc-zoom">Page 1 of 4 — 100% Zoom</div>
                <div className="doc-controls">
                  <button>−</button>
                  <button>+</button>
                  <button>↺</button>
                  <button>↻</button>
                </div>
              </div>
              <div className="doc-canvas">
                <div className="doc-placeholder">
                  <div className="doc-icon">📄</div>
                  <p>{selectedCoachData?.documentUrl}</p>
                  <p className="doc-filename">
                    {selectedCoachData?.documentUrl} (2.4 MB)
                  </p>
                </div>
              </div>
              <div className="doc-footer">
                <span>Master_Degree_Clinical.pdf (2.4 MB)</span>
                <div className="doc-nav">
                  <button>← Previous</button>
                  <button>Next Page →</button>
                </div>
              </div>
            </div>

            {/* Reviewer Notes */}
            <div className="reviewer-notes">
              <h4 className="notes-title">
                <MessageSquare size={16} /> Reviewer Notes & Feedback
              </h4>
              <div className="notes-list">
                <div className="note-item">
                  <div className="note-avatar">JD</div>
                  <div className="note-content">
                    <div className="note-header">
                      <span className="note-author">
                        John Doe Compliance Lead
                      </span>
                      <span className="note-date">Oct 23, 02:45 PM</span>
                    </div>
                    <p className="note-text">
                      The Master's degree looks legitimate, but the seal is
                      slightly blurry in this scan. Sarah, can you double-check
                      the University database or request a high-res scan if
                      you're unsure?
                    </p>
                  </div>
                </div>

                <div className="note-item">
                  <div className="note-avatar">SM</div>
                  <div className="note-content">
                    <div className="note-header">
                      <span className="note-author">Sarah Miller Mod</span>
                      <span className="note-date">Today, 09:12 AM</span>
                    </div>
                    <p className="note-text">
                      I've cross-referenced with the official registry. The
                      serial number #11-192-011 matches. No re-scan needed.
                      Moving to checklist verification now.
                    </p>
                  </div>
                </div>
              </div>

              <div className="note-input-area">
                <textarea
                  className="note-textarea"
                  placeholder="Type a note or specific feedback for the coach..."
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                />
                <button className="note-submit">
                  <span>💬</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right Panel - Checklist & Metadata */}
          <aside className="sidebar-panel">
            {/* Review Progress */}
            <div className="review-progress">
              <h4>Review Progress</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "80%" }} />
              </div>
              <div className="progress-text">CHECKLIST 80% COMPLETION</div>
              <p className="progress-note">
                Note: All automated checks passed. Manual verification required
                for the final step.
              </p>
              <p className="protocol-version">BUTTERFLY PROTOCOL v2.4</p>
            </div>

            {/* Verification Checklist */}
            <div className="verification-checklist">
              <h4>VERIFICATION CHECKLIST</h4>
              <div className="checklist-items">
                {checklistItems.map((item, idx) => (
                  <label key={idx} className="checklist-item">
                    <input type="checkbox" checked={item.completed} readOnly />
                    <span className={item.completed ? "completed" : ""}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Document Metadata */}
            <div className="document-metadata">
              <h4>DOCUMENT METADATA</h4>
              <div className="metadata-item">
                <span className="metadata-label">EXTRACTED FULL NAME</span>
                <span className="metadata-value">ELENA VICTORIA VANCE</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">ID NUMBER</span>
                <span className="metadata-value">PA-9822033217-X</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">EXPIRY DATE</span>
                <span className="metadata-value">Nov 12, 2028</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">FILE SECURITY TAGS</span>
                <span className="metadata-value">MGL VERIFIED</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">ENCRYPTED</span>
                <span className="metadata-value">YES</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">COLLATABLE</span>
                <span className="metadata-value">YES</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom - Audit Trail */}
        <section className="audit-section">
          <div className="audit-header">
            <h3 className="audit-title">Moderation Audit Trail</h3>
            <div className="audit-controls">
              <button className="audit-btn">
                <Filter size={16} /> Filters
              </button>
              <button className="audit-btn">
                <Download size={16} /> Export Logs
              </button>
            </div>
          </div>

          <div className="audit-table">
            <div className="audit-row header">
              <div className="col col-timestamp">Timestamp</div>
              <div className="col col-actor">Actor</div>
              <div className="col col-role">Role</div>
              <div className="col col-action">Action</div>
              <div className="col col-details">Details</div>
            </div>

            {auditTrail.map((entry, idx) => (
              <div key={idx} className="audit-row">
                <div className="col col-timestamp">
                  <Clock size={14} />
                  {entry.timestamp}
                </div>
                <div className="col col-actor">{entry.actor}</div>
                <div className="col col-role">{entry.role}</div>
                <div className="col col-action">{entry.action}</div>
                <div className="col col-details">{entry.details}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="butterfly-footer">
          <div className="footer-links">
            <a href="#privacy">PRIVACY POLICY</a>
            <a href="#compliance">PLATFORM COMPLIANCE</a>
            <a href="#help">HELP CENTER</a>
          </div>
          <div className="footer-version">
            BUTTERFLY VERIFICATION PROTOCOL V2.4.3
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ButterflyVerification;
