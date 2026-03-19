import { useState } from "react";
import "../styles/FlaggedAccount.css";

const tickets = [
  {
    id: "T-1024",
    name: "Sarah Jenkins",
    type: "ID VERIFICATION",
    priority: "high",
    time: "2m ago",
    active: true,
  },
  {
    id: "T-1025",
    name: "Marcus Thorne",
    type: "PROFILE REVIEW",
    priority: "medium",
    time: "5m ago",
  },
  {
    id: "T-1026",
    name: "Elena Rodriguez",
    type: "USER REPORT",
    priority: "high",
    time: "12m ago",
  },
  {
    id: "T-1027",
    name: "Kevin Wu",
    type: "ID VERIFICATION",
    priority: "low",
    time: "18m ago",
  },
  {
    id: "T-1028",
    name: "Aria Stark",
    type: "PROFILE REVIEW",
    priority: "medium",
    time: "25m ago",
  },
];

const fraudFlags = [
  {
    icon: "⊙",
    type: "error",
    text: "Face Mismatch: 14% confidence match between Selfie and Passport.",
  },
  {
    icon: "⚠",
    type: "warning",
    text: "IP Geolocation Mismatch: User claims NYC, IP from Singapore.",
  },
  {
    icon: "🖨",
    type: "warning",
    text: "Device ID shared with 3 previously banned accounts.",
  },
];

export default function ButterflyAdmin() {
  const [activeTab, setActiveTab] = useState("pending");
  const [metaOpen, setMetaOpen] = useState(true);
  const [activeTicket, setActiveTicket] = useState("T-1024");

  return (
    <div className="ba-root">
      {/* Top Nav */}
      <header className="ba-header">
        <div className="ba-header-left">
          <img src="/butterfly-logo.png" alt="Butterfly Logo" className="ba-logo-img" />
          <div className="ba-logo">Butterfly Admin</div>
        </div>
        <div className="ba-search">
          <span className="ba-search-icon">🔍</span>
          <input placeholder="Search users, admins, or tickets..." />
        </div>
        <div className="ba-header-right">
          <button className="ba-notif">
            🔔
            <span className="ba-notif-dot" />
          </button>
          <div className="ba-user-pill">
            <div className="ba-user-info">
              <span className="ba-user-name">Alex Rivera</span>
              <span className="ba-user-role">Super Admin</span>
            </div>
            <div className="ba-avatar">
              <img src="https://i.pravatar.cc/36?img=12" alt="Alex Rivera" />
              <span className="ba-online-dot" />
            </div>
          </div>
        </div>
      </header>

      <div className="ba-body">
        {/* Sidebar */}
        <aside className="ba-sidebar">
          <div className="ba-mod-header">
            <h2 className="ba-mod-title">Mod Queue</h2>
            <span className="ba-ticket-count">42 Tickets</span>
          </div>
          <div className="ba-tabs">
            <button
              className={`ba-tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`ba-tab ${activeTab === "reports" ? "active" : ""}`}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </button>
          </div>
          <ul className="ba-ticket-list">
            {tickets.map((t) => (
              <li
                key={t.id}
                className={`ba-ticket-item ${t.active || activeTicket === t.id ? "active" : ""}`}
                onClick={() => setActiveTicket(t.id)}
              >
                <div className="ba-ticket-top">
                  <span className="ba-ticket-id">{t.id}</span>
                  <span className={`ba-badge ba-badge--${t.priority}`}>
                    {t.priority}
                  </span>
                </div>
                <div className="ba-ticket-name">{t.name}</div>
                <div className="ba-ticket-meta">
                  <span className="ba-ticket-type">⊙ {t.type}</span>
                  <span className="ba-ticket-time">{t.time}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="ba-past-decisions">
            View Past Decisions
            <span>🕐</span>
          </button>
        </aside>

        {/* Main Panel */}
        <main className="ba-main">
          {/* User Header */}
          <div className="ba-user-header">
            <div className="ba-profile-left">
              <img
                className="ba-profile-avatar"
                src="https://i.pravatar.cc/72?img=5"
                alt="Sarah Jenkins"
              />
              <div>
                <div className="ba-profile-name-row">
                  <h1 className="ba-profile-name">Sarah Jenkins</h1>
                  <span className="ba-tier">Tier: Gold</span>
                </div>
                <div className="ba-profile-meta">
                  <span>User ID: U-982</span>
                  <span className="ba-dot">•</span>
                  <span>Joined: Oct 2023</span>
                  <span className="ba-dot">•</span>
                  <a href="#" className="ba-full-profile">
                    Full Profile ↗
                  </a>
                </div>
              </div>
            </div>
            <div className="ba-risk-score">
              <div className="ba-risk-label">AI RISK SCORE</div>
              <div className="ba-risk-value">
                82<span>/100</span>
              </div>
            </div>
          </div>

          <hr className="ba-divider" />

          {/* Biometric + Intel */}
          <div className="ba-content-grid">
            {/* Biometric Section */}
            <section className="ba-biometric">
              <h2 className="ba-section-title">⊙ Biometric Verification</h2>

              <div className="ba-bio-grid">
                {/* Live Selfie */}
                <div className="ba-bio-col">
                  <div className="ba-bio-label-row">
                    <span className="ba-bio-label">LIVE SELFIE SUBMISSION</span>
                    <span className="ba-badge-green">Live Check Passed</span>
                  </div>
                  <div className="ba-bio-img-wrap">
                    <span className="ba-img-tag">CURRENT SUBMISSION</span>
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=220&fit=crop&auto=format"
                      alt="Live selfie"
                      className="ba-bio-img ba-bio-img--selfie"
                    />
                    {/* Red scan lines overlay */}
                    <div className="ba-scan-overlay">
                      <div className="ba-scan-line ba-scan-h" />
                      <div className="ba-scan-line ba-scan-v" />
                    </div>
                  </div>
                </div>

                {/* Passport */}
                <div className="ba-bio-col">
                  <div className="ba-bio-label-row">
                    <span className="ba-bio-label">
                      DOCUMENT PHOTO (PASSPORT)
                    </span>
                    <span className="ba-badge-neutral">Expires 2029</span>
                  </div>
                  <div className="ba-bio-img-wrap">
                    <span className="ba-img-tag ba-img-tag--db">
                      DATABASE RECORD
                    </span>
                    <img
                      src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=220&fit=crop&auto=format"
                      alt="Passport"
                      className="ba-bio-img"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Metadata */}
              <div className="ba-meta-card">
                <button
                  className="ba-meta-toggle"
                  onClick={() => setMetaOpen((v) => !v)}
                >
                  <span>Submission Metadata</span>
                  <span className={`ba-chevron ${metaOpen ? "open" : ""}`}>
                    ▾
                  </span>
                </button>
                {metaOpen && (
                  <div className="ba-meta-grid">
                    <div>
                      <div className="ba-meta-key">IP ADDRESS</div>
                      <div className="ba-meta-val">
                        192.168.1.45 (Residential)
                      </div>
                    </div>
                    <div>
                      <div className="ba-meta-key">DEVICE TYPE</div>
                      <div className="ba-meta-val">
                        iPhone 15 Pro Max (iOS 17.2)
                      </div>
                    </div>
                    <div>
                      <div className="ba-meta-key">LOCATION</div>
                      <div className="ba-meta-val">San Francisco, CA, USA</div>
                    </div>
                    <div>
                      <div className="ba-meta-key">OS INTEGRITY</div>
                      <div className="ba-meta-val">
                        <span className="ba-badge-green">Genuine</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Moderation Intel */}
            <aside className="ba-intel">
              <h3 className="ba-intel-title">Moderation Intel</h3>

              <div className="ba-intel-section">
                <div className="ba-intel-sub">
                  <span className="ba-intel-icon">🛡</span>
                  <span className="ba-intel-sub-title">
                    AI FRAUD SENTINEL ANALYSIS
                  </span>
                </div>
                <div className="ba-fraud-flags">
                  {fraudFlags.map((f, i) => (
                    <div key={i} className={`ba-flag ba-flag--${f.type}`}>
                      <span className="ba-flag-icon">{f.icon}</span>
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ba-intel-section ba-prev-flags">
                <div className="ba-intel-sub">
                  <span className="ba-intel-icon">🕐</span>
                  <span className="ba-intel-sub-title">Previous Flags</span>
                </div>
                <div className="ba-flag-entry">
                  <div className="ba-flag-entry-title">
                    Flagged for suspicious messaging rate
                  </div>
                  <div className="ba-flag-entry-meta">
                    3 months ago • Moderator: J. Doe
                  </div>
                </div>
                <div className="ba-flag-entry">
                  <div className="ba-flag-entry-title">
                    ID Verified (Primary Level)
                  </div>
                  <div className="ba-flag-entry-meta">
                    2 years ago • Auto-approved
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Action Buttons */}
          <div className="ba-actions">
            <button className="ba-btn ba-btn--approve">
              ● Approve Profile
            </button>
            <button className="ba-btn ba-btn--reject">
              ✕ Reject Submission
            </button>
            <button className="ba-btn ba-btn--flag">⊳ Flag for Review</button>
            <button className="ba-btn ba-btn--escalate">
              ⚠ Escalate to Super Admin
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="ba-footer">
        <div className="ba-footer-left">
          © 2024 Butterfly Admin
          <span className="ba-system-online">● System Online: v2.4.1</span>
        </div>
        <div className="ba-footer-right">
          <a href="#">Privacy Policy</a>
          <a href="#">Internal Documentation</a>
          <a href="#">Support Ticket</a>
        </div>
      </footer>
    </div>
  );
}
