import React, { useState } from "react";
import "../styles/ModeratorDashboard.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ModeratorDashboard = () => {
  const [activeNav, setActiveNav] = useState("Moderation");

  const trafficData = [
    { time: "00:00", users: 250 },
    { time: "04:00", users: 280 },
    { time: "08:00", users: 450 },
    { time: "12:00", users: 850 },
    { time: "16:00", users: 920 },
    { time: "20:00", users: 680 },
    { time: "23:59", users: 480 },
  ];

  const navItems = [
    { id: "concierge", label: "Concierge", icon: "🏠" },
    { id: "moderation", label: "Moderation", icon: "👁" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "security", label: "Security & API", icon: "🔒" },
    { id: "policies", label: "Policies", icon: "📄" },
    { id: "activity", label: "Activity Logs", icon: "📝" },
    { id: "tech", label: "Tech Panel", icon: "⚙️" },
  ];

  const metrics = [
    { label: "Total Users", value: "12,842", trend: "+ 12.5%", icon: "👥", trendUp: true },
    { label: "Flagged Accounts", value: "1,429", trend: "+ 3.2%", icon: "🚩", trendUp: true },
    { label: "Reports Pending", value: "48", trend: "- 16.4%", icon: "⏳", trendUp: false },
    { label: "Platform Revenue", value: "$42,390", trend: "+ 8.1%", icon: "💵", trendUp: true },
    { label: "Fraud alerts", value: "12", trend: "", icon: "⚠️", trendUp: null, subtitle: "Critical security incidents" },
    { label: "Subscription stats", value: "$42.5k", trend: "+ 3.8%", icon: "📋", trendUp: true, subtitle: "Monthly recurring revenue" },
    { label: "Verified users", value: "9,421", trend: "+ 8.1%", icon: "✅", trendUp: true, subtitle: "Accounts with completed KYC" },
    { label: "Active matches", value: "2,109", trend: "+ 22.5%", icon: "⚡", trendUp: true, subtitle: "Ongoing real-time interactions" },
  ];

  const liveConcierge = [
    { id: 1, name: "Emma Wilson", message: "Cannot access my billing", time: "2m ago", avatar: "EW" },
    { id: 2, name: "David Kim", message: "My app keeps returning 401 error...", time: "5m ago", avatar: "DK" },
    { id: 3, name: "Sofia Garcia", message: "How do I upgrade my team seat?", time: "8m ago", avatar: "SG" },
  ];

  const liveActivity = [
    { id: 1, title: "Elena B. raised a critical payment dispute — escalated to SU", time: "43 MINUTES AGO" },
    { id: 2, title: "Tunde A. deployed algorithm update v2.4.1 — now live", time: "1 HOUR AGO" },
    { id: 3, title: "Catherine M. & David D. reached Engagement stage", time: "2 HOURS AGO" },
  ];

  const recentLogs = [
    { id: 1, user: "Banned User", event: "System AI", time: "14:20" },
    { id: 2, user: "Updated Policy", event: "Sarah C.", time: "12:45", subtext: "v2.4.1 applies" },
    { id: 3, user: "Cleared Cache", event: "Auto - Task", time: "12:10", subtext: "cdn_edge_01" },
  ];

  const revenueBreakdown = [
    { title: "Premium Subscriptions", amount: "$284,500", percent: "-12%", positive: false },
    { title: "In-App Events", amount: "$78,290", percent: "-24%", positive: false },
    { title: "Affiliate & Ads", amount: "$9,440", percent: "-8%", positive: false },
    { title: "Coaching Sessions", amount: "$8,730", percent: "-4%", positive: false },
  ];

  return (
    <div className="moderator-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="/butterfly-logo.png" alt="Butterfly" className="logo-img" />
            <span className="logo-text">Butterfly</span>
          </div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-label">CORE OPERATIONS</div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn"><span>↪</span> Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-search">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Search users, reports, or logs..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" fill="#6B7280" />
                <path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="#6B7280" strokeWidth="2" />
              </svg>
            </button>
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Marcus Vance</span>
                <span className="user-role">Head Moderator</span>
              </div>
              <div className="user-avatar">
                <img src="/avatar-marcus.png" alt="Marcus" />
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          <div className="dashboard-title-section">
            <h1>Dashboard Overview</h1>
            <p>System health and high-level engagement metrics.</p>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-header">
                  <div className="metric-icon-wrapper">{metric.icon}</div>
                  {metric.trend && (
                    <span className={`metric-trend ${metric.trendUp ? "positive" : "negative"}`}>
                      {metric.trend}
                    </span>
                  )}
                </div>
                <div className="metric-content">
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-value">{metric.value}</div>
                  {metric.subtitle && <div className="metric-subtitle">{metric.subtitle}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-row">
            <div className="chart-card traffic-insights">
              <div className="card-header">
                <div>
                  <h3>Traffic Insights</h3>
                  <p className="card-subtitle">Platform activity over the last 24 hours</p>
                </div>
                <div className="chart-legend">
                  <span className="legend-item">Container</span>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="logs-card">
              <div className="card-header">
                <h3>Recent Logs</h3>
                <div className="log-filters">
                  <span className="filter-pill active">All</span>
                  <span className="filter-pill">System AI</span>
                </div>
              </div>
              <div className="logs-list">
                {recentLogs.map((log) => (
                  <div key={log.id} className="log-item">
                    <div className="log-main">
                      <span className="log-user">{log.user}</span>
                      <span className="log-event">{log.event}</span>
                    </div>
                    {log.subtext && <span className="log-subtext">{log.subtext}</span>}
                    <span className="log-time">{log.time}</span>
                  </div>
                ))}
              </div>
              <button className="view-all-link">Browse all logs →</button>
            </div>
          </div>

          <div className="dashboard-row bottom-row">
            <div className="concierge-card">
              <div className="card-header">
                <div className="concierge-title">
                  <span className="live-indicator">🔵</span>
                  <h3>Live Concierge</h3>
                </div>
                <span className="live-badge">Live</span>
              </div>
              <div className="concierge-list">
                {liveConcierge.map((item) => (
                  <div key={item.id} className="concierge-item">
                    <div className="concierge-avatar">{item.avatar}</div>
                    <div className="concierge-info">
                      <div className="concierge-name">{item.name}</div>
                      <div className="concierge-message">{item.message}</div>
                    </div>
                    <div className="concierge-time">{item.time}</div>
                  </div>
                ))}
              </div>
              <button className="open-dashboard-btn">Open Support Dashboard <span>↗</span></button>
            </div>

            <div className="activity-card">
              <div className="card-header">
                <h3>Live Activity</h3>
                <a href="#" className="view-log-link">View Log →</a>
              </div>
              <p className="activity-subtitle">Real-time platform events</p>
              <div className="activity-list">
                {liveActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="revenue-security-col">
              <div className="revenue-card">
                <div className="card-header"><h3>Revenue Breakdown</h3></div>
                <div className="revenue-list">
                  {revenueBreakdown.map((item, idx) => (
                    <div key={idx} className="revenue-item">
                      <div className="revenue-info">
                        <span className="revenue-dot"></span>
                        <span className="revenue-title">{item.title}</span>
                      </div>
                      <div className="revenue-values">
                        <span className="revenue-amount">{item.amount}</span>
                        <span className="revenue-percent negative">{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <footer className="dashboard-footer">
            <span>© 2023 HouseSquad Systems. All Rights Reserved. Authorized personnel only.</span>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Compliance</a>
              <a href="#">Support</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default ModeratorDashboard;
