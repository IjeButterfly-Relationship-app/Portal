import React, { useState } from "react";
import { ChevronRight, Bell, MoreVertical, AlertCircle } from "lucide-react";
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
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Daily");

  const analyticsData = [
    { name: "Mon", purple: 2675, cyan: 400 },
    { name: "Tue", purple: 1800, cyan: 300 },
    { name: "Wed", purple: 9800, cyan: 800 },
    { name: "Thu", purple: 3900, cyan: 450 },
    { name: "Fri", purple: 5050, cyan: 600 },
    { name: "Sat", purple: 3800, cyan: 350 },
    { name: "Sun", purple: 4500, cyan: 500 },
  ];

  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3800 },
    { name: "Mar", value: 4200 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 5200 },
  ];

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/butterfly-logo.png" alt="Amoura" className="logo-image" />
          <span className="logo-text">Amoura<sup>™</sup></span>
        </div>

        <nav className="nav-group">
          <div className="nav-item">
            <span>Moderation</span>
          </div>
          <div className="nav-item">
            <span>Analytics</span>
          </div>
          <div className="nav-item">
            <span>Billing</span>
          </div>
          <div className="nav-item">
            <span>Security & APIs</span>
          </div>
          <div className="nav-item">
            <span>Policies</span>
          </div>
          <div className="nav-item">
            <span>Activity Logs</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
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
          {/* STAT CARDS */}
          <div className="stats-grid">
            {[
              {
                icon: "https://api.iconify.design/mdi/users.svg",
                label: "Total active users",
                value: "1,284,592",
                change: "+12.5%",
                color: "#7F55E0",
              },
              {
                icon: "https://api.iconify.design/mdi/check-circle.svg",
                label: "Verified users",
                value: "42,890",
                change: "+5.2%",
                color: "#06B6D4",
              },
              {
                icon: "https://api.iconify.design/mdi/star.svg",
                label: "Premium users",
                value: "154",
                change: null,
                color: "#FF9500",
              },
              {
                icon: "https://api.iconify.design/mdi/currency-usd.svg",
                label: "Monthly revenue",
                value: "$168,331.09",
                change: "+45%",
                color: "#2563EB",
              },
            ].map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-card-header">
                  <div
                    className="stat-card-icon"
                    style={{ background: stat.color }}
                  >
                    <img src={stat.icon} alt="" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} />
                  </div>
                  {stat.change && (
                    <span className="stat-card-change">{stat.change}</span>
                  )}
                </div>
                <div className="stat-card-label">{stat.label}</div>
                <div className="stat-card-value">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* GROWTH ANALYTICS + SIDE CARDS ROW */}
          <div className="analytics-row">
            {/* GROWTH ANALYTICS SECTION */}
            <div className="analytics-section">
              <div className="analytics-header">
                <div className="analytics-title-group">
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
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" horizontal={true} vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 10000]}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      ticks={[300, 2675, 5050, 7425, 9800]}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="purple"
                      stroke="#9333ea"
                      strokeWidth={2}
                      dot={{ fill: "#9333ea", r: 4, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6, fill: "#9333ea" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cyan"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4", r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#06b6d4" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">USER CONVERSION</div>
                  <div className="metric-value" style={{ color: "#9333ea" }}>
                    64.2%
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">CHURN RATE</div>
                  <div className="metric-value" style={{ color: "#ef4444" }}>
                    1.4%
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">AVG. SESSION</div>
                  <div className="metric-value" style={{ color: "#06b6d4" }}>
                    18m 42s
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE CARDS - Quick Actions & Security Alert */}
            <div className="side-cards">
              {/* Quick Actions */}
              <div className="quick-actions-section">
                <h2 className="section-title">Quick Actions</h2>
                <p className="section-subtitle">Admin operational shortcuts</p>
                <div className="actions-grid">
                  <button className="action-btn">Export Data</button>
                  <button className="action-btn">Bulk Verify</button>
                  <button className="action-btn">Filter Logs</button>
                  <button className="action-btn">Schedule</button>
                </div>
              </div>

              {/* Security Alerts */}
              <div className="security-alerts-card">
                <div className="security-alerts-header">
                  <svg className="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <h3 className="security-alerts-title">Security Alerts</h3>
                </div>

                <div className="alert-items">
                  {/* Alert 1 - Brute Force */}
                  <div className="alert-item critical">
                    <div className="alert-item-header">
                      <div className="alert-icon-circle">
                        <AlertCircle size={16} />
                      </div>
                      <h4 className="alert-item-title">Brute Force Attack Detected</h4>
                    </div>
                    <p className="alert-item-message">
                      Multiple failed login attempts from IP 192.168.1.45 targeting admin accounts.
                    </p>
                    <div className="alert-item-actions">
                      <button className="alert-btn-primary">Block IP</button>
                      <button className="alert-btn-link">Ignore</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* SYSTEM PULSE + REVENUE ROW */}
          <div className="pulse-revenue-row">
            {/* SYSTEM PULSE */}
            <div className="system-pulse-section">
              <h2 className="section-title">System Pulse</h2>
              <p className="section-subtitle">Recent administrative actions</p>
              <div className="pulse-list">
                <div className="pulse-item">
                  <div className="pulse-icon document">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className="pulse-content">
                    <div className="pulse-header">
                      <span className="pulse-user">William F.</span>
                      <span className="pulse-time">10:30 AM</span>
                    </div>
                    <div className="pulse-action">Updated Privacy Policy</div>
                  </div>
                </div>
                <div className="pulse-item">
                  <div className="pulse-icon system">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="pulse-content">
                    <div className="pulse-header">
                      <span className="pulse-user">System</span>
                      <span className="pulse-time">09:15 AM</span>
                    </div>
                    <div className="pulse-action">Auto-flagged 12 spam accounts</div>
                  </div>
                </div>
                <div className="pulse-item">
                  <div className="pulse-icon user">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="pulse-content">
                    <div className="pulse-header">
                      <span className="pulse-user">Elena R.</span>
                      <span className="pulse-time">08:42 AM</span>
                    </div>
                    <div className="pulse-action">Approved Coach: David Kim</div>
                  </div>
                </div>
                <div className="pulse-item">
                  <div className="pulse-icon chart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <div className="pulse-content">
                    <div className="pulse-header">
                      <span className="pulse-user">William F.</span>
                      <span className="pulse-time">08:00 AM</span>
                    </div>
                    <div className="pulse-action">Generated Weekly Rev Report</div>
                  </div>
                </div>
              </div>
            </div>

            {/* REVENUE BREAKDOWN */}
            <div className="revenue-breakdown-section">
              <div className="revenue-header">
                <h2 className="section-title">Revenue breakdown</h2>
                <span className="full-toggle">Full —</span>
              </div>

              <div className="revenue-chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={[
                      { name: "Subscriptions", value: 284500 },
                      { name: "Events", value: 18200 },
                      { name: "Ads", value: 9440 },
                      { name: "Coaching", value: 6750 },
                    ]}
                    barSize={60}
                    margin={{ left: 10, right: 10, top: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 13, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      domain={[0, 300000]}
                      tickFormatter={(value) => `$${value / 1000}k`}
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                      cursor={{ fill: "transparent" }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#3B82F6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ADMIN TEAM OVERVIEW */}
          <div className="admin-team-section">
            <div className="admin-team-header">
              <div className="admin-team-title-group">
                <h2 className="section-title">Admin Team Overview</h2>
                <p className="section-subtitle" style={{ color: '#7c3aed' }}>
                  Live status across all admin roles
                </p>
              </div>
              <a href="#" className="manage-admins-link">
                Manage Admins <ChevronRight size={16} />
              </a>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ADMIN</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>TASKS</th>
                    <th>LAST ACTIVE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="admin-cell">
                      <div className="admin-profile">
                        <div className="admin-avatar" style={{ background: '#f3e8ff' }}>SN</div>
                        <span className="admin-name">Sarah Nakato</span>
                      </div>
                    </td>
                    <td><span className="admin-role-badge">Concierge</span></td>
                    <td>
                      <div className="admin-status">
                        <span className="status-dot online"></span>
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="admin-tasks">14</td>
                    <td className="admin-last-active">Active now</td>
                  </tr>
                  <tr>
                    <td className="admin-cell">
                      <div className="admin-profile">
                        <div className="admin-avatar" style={{ background: '#fce7f3' }}>KM</div>
                        <span className="admin-name">Kwame Mensah</span>
                      </div>
                    </td>
                    <td><span className="admin-role-badge">Moderation</span></td>
                    <td>
                      <div className="admin-status">
                        <span className="status-dot online"></span>
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="admin-tasks">9</td>
                    <td className="admin-last-active">Active now</td>
                  </tr>
                  <tr>
                    <td className="admin-cell">
                      <div className="admin-profile">
                        <div className="admin-avatar" style={{ background: '#dcfce7' }}>TA</div>
                        <span className="admin-name">Tunde Adesanya</span>
                      </div>
                    </td>
                    <td><span className="admin-role-badge">Tech</span></td>
                    <td>
                      <div className="admin-status">
                        <span className="status-dot busy"></span>
                        <span>Busy</span>
                      </div>
                    </td>
                    <td className="admin-tasks">7</td>
                    <td className="admin-last-active">Active now</td>
                  </tr>
                  <tr>
                    <td className="admin-cell">
                      <div className="admin-profile">
                        <div className="admin-avatar" style={{ background: '#ffedd5' }}>FO</div>
                        <span className="admin-name">Fatima Osei</span>
                      </div>
                    </td>
                    <td><span className="admin-role-badge">Analytics</span></td>
                    <td>
                      <div className="admin-status">
                        <span className="status-dot online"></span>
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="admin-tasks">5</td>
                    <td className="admin-last-active">Active now</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="dashboard-footer">
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Support</a>
          </div>
          <div className="footer-copyright">© 2023 Butterfly</div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
