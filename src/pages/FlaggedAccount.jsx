import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FlaggedAccount.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  dashboard: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M10 2a6 6 0 00-6 6c0 3.5-2 5-2 5h16s-2-1.5-2-5a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.73 17a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M3 7V3h4M17 7V3h-4M3 13v4h4M17 13v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  face: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <path d="M7 12c.5 1 1.5 2 3 2s2.5-1 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M10 2l7 3v5c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V5l7-3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M10 2l8 14H2L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10h16M10 2c2.5 3 2.5 13 0 15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  id: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  thumb: (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M6 10V4h8v6l3 4v2H3v-2l3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 10h8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

// ── Ticket Data ─────────────────────────────────────────────────────────────────
const tickets = [
  { id: "T-1024", name: "Sarah Jenkins", type: "ID VERIFICATION", severity: "High", time: "2m ago", avatar: "SJ" },
  { id: "T-1025", name: "Marcus Thorne", type: "PROFILE REVIEW", severity: "Medium", time: "5m ago", avatar: "MT" },
  { id: "T-1026", name: "Elena Rodriguez", type: "USER REPORT", severity: "High", time: "12m ago", avatar: "ER" },
  { id: "T-1027", name: "Kevin Wu", type: "ID VERIFICATION", severity: "Low", time: "18m ago", avatar: "KW" },
  { id: "T-1028", name: "Aria Stark", type: "PROFILE REVIEW", severity: "Medium", time: "25m ago", avatar: "AS" },
];

// ── Main Component ──────────────────────────────────────────────────────────────
const FlaggedAccount = () => {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState("T-1024");
  const [activeTab, setActiveTab] = useState("Pending");
  const [metaExpanded, setMetaExpanded] = useState(true);

  const currentTicket = tickets.find(t => t.id === selectedTicket) || tickets[0];

  return (
    <div className="ba-root">
      {/* ── Header ── */}
      <header className="ba-header">
        <div className="ba-search">
          <span className="ba-search-icon">🔍</span>
          <input type="text" placeholder="Search users, admins, or tickets..." />
        </div>
        <div className="ba-header-right">
          <button className="ba-notif" aria-label="Notifications">
            {Icon.bell}
            <span className="ba-notif-dot" />
          </button>
          <div className="ba-user-pill">
            <div className="ba-user-info">
              <span className="ba-user-name">Alex Rivera</span>
              <span className="ba-user-role">Senior Moderator</span>
            </div>
            <div className="ba-avatar">
              <img src="/avatar-alex.png" alt="Alex" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="ba-body">
        {/* ── Sidebar ── */}
        <aside className="ba-sidebar">
          <div className="ba-mod-header">
            <h2 className="ba-mod-title">Mod Queue</h2>
            <span className="ba-ticket-count">42 Tickets</span>
          </div>

          <div className="ba-tabs">
            <button 
              className={`ba-tab ${activeTab === "Pending" ? "active" : ""}`}
              onClick={() => setActiveTab("Pending")}
            >
              Pending
            </button>
            <button 
              className={`ba-tab ${activeTab === "Reports" ? "active" : ""}`}
              onClick={() => setActiveTab("Reports")}
            >
              Reports
            </button>
          </div>

          <div className="ba-ticket-list">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`ba-ticket-item ${ticket.id === selectedTicket ? "active" : ""}`}
                onClick={() => setSelectedTicket(ticket.id)}
              >
                <div className="ba-ticket-top">
                  <span className="ba-ticket-id">{ticket.id}</span>
                  <span className={`ba-badge ba-badge--${ticket.severity.toLowerCase()}`}>
                    {ticket.severity}
                  </span>
                </div>
                <div className="ba-ticket-name">{ticket.name}</div>
                <div className="ba-ticket-meta">
                  <span className="ba-ticket-type">
                    <span style={{ fontSize: "10px" }}>📝</span> {ticket.type}
                  </span>
                  <span>{ticket.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="ba-past-decisions">
            <span>View Past Decisions</span>
            <span>↗</span>
          </button>
        </aside>

        {/* ── Main Panel ── */}
        <main className="ba-main">
          {/* User Header */}
          <div className="ba-user-header">
            <div className="ba-profile-left">
              <img 
                src="/avatar-sarah.png" 
                alt="Sarah Jenkins" 
                className="ba-profile-avatar"
                onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="%23e0e0e0"/><text x="36" y="45" text-anchor="middle" font-size="28" fill="%23666">SJ</text></svg>'; }}
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
                  <a href="#" className="ba-full-profile">Full Profile ↗</a>
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

          {/* Content Grid */}
          <div className="ba-content-grid">
            {/* Left Column */}
            <div className="ba-left-col">
              {/* Biometric Verification */}
              <div className="ba-section-title">
                <span>{Icon.scan}</span>
                <span>Biometric Verification</span>
              </div>

              <div className="ba-bio-grid">
                {/* Live Selfie */}
                <div>
                  <div className="ba-bio-label-row">
                    <span className="ba-bio-label">LIVE SELFIE SUBMISSION</span>
                    <span className="ba-badge-green">Live Check Passed</span>
                  </div>
                  <div className="ba-bio-img-wrap">
                    <img 
                      src="/selfie-placeholder.jpg" 
                      alt="Live Selfie" 
                      className="ba-bio-img ba-bio-img--selfie"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#1a1025'; }}
                    />
                    <div className="ba-scan-overlay">
                      <div className="ba-scan-line ba-scan-h"></div>
                      <div className="ba-scan-line ba-scan-v"></div>
                    </div>
                    <span className="ba-img-tag">CURRENT SUBMISSION</span>
                  </div>
                </div>

                {/* Document Photo */}
                <div>
                  <div className="ba-bio-label-row">
                    <span className="ba-bio-label">DOCUMENT PHOTO</span>
                    <span className="ba-badge-neutral">(PASSPORT)</span>
                    <span className="ba-badge-green" style={{ marginLeft: "auto" }}>Expires 2029</span>
                  </div>
                  <div className="ba-bio-img-wrap">
                    <img 
                      src="/passport-placeholder.jpg" 
                      alt="Document" 
                      className="ba-bio-img"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#1a1025'; }}
                    />
                    <span className="ba-img-tag ba-img-tag--db">DATABASE RECORD</span>
                  </div>
                </div>
              </div>

              {/* Submission Metadata */}
              <div className="ba-meta-card">
                <button 
                  className="ba-meta-toggle"
                  onClick={() => setMetaExpanded(!metaExpanded)}
                >
                  <span>Submission Metadata</span>
                  <span className={`ba-chevron ${metaExpanded ? "open" : ""}`}>▼</span>
                </button>
                {metaExpanded && (
                  <div className="ba-meta-grid">
                    <div>
                      <div className="ba-meta-key">IP ADDRESS</div>
                      <div className="ba-meta-val">192.168.1.45</div>
                      <div className="ba-meta-val" style={{ color: "#6b7280", fontSize: "11px" }}>(Residential)</div>
                    </div>
                    <div>
                      <div className="ba-meta-key">DEVICE TYPE</div>
                      <div className="ba-meta-val">iPhone 15 Pro Max (iOS 17.2)</div>
                    </div>
                    <div>
                      <div className="ba-meta-key">LOCATION</div>
                      <div className="ba-meta-val">San Francisco, CA, USA</div>
                    </div>
                    <div>
                      <div className="ba-meta-key">OS INTEGRITY</div>
                      <div className="ba-meta-val" style={{ color: "#22c55e", fontWeight: 600 }}>Genuine</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Moderation Intel */}
            <div className="ba-right-col">
              <div className="ba-intel">
                <div className="ba-intel-title">Moderation Intel</div>

                {/* AI Fraud Sentinel */}
                <div className="ba-intel-section">
                  <div className="ba-intel-sub">
                    <span className="ba-intel-icon">🤖</span>
                    <span className="ba-intel-sub-title">AI FRAUD SENTINEL ANALYSIS</span>
                  </div>

                  <div className="ba-fraud-flags">
                    <div className="ba-flag ba-flag--error">
                      <span className="ba-flag-icon">❌</span>
                      <span><strong>Face Mismatch:</strong> 14% confidence match between Selfie and Passport.</span>
                    </div>

                    <div className="ba-flag ba-flag--warning">
                      <span className="ba-flag-icon">⚠️</span>
                      <span><strong>IP Geolocation Mismatch:</strong> User claims NYC, IP from Singapore.</span>
                    </div>

                    <div className="ba-flag">
                      <span className="ba-flag-icon">👤</span>
                      <span><strong>Device ID shared with 3 previously banned accounts.</strong></span>
                    </div>
                  </div>
                </div>

                {/* Previous Flags */}
                <div className="ba-prev-flags">
                  <div className="ba-intel-sub-title" style={{ marginBottom: "12px" }}>
                    📋 Previous Flags
                  </div>

                  <div className="ba-flag-entry">
                    <div className="ba-flag-entry-title">Flagged for suspicious messaging rate</div>
                    <div className="ba-flag-entry-meta">3 months ago • Moderator: J. Doe</div>
                  </div>

                  <div className="ba-flag-entry">
                    <div className="ba-flag-entry-title">ID Verified (Primary Level)</div>
                    <div className="ba-flag-entry-meta">2 years ago • Auto-approved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="ba-actions">
            <button className="ba-btn ba-btn--approve">
              <span>✓</span> Approve Profile
            </button>
            <button className="ba-btn ba-btn--reject">
              <span>✕</span> Reject Submission
            </button>
            <button className="ba-btn ba-btn--flag">
              <span>🚩</span> Flag for Review
            </button>
            <button className="ba-btn ba-btn--escalate">
              <span>⬆️</span> Escalate to Super Admin
            </button>
          </div>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="ba-footer">
        <div className="ba-footer-left">
          <span className="ba-system-online">● Online: v2.4.1</span>
        </div>
        <div className="ba-footer-right">
          <a href="#">Privacy Policy</a>
          <a href="#">Internal Documentation</a>
          <a href="#">Support Ticket</a>
        </div>
      </footer>
    </div>
  );
};

export default FlaggedAccount;
