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
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("admin_role") || "Moderator";
    const email = localStorage.getItem("admin_email") || "marcus@admincore.io";
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const isSuperAdmin = userRole === "Super Admin";

  // Navigation items
  const navItems = isSuperAdmin
    ? [
        { id: "dashboard", label: "Dashboard", icon: "📊" },
        { id: "admins", label: "Admins", icon: "👥" },
        { id: "onboard", label: "Onboard", icon: "➕" },
        { id: "activity", label: "Activity Log", icon: "📝" },
      ]
    : [
        { id: "concierge", label: "Concierge", icon: "💬" },
        { id: "moderation", label: "Moderation", icon: "👁" },
        { id: "analytics", label: "Analytics", icon: "📊" },
        { id: "billing", label: "Billing", icon: "💳" },
        { id: "security", label: "Security & API", icon: "🔒" },
        { id: "policies", label: "Policies", icon: "📄" },
        { id: "activity", label: "Activity Logs", icon: "📝" },
        { id: "tech", label: "Tech Panel", icon: "⚙️" },
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
      value: "12,842",
      trend: "+ 12.5%",
      trendUp: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
        </svg>
      ),
    },
    {
      label: "Flagged Accounts",
      value: "1,429",
      trend: "+ 3.2%",
      trendUp: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15C4 15 5.5 14 8 14C10.5 14 12 15 15 15C17.5 15 19 14 19 14V4C19 4 17.5 5 15 5C12 5 10.5 4 8 4C5.5 4 4 5 4 5V21" />
        </svg>
      ),
    },
    {
      label: "Reports Pending",
      value: "48",
      trend: "- 18.4%",
      trendUp: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6V12L16 14" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Platform Revenue",
      value: "$42,390",
      trend: "+ 8.1%",
      trendUp: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" />
        </svg>
      ),
    },
    {
      label: "Fraud alerts",
      value: "12",
      trend: "",
      trendUp: null,
      subtitle: "Critical security incidents",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18C1.64547 18.3024 1.55298 18.6453 1.552 18.9945C1.55102 19.3437 1.64158 19.6871 1.81442 19.9895C1.98727 20.2919 2.23664 20.5427 2.53849 20.7164C2.84033 20.8901 3.18357 20.9812 3.53 21H20.47C20.8164 20.9812 21.1597 20.8901 21.4615 20.7164C21.7634 20.5427 22.0127 20.2919 22.1856 19.9895C22.3584 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3545 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9823 3.15551C12.6839 2.98791 12.3483 2.90128 12.0075 2.90423C11.6667 2.90718 11.3326 2.99963 11.0368 3.17206C10.741 3.34448 10.4937 3.59139 10.32 3.888L10.29 3.86Z" />
          <path d="M12 9V13" strokeLinecap="round" />
          <path d="M12 17H12.01" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Subscription stats",
      value: "$42.5k",
      trend: "+ 3.8%",
      trendUp: true,
      subtitle: "Monthly recurring revenue",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" />
          <path d="M3 10H21" />
        </svg>
      ),
    },
    {
      label: "Verified users",
      value: "9,421",
      trend: "+ 8.1%",
      trendUp: true,
      subtitle: "Accounts with completed KYC",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" />
          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
          <path d="M9 11L11 13L15 9" />
        </svg>
      ),
    },
    {
      label: "Active matches",
      value: "2,109",
      trend: "+ 22.5%",
      trendUp: true,
      subtitle: "Ongoing real-time interactions",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
        </svg>
      ),
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
    { id: 2, user: "Updated Policy", event: "Sarah C.", time: "12:45", subtext: "v2.4.1 applies" },
    { id: 3, user: "Cleared Cache", event: "Auto - Task", time: "12:10", subtext: "cdn_edge_01" },
  ];

  const revenueBreakdown = [
    { title: "Premium Subscriptions", amount: "$284,500", percent: "-12%", positive: false },
    { title: "In-App Events", amount: "$78,290", percent: "-24%", positive: false },
    { title: "Affiliate & Ads", amount: "$9,440", percent: "-8%", positive: false },
    { title: "Coaching Sessions", amount: "$8,730", percent: "-4%", positive: false },
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

  const securityAlerts = [
    { type: "critical", title: "Brute Force Attack Detected", desc: "Multiple failed login attempts from IP 192.168.0.15 targeting admin accounts.", time: "Just now", action: "Block IP" },
    { type: "warning", title: "Policy Update Required", desc: "New GDPR amendments require an update to the Data Retention policy by Oct 15.", time: "2 hours ago" },
  ];

  // Super Admin Data
  const superAdminMetrics = [
    { label: "TOTAL MEMBERS", value: "1,284,502", trend: "+ 8.2% this month", sub: "Free + Premium globally", icon: "users", trendType: "positive" },
    { label: "PREMIUM USERS", value: "87,430", trend: "+ 13.4% this month", sub: "5.8% conversion rate", icon: "star", trendType: "positive" },
    { label: "REVENUE (24HRS)", value: "$142,890", trend: "+ 15.4% vs yesterday", sub: "Subscriptions + events", icon: "dollar", trendType: "positive" },
    { label: "ADMINS ONLINE", value: "42 / 50", trend: "8 currently offline", sub: "Across all departments", icon: "admin", trendType: "offline" },
    { label: "ACTIVE ESCALATIONS", value: "18", trend: "3 active yesterday", sub: "Require SU intervention", icon: "alert", trendType: "negative", isAlert: true },
  ];

  const adminTeam = [
    { name: "Sarah Nakato", role: "Concierge", initials: "SN", status: "Online", tasks: 14, lastActive: "Active now", color: "#8B5CF6" },
    { name: "Kwame Mensah", role: "Moderation", initials: "KM", status: "Online", tasks: 9, lastActive: "Active now", color: "#F59E0B" },
    { name: "Tunde Adewunmi", role: "Tech", initials: "TA", status: "Busy", tasks: 7, lastActive: "Active now", color: "#3B82F6" },
    { name: "Fatima Dasi", role: "Analytics", initials: "FD", status: "Online", tasks: 5, lastActive: "Active now", color: "#EC4899" },
  ];

  const criticalAlerts = [
    { type: "Fraud detected", target: "Target: user_682", time: "2m ago", color: "#EF4444" },
    { type: "Ban detected", target: "Target: bob_alpha", time: "15m ago", color: "#F97316" },
    { type: "Audit detected", target: "Target: sys_root", time: "1h ago", color: "#EAB308" },
    { type: "Report detected", target: "Target: member_44", time: "2h ago", color: "#EF4444" },
    { type: "Verification detected", target: "Target: premium_99", time: "5h ago", color: "#F97316" },
  ];

  const quickActions = [
    { icon: "+", label: "Onboard New Admin", action: () => navigate("/onboard") },
    { icon: "⚡", label: "Emergency Suspend" },
    { icon: "↺", label: "Override Decision" },
    { icon: "⚙️", label: "System Config" },
    { icon: "📄", label: "Export Report" },
    { icon: "📢", label: "Broadcast Alert" },
  ];

  const modules = [
    { icon: "💳", label: "Billing & Revenue", bg: "#FEF3C7" },
    { icon: "🔒", label: "Security & APIs", bg: "#EDE9FE" },
    { icon: "📄", label: "Policies & Terms", bg: "#DBEAFE" },
    { icon: "📊", label: "Analytics Engine", bg: "#D1FAE5" },
    { icon: "👤", label: "Admin Management", bg: "#FCE7F3" },
  ];

  if (isSuperAdmin) {
    // Super Admin View
    return (
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            <span className="nav-icon">🦋</span>
            <span className="brand-name">Butterfly</span>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">CORE OPERATIONS</div>
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeNav === item.label ? "active" : ""}`}
                  onClick={() => handleNavClick(item)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
          <div className="sidebar-footer">
            <button className="logout-btn">
              <span>↪</span> Logout
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <div className="header-search">
              <span className="search-dots">● ● ●</span>
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input type="text" placeholder="Search dashboard..." />
            </div>
            <div className="header-actions">
              <button className="icon-btn notification">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="#6B7280" strokeWidth="2" />
                </svg>
              </button>
              <button className="icon-btn settings">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="#6B7280" strokeWidth="2" />
                  <path d="M19.4 15C19.2 15.4 19.2 15.8 19.4 16.2L20.3 17.8C20.5 18.2 20.5 18.7 20.2 19L19 20.2C18.7 20.5 18.2 20.5 17.8 20.3L16.2 19.4C15.8 19.2 15.4 19.2 15 19.4L15.2 21.4C15.2 21.8 14.9 22.2 14.5 22.2H12.5C12.1 22.2 11.8 21.9 11.8 21.4L12 19.4C11.6 19.2 11.2 19.2 10.8 19.4L9.2 20.3C8.8 20.5 8.3 20.5 8 20.2L6.8 19C6.5 18.7 6.5 18.2 6.7 17.8L7.6 16.2C7.8 15.8 7.8 15.4 7.6 15L5.6 14.8C5.2 14.8 4.8 14.5 4.8 14.1V12.1C4.8 11.7 5.1 11.4 5.6 11.4L7.6 11.2C7.8 10.8 7.8 10.4 7.6 10L6.7 8.4C6.5 8 6.5 7.5 6.8 7.2L8 6C8.3 5.7 8.8 5.7 9.2 5.9L10.8 6.8C11.2 7 11.6 7 12 6.8L12.2 4.8C12.2 4.4 12.5 4 12.9 4H14.9C15.3 4 15.6 4.3 15.6 4.8L15.8 6.8C16.2 7 16.6 7 17 6.8L18.6 5.9C19 5.7 19.5 5.7 19.8 6L21 7.2C21.3 7.5 21.3 8 21.1 8.4L20.2 10C20 10.4 20 10.8 20.2 11.2L22.2 11.4C22.6 11.4 23 11.7 23 12.1V14.1C23 14.5 22.7 14.8 22.2 14.8L19.4 15Z" stroke="#6B7280" strokeWidth="2" />
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
                <p className="page-subtitle">Global controls & real-time platform health</p>
              </div>
              <div className="system-status">
                <span className="status-indicator"></span>
                <span>System Online — v2.4.1</span>
              </div>
            </div>

            {/* Metrics Cards Row */}
            <div className="admin-metrics-row">
              <div className="admin-metric-card">
                <div className="admin-metric-header">
                  <div className="admin-metric-icon">👥</div>
                  <span className="admin-metric-trend positive">↗ 8.2% this month</span>
                </div>
                <div className="admin-metric-label">TOTAL MEMBERS</div>
                <div className="admin-metric-value">1,384,502</div>
                <div className="admin-metric-subtitle">Free + Premium globally</div>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-header">
                  <div className="admin-metric-icon">👤</div>
                  <span className="admin-metric-trend positive">↗ 13.4% this month</span>
                </div>
                <div className="admin-metric-label">PREMIUM USERS</div>
                <div className="admin-metric-value">87,430</div>
                <div className="admin-metric-subtitle">6.8% conversion rate</div>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-header">
                  <div className="admin-metric-icon">$</div>
                  <span className="admin-metric-trend positive">↗ 15.4% vs yesterday</span>
                </div>
                <div className="admin-metric-label">REVENUE (24HRS)</div>
                <div className="admin-metric-value">$142,890</div>
                <div className="admin-metric-subtitle">Subscriptions + events</div>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-header">
                  <div className="admin-metric-icon">👥</div>
                  <span className="admin-metric-trend negative">8 currently offline</span>
                </div>
                <div className="admin-metric-label">ADMINS ONLINE</div>
                <div className="admin-metric-value">42 / 50</div>
                <div className="admin-metric-subtitle">Across all departments</div>
              </div>

              <div className="admin-metric-card escalations">
                <div className="admin-metric-header">
                  <div className="admin-metric-icon">🛡️</div>
                  <span className="admin-metric-badge">3 since yesterday</span>
                </div>
                <div className="admin-metric-label">ACTIVE ESCALATIONS</div>
                <div className="admin-metric-value">18</div>
                <div className="admin-metric-subtitle">Require SU intervention</div>
              </div>
            </div>

            <div className="dashboard-middle">
              <div className="chart-section">
                <div className="section-header">
                  <div>
                    <h3>Platform Engagement</h3>
                    <p>Daily growth and match frequency</p>
                  </div>
                </div>
                <div className="chart-container-large">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="quick-actions">
                <div className="section-header">
                  <div>
                    <h3>Quick Actions</h3>
                    <p>Instant executive commands</p>
                  </div>
                </div>
                <div className="qa-grid">
                  {quickActions.map((action, idx) => (
                    <button key={idx} className="qa-btn" onClick={action.action}>
                      <span className="qa-icon">{action.icon}</span>
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
                            <div className="member-avatar" style={{ background: member.color }}>
                              {member.initials}
                            </div>
                            <span>{member.name}</span>
                          </div>
                        </td>
                        <td><span className="role-badge">{member.role}</span></td>
                        <td>
                          <span className={`status-badge ${member.status.toLowerCase()}`}>
                            <span className="status-dot"></span>
                            {member.status}
                          </span>
                        </td>
                        <td><span className="tasks-badge">{member.tasks}</span></td>
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
                      <div className="alert-bullet" style={{ background: alert.color }}></div>
                      <div className="alert-info">
                        <div className="alert-type">{alert.type}</div>
                        <div className="alert-target">{alert.target}</div>
                      </div>
                      <div className="alert-time">{alert.time}</div>
                    </div>
                  ))}
                </div>
                <button className="view-all-alerts">View All Activity Log</button>
              </div>
            </div>

            <div className="modules-section">
              <h3 className="modules-title">Administrative Modules</h3>
              <div className="modules-grid">
                {modules.map((mod) => (
                  <div 
                    className={`module-card ${mod.label === "Admin Management" || mod.label === "Analytics Engine" ? "clickable" : ""}`} 
                    key={mod.label}
                    onClick={() => {
                      if (mod.label === "Admin Management") navigate("/adminManagement");
                      if (mod.label === "Analytics Engine") navigate("/analytics");
                    }}
                    style={{ cursor: mod.label === "Admin Management" || mod.label === "Analytics Engine" ? "pointer" : "default" }}
                  >
                    <div className="module-icon" style={{ background: mod.bg }}>
                      {mod.icon}
                    </div>
                    <span className="module-label">{mod.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <footer className="admin-footer">
              <span>© 2024 AdminCore Webframe System</span>
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
            <img src="/butterfly-logo.png" alt="Butterfly" className="mod-logo-img" />
            <span className="mod-logo-text">Butterfly</span>
          </div>
        </div>

        <div className="mod-sidebar-section">
          <div className="mod-sidebar-label">CORE OPERATIONS</div>
          <nav className="mod-sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`mod-nav-item ${activeNav === item.label ? "active" : ""}`}
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
            <svg className="mod-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Search users, reports, or logs..." />
          </div>
          <div className="mod-header-actions">
            <button className="mod-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="#6B7280" strokeWidth="2" />
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
                className={`mod-metric-card ${metric.label === "Flagged Accounts" ? "clickable" : ""}`}
                onClick={() => metric.label === "Flagged Accounts" && navigate("/flaggedAccount")}
                style={{ cursor: metric.label === "Flagged Accounts" ? "pointer" : "default" }}
              >
                <div className="mod-metric-header">
                  <div className="mod-metric-icon-wrapper">
                    {metric.icon}
                  </div>
                  {metric.trend && (
                    <span className={`mod-metric-trend ${metric.trendUp ? "positive" : "negative"}`}>
                      {metric.trend}
                    </span>
                  )}
                </div>
                <div className="mod-metric-content">
                  <div className="mod-metric-label">{metric.label}</div>
                  <div className="mod-metric-value">{metric.value}</div>
                  {metric.subtitle && <div className="mod-metric-subtitle">{metric.subtitle}</div>}
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
                      <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
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
                      {log.subtext && <span className="mod-log-subtext">{log.subtext}</span>}
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
                  <span className="mod-this-month">This month, all streams</span>
                </div>
                <div className="mod-revenue-list">
                  {revenueBreakdown.map((item, idx) => (
                    <div key={idx} className="mod-revenue-item">
                      <span className="mod-revenue-title">{item.title}</span>
                      <div className="mod-revenue-values">
                        <span className="mod-revenue-amount">{item.amount}</span>
                        <span className="mod-revenue-percent">{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Live Concierge, Live Activity, Security Alerts */}
          <div className="mod-bottom-row">
            {/* Live Concierge */}
            <div className="mod-concierge-card">
              <div className="mod-card-header">
                <div className="mod-concierge-title">
                  <span className="mod-live-icon">🔵</span>
                  <h3>Live Concierge</h3>
                </div>
                <span className="mod-live-badge">Live</span>
              </div>
              <div className="mod-concierge-list">
                {liveConcierge.map((item) => (
                  <div key={item.id} className="mod-concierge-item">
                    <div className="mod-concierge-avatar">{item.avatar}</div>
                    <div className="mod-concierge-info">
                      <div className="mod-concierge-name">{item.name}</div>
                      <div className="mod-concierge-message">{item.message}</div>
                    </div>
                    <div className="mod-concierge-time">{item.time}</div>
                  </div>
                ))}
              </div>
              <button className="mod-support-btn">Open Support Dashboard ↗</button>
            </div>

            {/* Live Activity */}
            <div className="mod-activity-card">
              <div className="mod-card-header">
                <h3>Live Activity</h3>
                <a href="#" className="mod-view-log-link">View Log →</a>
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
                      {alert.type === "critical" ? "🚨" : "⚠️"}
                    </div>
                    <div className="mod-alert-content">
                      <div className="mod-alert-title">{alert.title}</div>
                      <div className="mod-alert-desc">{alert.desc}</div>
                      {alert.action && (
                        <button className="mod-alert-action-btn">{alert.action}</button>
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
            <span>© 2023 HouseSquad Systems. All Rights Reserved. Authorized personnel only.</span>
            <div className="mod-footer-links">
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

export default Dashboard;
