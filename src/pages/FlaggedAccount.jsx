import React, { useState } from "react";
import { Search, Bell, CheckCircle, XCircle, Flag, AlertTriangle, Shield } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "../styles/FlaggedAccount.css";

const FlaggedAccount = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedTicket, setSelectedTicket] = useState("T-1024");

  const tickets = [
    { id: "T-1024", name: "Sarah Jenkins", type: "ID VERIFICATION", priority: "high", time: "2m ago" },
    { id: "T-1025", name: "Marcus Thorne", type: "PROFILE REVIEW", priority: "medium", time: "5m ago" },
    { id: "T-1026", name: "Elena Rodriguez", type: "USER REPORT", priority: "high", time: "12m ago" },
    { id: "T-1027", name: "Kevin Wu", type: "ID VERIFICATION", priority: "low", time: "18m ago" },
    { id: "T-1028", name: "Aria Stark", type: "PROFILE REVIEW", priority: "medium", time: "25m ago" },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high": return "priority-high";
      case "medium": return "priority-medium";
      case "low": return "priority-low";
      default: return "";
    }
  };

  return (
    <div className="ba-app">
      <Sidebar />
      <div className="ba-container">
        {/* Header */}
        <header className="ba-header">
          <div className="ba-header-left">
            <span className="ba-logo-text">Butterfly Admin</span>
          </div>
          <div className="ba-header-center">
            <div className="ba-search-box">
              <Search size={18} />
              <input type="text" placeholder="Search users, admins, or tickets..." />
            </div>
          </div>
          <div className="ba-header-right">
            <button className="ba-notification-btn">
              <Bell size={20} />
            </button>
            <div className="ba-user-profile">
              <div className="ba-user-info">
                <span className="ba-user-name">Alex Rivera</span>
                <span className="ba-user-role">Super Admin</span>
              </div>
              <img src="https://i.pravatar.cc/40?img=12" alt="Alex Rivera" className="ba-user-avatar" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="ba-content">
          {/* Mod Queue Sidebar */}
          <aside className="ba-queue-sidebar">
            <div className="ba-queue-header">
              <h2>Mod Queue</h2>
              <span className="ba-ticket-count">42 Tickets</span>
            </div>
            <div className="ba-queue-tabs">
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
            <div className="ba-tickets-list">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className={`ba-ticket-item ${selectedTicket === ticket.id ? "selected" : ""}`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="ba-ticket-header">
                    <span className="ba-ticket-id">{ticket.id}</span>
                    <span className={`ba-ticket-priority ${getPriorityClass(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="ba-ticket-name">{ticket.name}</div>
                  <div className="ba-ticket-footer">
                    <span className="ba-ticket-type">{ticket.type}</span>
                    <span className="ba-ticket-time">{ticket.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="ba-queue-footer">
              <span>View Past Decisions</span>
              <span className="ba-arrow">→</span>
            </div>
          </aside>

          {/* Main Review Panel */}
          <main className="ba-review-panel">
            {/* User Profile Card */}
            <div className="ba-profile-section">
              <div className="ba-profile-header">
                <div className="ba-profile-left">
                  <img 
                    src="https://i.pravatar.cc/80?img=5" 
                    alt="Sarah Jenkins" 
                    className="ba-profile-avatar" 
                  />
                  <div className="ba-profile-info">
                    <h2>Sarah Jenkins</h2>
                    <div className="ba-profile-meta">
                      <span>User ID: U-982</span>
                      <span className="ba-dot">•</span>
                      <span>Joined: Oct 2023</span>
                      <span className="ba-dot">•</span>
                      <a href="#" className="ba-profile-link">Full Profile ↗</a>
                    </div>
                  </div>
                </div>
                <div className="ba-profile-right">
                  <span className="ba-tier-badge">Tier: Gold</span>
                  <div className="ba-risk-score">
                    <span className="ba-risk-label">AI RISK SCORE</span>
                    <div className="ba-risk-value">
                      <span className="ba-risk-number">82</span>
                      <span className="ba-risk-total">/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biometric Verification */}
            <div className="ba-section">
              <h3 className="ba-section-title">Biometric Verification</h3>
              <div className="ba-biometric-grid">
                <div className="ba-biometric-card">
                  <div className="ba-biometric-header">
                    <span>LIVE SELFIE SUBMISSION</span>
                    <span className="ba-status-badge success">Live Check Passed</span>
                  </div>
                  <div className="ba-image-container">
                    <div className="ba-image-badge">CURRENT SUBMISSION</div>
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop" 
                      alt="Live Selfie" 
                      className="ba-verification-image" 
                    />
                    <div className="ba-face-scan-overlay">
                      <div className="ba-scan-line"></div>
                    </div>
                  </div>
                </div>
                <div className="ba-biometric-card">
                  <div className="ba-biometric-header">
                    <span>DOCUMENT PHOTO (PASSPORT)</span>
                    <span className="ba-expiry-badge">Expires 2029</span>
                  </div>
                  <div className="ba-image-container">
                    <div className="ba-image-badge dark">DATABASE RECORD</div>
                    <img 
                      src="https://images.unsplash.com/photo-1544413660-299165566b1d?w=300&h=400&fit=crop" 
                      alt="Passport" 
                      className="ba-verification-image" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Metadata */}
            <div className="ba-section">
              <div className="ba-metadata-header">
                <h3>Submission Metadata</h3>
                <button className="ba-collapse-btn">▼</button>
              </div>
              <div className="ba-metadata-grid">
                <div className="ba-metadata-item">
                  <label>IP ADDRESS</label>
                  <value>192.168.1.45 (Residential)</value>
                </div>
                <div className="ba-metadata-item">
                  <label>DEVICE TYPE</label>
                  <value>iPhone 15 Pro Max (iOS 17.2)</value>
                </div>
                <div className="ba-metadata-item">
                  <label>LOCATION</label>
                  <value>San Francisco, CA, USA</value>
                </div>
                <div className="ba-metadata-item">
                  <label>OS INTEGRITY</label>
                  <value className="ba-integrity-good">Genuine</value>
                </div>
              </div>
            </div>

            {/* Moderation Intel */}
            <div className="ba-section">
              <h3 className="ba-section-title">
                <Shield size={18} />
                Moderation Intel
              </h3>
              <div className="ba-intel-box">
                <h4>AI FRAUD SENTINEL ANALYSIS</h4>
                <div className="ba-intel-items">
                  <div className="ba-intel-item warning">
                    <AlertTriangle size={16} />
                    <div>
                      <strong>Face Mismatch:</strong> 14% confidence match between Selfie and Passport.
                    </div>
                  </div>
                  <div className="ba-intel-item warning">
                    <AlertTriangle size={16} />
                    <div>
                      <strong>IP Geolocation Mismatch:</strong> User claims NYC, IP from Singapore.
                    </div>
                  </div>
                  <div className="ba-intel-item error">
                    <AlertTriangle size={16} />
                    <div>
                      <strong>Device ID shared with 3 previously banned accounts.</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Flags */}
            <div className="ba-section">
              <h3 className="ba-section-title">Previous Flags</h3>
              <div className="ba-flags-list">
                <div className="ba-flag-item">
                  <Flag size={16} />
                  <div>
                    <div className="ba-flag-title">Flagged for suspicious messaging rate</div>
                    <div className="ba-flag-meta">3 months ago • Moderator: J. Doe</div>
                  </div>
                </div>
                <div className="ba-flag-item resolved">
                  <CheckCircle size={16} />
                  <div>
                    <div className="ba-flag-title">ID Verified (Primary Level)</div>
                    <div className="ba-flag-meta">2 years ago • Auto-approved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ba-actions-bar">
              <button className="ba-btn ba-btn-approve">
                <CheckCircle size={18} />
                Approve Profile
              </button>
              <button className="ba-btn ba-btn-reject">
                <XCircle size={18} />
                Reject Submission
              </button>
              <button className="ba-btn ba-btn-flag">
                <Flag size={18} />
                Flag for Review
              </button>
              <button className="ba-btn ba-btn-escalate">
                <AlertTriangle size={18} />
                Escalate to Super Admin
              </button>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="ba-footer">
          <div className="ba-footer-left">
            <span>© 2024 Butterfly Admin</span>
            <span className="ba-status-indicator"></span>
            <span>System Online: v2.4.1</span>
          </div>
          <div className="ba-footer-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Internal Documentation</a>
            <a href="#">Support Ticket</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FlaggedAccount;
