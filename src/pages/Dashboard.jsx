import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Moderation");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("admin_role") || "Moderator";
    setUserRole(role);
  }, []);

  const isSuperAdmin = userRole === "Super Admin";

  // Navigation items
  const navItems = isSuperAdmin
    ? [
      { id: "moderation", label: "Moderation", icon: "" },
      { id: "analytics", label: "Analytics", icon: "" },
      { id: "billing", label: "Billing", icon: "" },
      { id: "security", label: "Security & APIs", icon: "" },
      { id: "policies", label: "Policies", icon: "" },
      { id: "activity", label: "Activity Logs", icon: "" },
    ]
    : [
      { id: "moderation", label: "Moderation", icon: "" },
      { id: "analytics", label: "Analytics", icon: "" },
      { id: "billing", label: "Billing", icon: "" },
      { id: "security", label: "Security & API", icon: "" },
      { id: "policies", label: "Policies", icon: "" },
      { id: "activity", label: "Activity Logs", icon: "" },
    ];

  const handleNavClick = (item) => {
    if (item.id === "onboard") {
      navigate("/onboard");
    } else if (item.id === "analytics") {
      navigate("/analytics");
    } else {
      setActiveNav(item.label);
    }
  };

  // Moderator Metrics (8 cards matching the image)
  const moderatorMetrics = [
    {
      label: "Total Users",
      value: "0",
      trend: "+0%",
      trendUp: true,
      icon: "/members.jpeg",
    },
    {
      label: "Flagged Accounts",
      value: "0",
      trend: "+ 0%",
      trendUp: true,
      icon: "/flaggedAccount.png",
    },
    {
      label: "Reports Pending",
      value: "0",
      trend: "- 0%",
      trendUp: false,
      icon: "/reports.png",
    },
    {
      label: "Platform Revenue",
      value: "$0",
      trend: "+ 0%",
      trendUp: true,
      icon: "/revenue.jpeg",
    },
    {
      label: "Fraud alerts",
      value: "0",
      trend: "",
      trendUp: null,
      subtitle: "Critical security incidents",
      icon: "/Fraudalerts.png",
    },
    {
      label: "Subscription stats",
      value: "$0",
      trend: "+ 0",
      trendUp: true,
      subtitle: "Monthly recurring revenue",
      icon: "/stats.png",
    },
    {
      label: "Verified users",
      value: "0",
      trend: "+ 0%",
      trendUp: true,
      subtitle: "Accounts with completed KYC",
      icon: "/verified.png",
    },
    {
      label: "Active matches",
      value: "0",
      trend: "+ 0%",
      trendUp: true,
      subtitle: "Ongoing real-time interactions",
      icon: "/matches.png",
    },
  ];

  const trafficData = [
    { time: "00:00", users: 200 },
    { time: "04:00", users: 180 },
    { time: "08:00", users: 350 },
    { time: "12:00", users: 620 },
    { time: "16:00", users: 580 },
    { time: "20:00", users: 450 },
    { time: "23:59", users: 300 },
  ];

  const recentLogs = [
    { id: 1, user: "Banned User", event: "System AI", time: "14:20" },
    {
      id: 2,
      user: "Updated Policy",
      event: "Sarah C.",
      time: "12:45",
      subtext: "v2.4.1 applies",
    },
    {
      id: 3,
      user: "Cleared Cache",
      event: "Auto - Task",
      time: "12:10",
      subtext: "cdn_edge_01",
    },
  ];

  const revenueBreakdown = [
    {
      title: "Premium Subscriptions",
      amount: "$284,500",
      percent: "-12%",
      positive: false,
    },
    {
      title: "In-App Events",
      amount: "$78,290",
      percent: "-24%",
      positive: false,
    },
    {
      title: "Affiliate & Ads",
      amount: "$9,440",
      percent: "-8%",
      positive: false,
    },
    {
      title: "Coaching Sessions",
      amount: "$8,730",
      percent: "-4%",
      positive: false,
    },
  ];

  const liveActivity = [
    {
      id: 1,
      title: "Elena B. raised a critical payment dispute — escalated to SU",
      time: "43 MINUTES AGO",
    },
    {
      id: 2,
      title: "Tunde A. deployed algorithm update v2.4.1 — now live",
      time: "1 HOUR AGO",
    },
    {
      id: 3,
      title: "Catherine M. & David D. reached Engagement stage",
      time: "2 HOURS AGO",
    },
  ];

  const securityAlerts = [
    {
      type: "critical",
      title: "Brute Force Attack Detected",
      desc: "Multiple failed login attempts from IP 192.168.0.15 targeting admin accounts.",
      time: "Just now",
      action: "Block IP",
    },
    {
      type: "warning",
      title: "Policy Update Required",
      desc: "New GDPR amendments require an update to the Data Retention policy by Oct 15.",
      time: "2 hours ago",
    },
  ];

  // Super Admin Data
  const adminTeam = [
    {
      name: "Sarah Nakato",
      role: "Concierge",
      initials: "SN",
      status: "Online",
      tasks: 14,
      lastActive: "Active now",
      color: "#8B5CF6",
    },
    {
      name: "Kwame Mensah",
      role: "Moderation",
      initials: "KM",
      status: "Online",
      tasks: 9,
      lastActive: "Active now",
      color: "#F59E0B",
    },
    {
      name: "Tunde Adewunmi",
      role: "Tech",
      initials: "TA",
      status: "Busy",
      tasks: 7,
      lastActive: "Active now",
      color: "#3B82F6",
    },
    {
      name: "Fatima Dasi",
      role: "Analytics",
      initials: "FD",
      status: "Online",
      tasks: 5,
      lastActive: "Active now",
      color: "#EC4899",
    },
  ];

  const criticalAlerts = [
    {
      type: "Fraud detected",
      target: "Target: user_682",
      time: "2m ago",
      color: "#EF4444",
    },
    {
      type: "Ban detected",
      target: "Target: bob_alpha",
      time: "15m ago",
      color: "#F97316",
    },
    {
      type: "Audit detected",
      target: "Target: sys_root",
      time: "1h ago",
      color: "#EAB308",
    },
    {
      type: "Report detected",
      target: "Target: member_44",
      time: "2h ago",
      color: "#EF4444",
    },
    {
      type: "Verification detected",
      target: "Target: premium_99",
      time: "5h ago",
      color: "#F97316",
    },
  ];

  const quickActions = [
    { icon: "/onboard.png", label: "Onboard New Admin", path: "/onboard" },
    { icon: "/suspend.png", label: "Emergency Suspend" },
    { icon: "/override.png", label: "Override Decision" },
    { icon: "/configs.png", label: "System Config" },
    { icon: "/export.png", label: "Export Report" },
    { icon: "/broard.png", label: "Broadcast Alert" },
  ];

  const modules = [
    { icon: "/bill.png", label: "Billing & Revenue", bg: "#FEF3C7" },
    { icon: "/security.png", label: "Security & APIs", bg: "#EDE9FE" },
    { icon: "/policies.png", label: "Policies & Terms", bg: "#DBEAFE" },
    { icon: "/analytics.png", label: "Analytics Engine", bg: "#D1FAE5" },
    { icon: "/admin.jpeg", label: "Admin Management", bg: "#FCE7F3" },
  ];

  if (isSuperAdmin) {
    // Super Admin View
    return (
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <div className="admin-logo">
              <img
                src="/butterfly-logo.png"
                alt="Butterfly"
                className="admin-logo-img"
              />
              <span className="admin-logo-text">Butterfly</span>
            </div>
          </div>

          <div className="admin-sidebar-section">
            <div className="admin-sidebar-label">CORE OPERATIONS</div>
            <nav className="admin-sidebar-nav">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`admin-nav-item ${
                    activeNav === item.label ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  <span className="admin-nav-label">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>

          <div className="admin-sidebar-footer">
            <button className="admin-logout-btn">
              <span>↪</span> Logout
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <div className="header-search">
              <span className="search-dots">● ● ●</span>
              <svg
                className="search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input type="text" placeholder="Search dashboard..." />
            </div>
            <div className="header-actions">
              <button className="icon-btn notification">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button className="icon-btn settings">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  <path
                    d="M19.4 15C19.2 15.4 19.2 15.8 19.4 16.2L20.3 17.8C20.5 18.2 20.5 18.7 20.2 19L19 20.2C18.7 20.5 18.2 20.5 17.8 20.3L16.2 19.4C15.8 19.2 15.4 19.2 15 19.4L15.2 21.4C15.2 21.8 14.9 22.2 14.5 22.2H12.5C12.1 22.2 11.8 21.9 11.8 21.4L12 19.4C11.6 19.2 11.2 19.2 10.8 19.4L9.2 20.3C8.8 20.5 8.3 20.5 8 20.2L6.8 19C6.5 18.7 6.5 18.2 6.7 17.8L7.6 16.2C7.8 15.8 7.8 15.4 7.6 15L5.6 14.8C5.2 14.8 4.8 14.5 4.8 14.1V12.1C4.8 11.7 5.1 11.4 5.6 11.4L7.6 11.2C7.8 10.8 7.8 10.4 7.6 10L6.7 8.4C6.5 8 6.5 7.5 6.8 7.2L8 6C8.3 5.7 8.8 5.7 9.2 5.9L10.8 6.8C11.2 7 11.6 7 12 6.8L12.2 4.8C12.2 4.4 12.5 4 12.9 4H14.9C15.3 4 15.6 4.3 15.6 4.8L15.8 6.8C16.2 7 16.6 7 17 6.8L18.6 5.9C19 5.7 19.5 5.7 19.8 6L21 7.2C21.3 7.5 21.3 8 21.1 8.4L20.2 10C20 10.4 20 10.8 20.2 11.2L22.2 11.4C22.6 11.4 23 11.7 23 12.1V14.1C23 14.5 22.7 14.8 22.2 14.8L19.4 15Z"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <div className="user-profile">
                <div className="user-info">
                  <span className="user-name">Super Admin</span>
                  <span className="user-email">admin@admincore.io</span>
                </div>
                <div className="user-avatar">SA</div>
              </div>
            </div>
          </header>

          <div className="admin-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">System Overview</h1>
                <p className="page-subtitle">
                  Global controls & real-time platform health
                </p>
              </div>
              <div className="system-status">
                <span className="status-indicator"></span>
                <span>System Online — v2.4.1</span>
              </div>
            </div>

            {/* Metrics Cards Row */}
            <div className="admin-metrics-row">
              <div className="admin-metric-card" data-testid="metric-card">
                <div className="admin-metric-header">
                  <img
                    src="/members.jpeg"
                    alt="Members"
                    className="admin-metric-icon-img"
                  />
                  <span className="admin-metric-trend positive">
                    ↗ 8.2% this month
                  </span>
                </div>
                <div className="admin-metric-label">TOTAL MEMBERS</div>
                <div className="admin-metric-value">0</div>
                <div className="admin-metric-subtitle">
                  Free + Premium globally
                </div>
              </div>

              <div className="admin-metric-card" data-testid="metric-card">
                <div className="admin-metric-header">
                  <img
                    src="/premium.png"
                    alt="Premium"
                    className="admin-metric-icon-img"
                  />
                  <span className="admin-metric-trend positive">
                    ↗ 0% this month
                  </span>
                </div>
                <div className="admin-metric-label">PREMIUM USERS</div>
                <div className="admin-metric-value">0</div>
                <div className="admin-metric-subtitle">0% conversion rate</div>
              </div>

              <div className="admin-metric-card" data-testid="metric-card">
                <div className="admin-metric-header">
                  <img
                    src="/revenue.jpeg"
                    alt="Revenue"
                    className="admin-metric-icon-img"
                  />
                  <span className="admin-metric-trend positive">
                    ↗ 15.4% vs yesterday
                  </span>
                </div>
                <div className="admin-metric-label">REVENUE (24HRS)</div>
                <div className="admin-metric-value">$0</div>
                <div className="admin-metric-subtitle">
                  Subscriptions + events
                </div>
              </div>

              <div className="admin-metric-card" data-testid="metric-card">
                <div className="admin-metric-header">
                  <img
                    src="/adminonline.png"
                    alt="Admin Online"
                    className="admin-metric-icon-img"
                  />
                  <span className="admin-metric-trend negative">
                    8 currently offline
                  </span>
                </div>
                <div className="admin-metric-label">ADMINS ONLINE</div>
                <div className="admin-metric-value">0 / 0</div>
                <div className="admin-metric-subtitle">
                  Across all departments
                </div>
              </div>

              <div
                className="admin-metric-card escalations"
                data-testid="metric-card"
              >
                <div className="admin-metric-header">
                  <img
                    src="/escalations.png"
                    alt="Escalations"
                    className="admin-metric-icon-img"
                  />
                  <span className="admin-metric-badge">3 since yesterday</span>
                </div>
                <div className="admin-metric-label">ACTIVE ESCALATIONS</div>
                <div className="admin-metric-value">0</div>
                <div className="admin-metric-subtitle">
                  Require SU intervention
                </div>
              </div>
            </div>

            <div className="dashboard-middle">
              <section
                className="chart-section"
                role="region"
                aria-labelledby="platform-engagement-heading"
                data-testid="chart-container"
              >
                <div className="section-header">
                  <div>
                    <h3 id="platform-engagement-heading">
                      Platform Engagement
                    </h3>
                    <p>Daily growth and match frequency</p>
                  </div>
                </div>
                <div className="chart-container-large">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient
                          id="colorUsers"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#A855F7"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#A855F7"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#A855F7"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <div className="quick-actions">
                <div className="section-header">
                  <div>
                    <h3>Quick Actions</h3>
                    <p>Instant executive commands</p>
                  </div>
                </div>
                <div className="qa-grid">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="qa-btn"
                      onClick={() => {
                        if (action.path) {
                          navigate(action.path);
                        }
                      }}
                    >
                      <img src={action.icon} alt="" className="qa-icon-img" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-bottom">
              <div className="team-section">
                <div className="section-header">
                  <div>
                    <h3>Admin Team Overview</h3>
                    <p>Live status across all admin roles</p>
                  </div>
                  <button className="manage-link">Manage Admins →</button>
                </div>
                <table className="team-table">
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
                    {adminTeam.map((member) => (
                      <tr key={member.name}>
                        <td>
                          <div className="member-cell">
                            <div
                              className="member-avatar"
                              style={{ background: member.color }}
                            >
                              {member.initials}
                            </div>
                            <span>{member.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="role-badge">{member.role}</span>
                        </td>
                        <td>
                          <span
                            className={`status-badge ${member.status.toLowerCase()}`}
                          >
                            <span className="status-dot"></span>
                            {member.status}
                          </span>
                        </td>
                        <td>
                          <span className="tasks-badge">{member.tasks}</span>
                        </td>
                        <td className="last-active">{member.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="alerts-section">
                <div className="section-header">
                  <div>
                    <h3>Critical Alerts</h3>
                    <p>Security and fraud notifications</p>
                  </div>
                </div>
                <div className="alerts-list">
                  {criticalAlerts.map((alert, i) => (
                    <div className="alert-item" key={i}>
                      <div
                        className="alert-bullet"
                        style={{ background: alert.color }}
                      ></div>
                      <div className="alert-info">
                        <div className="alert-type">{alert.type}</div>
                        <div className="alert-target">{alert.target}</div>
                      </div>
                      <div className="alert-time">{alert.time}</div>
                    </div>
                  ))}
                </div>
                <button className="view-all-alerts">
                  View All Activity Log
                </button>
              </div>
            </div>

            <div className="modules-section">
              <h3 className="modules-title">Administrative Modules</h3>
              <div className="modules-grid">
                {modules.map((mod) => (
                  <div
                    className={`module-card ${
                      mod.label === "Admin Management" ||
                      mod.label === "Analytics Engine"
                        ? "clickable"
                        : ""
                    }`}
                    key={mod.label}
                    onClick={() => {
                      if (mod.label === "Admin Management") {
                        navigate("/adminManagement");
                      }
                      if (mod.label === "Analytics Engine") {
                        navigate("/analytics");
                      }
                    }}
                    style={{
                      cursor:
                        mod.label === "Admin Management" ||
                        mod.label === "Analytics Engine"
                          ? "pointer"
                          : "default",
                    }}
                  >
                    <div className="module-icon" style={{ background: mod.bg }}>
                      <img src={mod.icon} alt="" className="module-icon-img" />
                    </div>
                    <span className="module-label">{mod.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <footer className="admin-footer">
              <span>© 2026 Butterfly Ijeoma Limmited</span>
            </footer>
          </div>
        </main>
      </div>
    );
  }

  // Moderator View - Matching the image exactly
  return (
    <div className="moderator-view">
      {/* Sidebar */}
      <aside className="mod-sidebar">
        <div className="mod-sidebar-header">
          <div className="mod-logo">
            <img
              src="/butterfly-logo.png"
              alt="Butterfly"
              className="mod-logo-img"
            />
            <span className="mod-logo-text">Butterfly</span>
          </div>
        </div>

        <div className="mod-sidebar-section">
          <div className="mod-sidebar-label">CORE OPERATIONS</div>
          <nav className="mod-sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`mod-nav-item ${
                  activeNav === item.label ? "active" : ""
                }`}
                onClick={() => handleNavClick(item)}
              >
                <span className="mod-nav-icon">{item.icon}</span>
                <span className="mod-nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="mod-sidebar-footer">
          <button className="mod-logout-btn">
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mod-main">
        {/* Header */}
        <header className="mod-header">
          <div className="mod-header-search">
            <svg
              className="mod-search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
              <path
                d="M21 21L16.65 16.65"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users, reports, or logs..."
            />
          </div>
          <div className="mod-header-actions">
            <button className="mod-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <div className="mod-user-profile">
              <div className="mod-user-info">
                <span className="mod-user-name">Marcus Vance</span>
                <span className="mod-user-role">Head Moderator</span>
              </div>
              <div className="mod-user-avatar">
                <img src="/avatar-marcus.png" alt="Marcus" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="mod-dashboard-body">
          {/* Title */}
          <div className="mod-dashboard-title">
            <h1>Dashboard Overview</h1>
            <p>System health and high-level engagement metrics.</p>
          </div>

          {/* Metrics Grid - 8 cards in 2 rows */}
          <div className="mod-metrics-grid">
            {moderatorMetrics.map((metric, index) => (
              <div
                key={index}
                className={`mod-metric-card ${
                  metric.label === "Flagged Accounts" ? "clickable" : ""
                }`}
                onClick={() =>
                  metric.label === "Flagged Accounts" &&
                  navigate("/flaggedAccount")
                }
                style={{
                  cursor:
                    metric.label === "Flagged Accounts" ? "pointer" : "default",
                }}
              >
                <div className="mod-metric-header">
                  <img
                    src={metric.icon}
                    alt=""
                    className="mod-metric-icon-img"
                  />
                  {metric.trend && (
                    <span
                      className={`mod-metric-trend ${
                        metric.trendUp ? "positive" : "negative"
                      }`}
                    >
                      {metric.trend}
                    </span>
                  )}
                </div>
                <div className="mod-metric-content">
                  <div className="mod-metric-label">{metric.label}</div>
                  <div className="mod-metric-value">{metric.value}</div>
                  {metric.subtitle && (
                    <div className="mod-metric-subtitle">{metric.subtitle}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Middle Row - Traffic Insights + Recent Logs + Revenue */}
          <div className="mod-dashboard-row">
            {/* Traffic Insights Chart */}
            <div className="mod-chart-card">
              <div className="mod-card-header">
                <div>
                  <h3>Traffic Insights</h3>
                  <p>Platform activity over the last 24 hours</p>
                </div>
                <div className="mod-chart-filters">
                  <span className="mod-filter-btn active">24h</span>
                  <span className="mod-filter-btn">7d</span>
                  <span className="mod-filter-btn">30d</span>
                </div>
              </div>
              <div className="mod-chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient
                        id="colorTraffic"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E5E7EB"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorTraffic)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mod-chart-label">Container</div>
              </div>
            </div>

            {/* Right Column - Recent Logs & Revenue */}
            <div className="mod-right-column">
              {/* Recent Logs */}
              <div className="mod-logs-card">
                <div className="mod-card-header-small">
                  <h3>Recent Logs</h3>
                </div>
                <div className="mod-logs-list">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="mod-log-item">
                      <div className="mod-log-main">
                        <span className="mod-log-user">{log.user}</span>
                        <span className="mod-log-event">{log.event}</span>
                      </div>
                      {log.subtext && (
                        <span className="mod-log-subtext">{log.subtext}</span>
                      )}
                      <span className="mod-log-time">{log.time}</span>
                    </div>
                  ))}
                </div>
                <button className="mod-browse-link">Browse all logs →</button>
              </div>

              {/* Revenue Breakdown */}
              <div className="mod-revenue-card">
                <div className="mod-card-header-small">
                  <h3>Revenue Breakdown</h3>
                  <span className="mod-this-month">
                    This month, all streams
                  </span>
                </div>
                <div className="mod-revenue-list">
                  {revenueBreakdown.map((item, idx) => (
                    <div key={idx} className="mod-revenue-item">
                      <span className="mod-revenue-title">{item.title}</span>
                      <div className="mod-revenue-values">
                        <span className="mod-revenue-amount">
                          {item.amount}
                        </span>
                        <span className="mod-revenue-percent">
                          {item.percent}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Live Activity, Security Alerts */}
          <div className="mod-bottom-row">
            {/* Live Activity */}
            <div className="mod-activity-card">
              <div className="mod-card-header">
                <h3>Live Activity</h3>
                <button type="button" className="mod-view-log-link">
                  View Log →
                </button>
              </div>
              <p className="mod-activity-subtitle">Real-time platform events</p>
              <div className="mod-activity-list">
                {liveActivity.map((activity) => (
                  <div key={activity.id} className="mod-activity-item">
                    <div className="mod-activity-dot"></div>
                    <div className="mod-activity-content">
                      <div className="mod-activity-title">{activity.title}</div>
                      <div className="mod-activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Alerts */}
            <div className="mod-security-card">
              <div className="mod-card-header">
                <div className="mod-security-title">
                  <span className="mod-shield-icon">🛡️</span>
                  <h3>Security Alerts</h3>
                </div>
              </div>
              <div className="mod-security-list">
                {securityAlerts.map((alert, idx) => (
                  <div key={idx} className={`mod-security-alert ${alert.type}`}>
                    <div className="mod-alert-icon">
                      {alert.type === "critical" ? "" : ""}
                    </div>
                    <div className="mod-alert-content">
                      <div className="mod-alert-title">{alert.title}</div>
                      <div className="mod-alert-desc">{alert.desc}</div>
                      {alert.action && (
                        <button className="mod-alert-action-btn">
                          {alert.action}
                        </button>
                      )}
                    </div>
                    <div className="mod-alert-time">{alert.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mod-footer">
            <span>
              © 2023 HouseSquad Systems. All Rights Reserved. Authorized
              personnel only.
            </span>
            <div className="mod-footer-links">
              <button type="button">Privacy</button>
              <button type="button">Compliance</button>
              <button type="button">Support</button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
