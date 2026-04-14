import React, { useState } from "react";
import {
  ChevronRight,
  Bell,
  MoreVertical,
  AlertCircle,
  Home,
  UserCheck,
  Shield,
  BarChart3,
  DollarSign,
  Settings,
  FileText,
  Activity,
  Menu,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Daily");

  const analyticsData = [
    { name: "Mon", value: 2700 },
    { name: "Tue", value: 2800 },
    { name: "Wed", value: 2900 },
    { name: "Thu", value: 2950 },
    { name: "Fri", value: 3000 },
    { name: "Sat", value: 2980 },
    { name: "Sun", value: 3020 },
  ];

  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3800 },
    { name: "Mar", value: 4200 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 5200 },
  ];

  const coachData = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      role: "Relationship Coach",
      date: "2023-10-24",
      status: "Reviewing",
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "Emotional Intelligence",
      date: "2023-10-23",
      status: "Reviewing",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Marriage Specialist",
      date: "2023-10-23",
      status: "Reviewing",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Dating Strategy",
      date: "2023-10-22",
      status: "Reviewing",
    },
    {
      id: 5,
      name: "Sophia Chen",
      role: "Conflict Resolution",
      date: "2023-10-21",
      status: "Reviewing",
    },
  ];

  const moderationItems = [
    {
      id: 1,
      type: "HARASSMENT",
      target: "Alex M.",
      reporter: "Jamie L.",
      time: "10m ago",
    },
    {
      id: 2,
      type: "SPAM/BOTS",
      target: "Jordan P.",
      reporter: "System",
      time: "24m ago",
    },
    {
      id: 3,
      type: "INAPPROPRIATE CONTENT",
      target: "Casey W.",
      reporter: "Morgan S.",
      time: "1h ago",
    },
  ];

  const systemPulse = [
    {
      id: 1,
      user: "William F.",
      action: "Updated Privacy Policy",
      time: "10:30 AM",
    },
    {
      id: 2,
      user: "System",
      action: "Auto-flagged 12 spam accounts",
      time: "09:15 AM",
    },
    {
      id: 3,
      user: "Elena R.",
      action: "Approved Coach: David Kim",
      time: "08:42 AM",
    },
    {
      id: 4,
      user: "William F.",
      action: "Generated Weekly Rev Report",
      time: "08:00 AM",
    },
  ];

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🦋</div>
          <span className="logo-text">Butterfly</span>
        </div>

        <div className="sidebar-section">
          <div className="section-label">GENERAL</div>
          <nav className="nav-group">
            <div className="nav-item active">
              <span>🏠 Dashboard</span>
            </div>
            <div className="nav-item">
              <span>👤 Profile</span>
            </div>
            <div className="nav-item">
              <span>✓ Coach Verification</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="section-label">SYSTEM</div>
          <nav className="nav-group">
            <div className="nav-item">
              <span>🛡️ Moderation</span>
            </div>
            <div className="nav-item">
              <span>📊 Analytics</span>
            </div>
            <div className="nav-item">
              <span>💰 Billing & Revenue</span>
            </div>
            <div className="nav-item">
              <span>⚙️ Management</span>
            </div>
            <div className="nav-item">
              <span className="indent">📋 Policies</span>
            </div>
            <div className="nav-item">
              <span className="indent">📜 Activity Logs</span>
            </div>
            <div className="nav-item">
              <span className="indent">🔧 Settings</span>
            </div>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="header">
          <div className="header-left">
            <input
              type="text"
              placeholder="Search users, coaches, or logs..."
              className="search-input"
            />
          </div>
          <div className="header-right">
            <div className="system-status">
              <div className="status-title">System Online</div>
              <div className="status-time">
                Median, IDN • Oct 24, 2023 • 10:42 AM
              </div>
            </div>
            <Bell size={18} className="bell-icon" />
            <button className="filter-btn">Filter Period</button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="content-area">
          {/* GROWTH ANALYTICS SECTION */}
          <div className="analytics-section">
            <div className="section-header">
              <h2 className="section-title">Growth Analytics</h2>
              <p className="section-subtitle">
                User retention and acquisition trends
              </p>
            </div>

            <div className="analytics-tabs">
              <button
                className={`tab ${activeTab === "Daily" ? "active" : ""}`}
                onClick={() => setActiveTab("Daily")}
              >
                Daily
              </button>
              <button
                className={`tab ${activeTab === "Weekly" ? "active" : ""}`}
                onClick={() => setActiveTab("Weekly")}
              >
                Weekly
              </button>
              <button
                className={`tab ${activeTab === "Monthly" ? "active" : ""}`}
                onClick={() => setActiveTab("Monthly")}
              >
                Monthly
              </button>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    domain={[2600, 3100]}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    ticks={[2600, 2700, 2800, 2900, 3000, 3100]}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#7C3AED"
                    strokeWidth={3}
                    dot={{ fill: "#7C3AED", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value" style={{ color: "#7C3AED" }}>
                  64.2%
                </div>
                <div className="metric-label">USER CONVERSION</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: "#EF4444" }}>
                  1.4%
                </div>
                <div className="metric-label">CHURN RATE</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: "#06B6D4" }}>
                  18m 42s
                </div>
                <div className="metric-label">AVG. SESSION</div>
              </div>
            </div>
          </div>

          {/* COACH VERIFICATION QUEUE */}
          <div className="coach-section">
            <div className="section-header">
              <h2 className="section-title">Coach Verification Queue</h2>
              <p className="section-subtitle">
                Manual review required for professional credentials
              </p>
            </div>

            <div className="table-wrapper">
              <table className="coach-table">
                <thead>
                  <tr>
                    <th>COACH PROFILE</th>
                    <th>SPECIALIZATION</th>
                    <th>SUBMITTED</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {coachData.map((coach) => (
                    <tr key={coach.id}>
                      <td className="coach-name">{coach.name}</td>
                      <td>{coach.role}</td>
                      <td>{coach.date}</td>
                      <td>
                        <span className="status-badge">{coach.status}</span>
                      </td>
                      <td>
                        <MoreVertical size={16} className="action-icon" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="two-columns">
            {/* LEFT COLUMN */}
            <div className="left-column">
              {/* Revenue Flow */}
              <div className="revenue-section">
                <h2 className="section-title">Revenue Flow</h2>
                <p className="section-subtitle">
                  Subscription vs. One-time gifts
                </p>
                <div className="chart-container small">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-section">
                <h2 className="section-title">Quick Actions</h2>
                <p className="section-subtitle">Admin operational shortcuts</p>
                <div className="actions-grid">
                  <button className="action-btn">📤 Export Data</button>
                  <button className="action-btn">✓ Bulk Verify</button>
                  <button className="action-btn">🔍 Filter Logs</button>
                  <button className="action-btn">📅 Schedule</button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-column">
              {/* Moderation Hub */}
              <div className="moderation-section">
                <div className="moderation-header">
                  <h2 className="section-title">Moderator Hub</h2>
                </div>
                <div className="moderation-list">
                  {moderationItems.map((item) => (
                    <div key={item.id} className="moderation-item">
                      <div className="moderation-item-header">
                        <span className="moderation-type">{item.type}</span>
                        <span className="moderation-time">{item.time}</span>
                      </div>
                      <div className="moderation-target">
                        Target: {item.target}
                      </div>
                      <div className="moderation-reporter">
                        Reported by {item.reporter}
                      </div>
                      <div className="moderation-actions">
                        <button className="moderation-btn approve">
                          Approve
                        </button>
                        <button className="moderation-btn remove">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">
                  Open Full Moderation Suite <ChevronRight size={14} />
                </button>
              </div>

              {/* System Pulse */}
              <div className="pulse-section">
                <h2 className="section-title">System Pulse</h2>
                <p className="section-subtitle">
                  Recent administrative actions
                </p>
                <div className="pulse-list">
                  {systemPulse.map((item) => (
                    <div key={item.id} className="pulse-item">
                      <div className="pulse-header">
                        <span className="pulse-user">{item.user}</span>
                        <span className="pulse-time">{item.time}</span>
                      </div>
                      <div className="pulse-action">{item.action}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Alert */}
              <div className="security-alert">
                <div className="alert-header">
                  <AlertCircle size={18} />
                  <h3 className="alert-title">Security Alert</h3>
                </div>
                <p className="alert-subtitle">Action Required Immediately</p>
                <p className="alert-message">
                  Detected multiple failed login attempts from unusual IP
                  addresses (192.168.0.21) targeting Admin Panel.
                </p>
                <button className="alert-btn">Enforce Lockdown</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
