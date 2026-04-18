import React, { useState } from "react";
import "./DatingConnectAdmin.css";
import {
  Search,
  CheckCircle,
  AlertCircle,
  Shield,
  Phone,
  User,
  Lock,
  ChevronDown,
  MoreVertical,
  Clock,
  MessageCircle,
  Paperclip,
  Send,
  FileText,
  LogOut,
} from "lucide-react";

export default function DatingConnectAdmin() {
  const [selectedTicket, setSelectedTicket] = useState("FTC-8821");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);

  const tickets = [
    {
      id: "FTC-8821",
      title: "Possible impersonation profile detected",
      user: "Marcus Chen",
      status: "Open",
      priority: "High",
      timestamp: "2h ago",
      description: "I have concerns using my photos on a different profile.",
    },
    {
      id: "FTC-8821",
      title: "Refund request for Platinum subscription",
      user: "Sarah Jenkins",
      status: "Pending",
      priority: "Medium",
      timestamp: "1m ago",
      description: "I accidentally renewed my yearly plan instead of monthly.",
    },
    {
      id: "FTC-8821",
      title: "App crashes when opening direct messages",
      user: "David Miller",
      status: "Open",
      priority: "High",
      timestamp: "1h ago",
      description: "Every time I try to respond to a match, the app shuts down",
    },
    {
      id: "FTC-8821",
      title: "Account verification taking too long",
      user: "Elena Rodriguez",
      status: "Pending",
      priority: "Medium",
      timestamp: "9h ago",
      description:
        "I uploaded my ID three days ago but I still don't have the badge.",
    },
    {
      id: "FTC-8821",
      title: "Question about AI matching filters",
      user: "Kevin Thompson",
      status: "Closed",
      priority: "Low",
      timestamp: "5h ago",
      description:
        "I'm not seeing any matches in my specific age range despite",
    },
  ];

  const conversationMessages = [
    {
      id: 1,
      author: "MARCUS CHEN (USER)",
      timestamp: "Oct 24, 2:45 PM",
      message:
        "Hi Support Team, I'm reporting a profile named 'Marcus_CR0' that is using my exact photos and bio from Instagram. It looks like they are trying to scam people using my identity. I've attached screenshots of both profiles for comparison.",
    },
    {
      id: 2,
      author: "DATINGCONNECT (SYSTEM)",
      timestamp: "Oct 24, 2:46 PM",
      message:
        "Your report has been received and assigned to the Safety & Trust team. An agent will review the provided information shortly. Thank you for helping keep our community safe.",
      isSystem: true,
    },
    {
      id: 3,
      author: "MARCUS CHEN (USER)",
      timestamp: "2:12 PM",
      message:
        "Any updates on this? The fake profile is still active and I'm worried it might affect my own profile standing.",
    },
  ];

  const attachments = [
    { id: 1, name: "profile_comparison.png", size: "2.4 MB" },
    { id: 2, name: "fake_profile_details.png", size: "1.8 MB" },
  ];

  const auditLogs = [
    {
      timestamp: "2023-10-24 14:45:12",
      action: "CREATED",
      detail: "Ticket created via In-App Support Hub",
    },
    {
      timestamp: "2023-10-24 14:45:41",
      action: "ROUTING",
      detail:
        "Automatically assigned to Safety Queue based on topic classification",
    },
    {
      timestamp: "2023-10-24 15:30:44",
      action: "STATUS",
      detail: "Priority changed from Normal to High by Admin_Sarah_L",
    },
    {
      timestamp: "2023-10-24 16:12:00",
      action: "COMM",
      detail: "Second follow-up message received from user",
    },
  ];

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">🔒</div>
            <span>DatingConnect Admin</span>
          </div>
        </div>
        <div className="breadcrumb">
          <span>Help & Support</span>
          <span className="separator">›</span>
          <span className="active">Ticket Management</span>
        </div>
        <div className="header-right">
          <div className="admin-info">
            <span className="admin-label">Admin Panel</span>
            <span className="admin-name">Support Lead</span>
          </div>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      <div className="admin-body">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          {/* Search */}
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by Ticket ID, User, or Keyword..."
            />
          </div>

          {/* Filters */}
          <div className="filters-section">
            {/* Ticket Status */}
            <div className="filter-group">
              <h3 className="filter-title">TICKET STATUS</h3>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Open</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Pending</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Closed</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Spam</span>
                </label>
              </div>
            </div>

            {/* Priority Level */}
            <div className="filter-group">
              <h3 className="filter-title">PRIORITY LEVEL</h3>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>High Priority</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Medium</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Low</span>
                </label>
              </div>
            </div>

            {/* Topic Categories */}
            <div className="filter-group">
              <h3 className="filter-title">TOPIC CATEGORIES</h3>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Billing & Refunds</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Safety Report</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Technical Issue</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Account Access</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="tickets-list-section">
            <h3 className="tickets-count">All Tickets 24</h3>
            <div className="tickets-list">
              {tickets.map((ticket, idx) => (
                <div
                  key={idx}
                  className={`ticket-item ${selectedTicket === ticket.id ? "active" : ""}`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="ticket-header">
                    <span className="ticket-badge">📌</span>
                    <h4 className="ticket-title">{ticket.title}</h4>
                    <MoreVertical size={14} className="ticket-menu" />
                  </div>
                  <p className="ticket-description">{ticket.description}</p>
                  <p className="ticket-user">
                    <User size={12} /> {ticket.user}
                  </p>
                  <p className="ticket-time">
                    <Clock size={12} /> {ticket.timestamp}
                  </p>
                </div>
              ))}
            </div>
            <button className="load-more-btn">Load More Tickets</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Ticket Header */}
          <div className="ticket-header-section">
            <div className="ticket-title-section">
              <span className="priority-badge priority-high">
                🔴 High Priority
              </span>
              <span className="ticket-id">ID: TC-8821</span>
              <h1>Possible impersonation profile detected</h1>
            </div>
            <div className="ticket-actions">
              <button className="action-btn">
                <User size={16} /> Assign Agent
              </button>
              <button className="action-btn">
                <AlertCircle size={16} /> Escalate
              </button>
              <button className="action-btn resolve">
                <CheckCircle size={16} /> Resolve Ticket
              </button>
            </div>
          </div>

          {/* User Info Card */}
          <div className="user-info-card">
            <div className="user-header">
              <div className="user-avatar-large">MC</div>
              <div className="user-details">
                <h2>Marcus Chen ✓</h2>
                <p className="user-meta">
                  Age: 34 • San Francisco, CA • Gold Member
                </p>
              </div>
            </div>
            <div className="ticket-meta">
              <div className="meta-item">
                <span className="meta-label">CREATED</span>
                <span className="meta-value">Oct 24, 2:45 PM</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">CHANNEL</span>
                <span className="meta-value">📱 In-App</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">TICKETS</span>
                <span className="meta-value">2 Total</span>
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="conversation-section">
            <div className="section-header">
              <h3>
                <MessageCircle size={18} /> Conversation Thread
              </h3>
              <span className="updated-time">Updated 2 minutes ago</span>
            </div>

            <div className="conversation-timeline">
              {conversationMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.isSystem ? "system" : ""}`}
                >
                  <div className="message-header">
                    <span className="message-author">{msg.author}</span>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`message-content ${msg.isSystem ? "system-bg" : ""}`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Attachments */}
            <div className="attachments-section">
              <h4>
                <Paperclip size={16} /> ATTACHMENTS (2)
              </h4>
              <div className="attachments-grid">
                {attachments.map((att) => (
                  <div key={att.id} className="attachment-item">
                    <div className="attachment-preview">📷</div>
                  </div>
                ))}
                <div className="attachment-add">
                  <button>➕ Add files...</button>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution and Notes */}
          <div className="resolution-section">
            <div className="resolution-columns">
              <div className="resolution-col">
                <h4>Resolution Action</h4>
                <div className="resolution-tabs">
                  <button className="tab active">Quick Reply</button>
                  <button className="tab">Canned Responses</button>
                </div>
                <textarea
                  className="reply-textarea"
                  placeholder="Type your reply to Marcus Chen here..."
                  rows="4"
                />
              </div>
              <div className="resolution-col notes-col">
                <h4>Internal Admin Notes</h4>
                <div className="admin-note">
                  <span className="note-author">Admin_Sarah_L</span>
                  <span className="note-time">3h ago</span>
                  <p className="note-text">
                    "I've initiated a system-wide search for the reported
                    profile name. Likely a duplicate IP match with a previously
                    banned account."
                  </p>
                </div>
                <textarea
                  className="notes-textarea"
                  placeholder="Add a private note for other admins..."
                />
                <button className="post-note-btn">Post Internal Note</button>
              </div>
            </div>
          </div>

          {/* Reply Section */}
          <div className="reply-action-section">
            <div className="reply-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>CLOSE TICKET ON SEND</span>
              </label>
            </div>
            <button className="send-reply-btn">
              <Send size={16} /> Send Reply
            </button>
          </div>

          {/* Audit Log */}
          <div className="audit-section">
            <h3>
              <FileText size={18} /> Audit Log & System Events
            </h3>
            <div className="audit-logs">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="audit-log-item">
                  <span className="log-timestamp">{log.timestamp}</span>
                  <span
                    className={`log-action action-${log.action.toLowerCase()}`}
                  >
                    {log.action}
                  </span>
                  <span className="log-detail">{log.detail}</span>
                </div>
              ))}
            </div>
            <button className="show-more-btn">Show Full Audit History</button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        <div className="footer-left">
          <span>SERVER: DC-US-WEST-04</span>
          <span>UPTIME: 99.98%</span>
          <span>VERSION: 4.2.0-ADMIN-STABLE</span>
        </div>
        <div className="footer-right">
          <a href="#live">LIVE CONNECTION</a>
          <a href="#privacy">ADMIN PRIVACY POLICY</a>
          <a href="#incident">INCIDENT REPORT</a>
        </div>
      </footer>
    </div>
  );
}
