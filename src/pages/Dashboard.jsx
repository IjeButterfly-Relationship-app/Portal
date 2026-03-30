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
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("admin_role") || "Moderator";
    const email = localStorage.getItem("admin_email") || "admin@admincore.io";
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const isSuperAdmin = userRole === "Super Admin";

  const trafficData = [
    { month: "Jan", users: 4500 },
    { month: "Feb", users: 5200 },
    { month: "Mar", users: 4800 },
    { month: "Apr", users: 6100 },
    { month: "May", users: 5800 },
    { month: "Jun", users: 7200 },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "admins", label: "Admins", icon: "👥" },
    { id: "onboard", label: "Onboard", icon: "➕" },
    { id: "activity", label: "Activity Log", icon: "📝" },
  ];

  const handleNavClick = (item) => {
    if (item.id === "onboard") {
      navigate("/onboard");
    } else if (item.id === "admins") {
      setActiveNav(item.label);
    } else {
      setActiveNav(item.label);
    }
  };

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

  const modules = [
    { icon: "💳", label: "Billing & Revenue", bg: "#FEF3C7" },
    { icon: "🔒", label: "Security & APIs", bg: "#EDE9FE" },
    { icon: "📄", label: "Policies & Terms", bg: "#DBEAFE" },
    { icon: "📊", label: "Analytics Engine", bg: "#D1FAE5" },
    { icon: "👤", label: "Admin Management", bg: "#FCE7F3" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="brand-name">AdminCore</span>
        </div>

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

        <div className="sidebar-footer">
          <div className="system-health">
            <div className="health-indicator">
              <span className="health-dot"></span>
              <span>System Health</span>
            </div>
            <div className="health-bars">
              {[1, 1, 1, 1, 0, 1, 1, 0, 1, 1].map((active, i) => (
                <div key={i} className={`health-bar ${active ? "active" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
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

        {/* Content */}
        <div className="admin-content">
          {/* Page Header */}
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

          {/* Metrics Row */}
          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon-wrapper purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span className="metric-trend positive">+ 8.2% this month</span>
              </div>
              <div className="metric-value">1,284,502</div>
              <div className="metric-label">TOTAL MEMBERS</div>
              <div className="metric-sub">Free + Premium globally</div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon-wrapper amber">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span className="metric-trend positive">+ 13.4% this month</span>
              </div>
              <div className="metric-value">87,430</div>
              <div className="metric-label">PREMIUM USERS</div>
              <div className="metric-sub">5.8% conversion rate</div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon-wrapper green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span className="metric-trend positive">+ 15.4% vs yesterday</span>
              </div>
              <div className="metric-value">$142,890</div>
              <div className="metric-label">REVENUE (24HRS)</div>
              <div className="metric-sub">Subscriptions + events</div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon-wrapper orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span className="metric-trend offline">8 currently offline</span>
              </div>
              <div className="metric-value">42 / 50</div>
              <div className="metric-label">ADMINS ONLINE</div>
              <div className="metric-sub">Across all departments</div>
            </div>

            <div className="metric-card alert-metric">
              <div className="metric-top">
                <div className="metric-icon-wrapper red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.29 3.86L1.82 18C1.64547 18.3024 1.55298 18.6453 1.552 18.9945C1.55102 19.3437 1.64158 19.6871 1.81442 19.9895C1.98727 20.2919 2.23664 20.5427 2.53849 20.7164C2.84033 20.8901 3.18357 20.9812 3.53 21H20.47C20.8164 20.9812 21.1597 20.8901 21.4615 20.7164C21.7634 20.5427 22.0127 20.2919 22.1856 19.9895C22.3584 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3545 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9823 3.15551C12.6839 2.98791 12.3483 2.90128 12.0075 2.90423C11.6667 2.90718 11.3326 2.99963 11.0368 3.17206C10.741 3.34448 10.4937 3.59139 10.32 3.888L10.29 3.86Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="metric-trend negative">3 active yesterday</span>
              </div>
              <div className="metric-value">18</div>
              <div className="metric-label">ACTIVE ESCALATIONS</div>
              <div className="metric-sub">Require SU intervention</div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="dashboard-middle">
            {/* Chart */}
            <div className="chart-section">
              <div className="section-header">
                <div>
                  <h3>Platform Engagement</h3>
                  <p>Daily growth and match frequency</p>
                </div>
                <div className="chart-legend">
                  <span className="legend-dot"></span>
                  <span>Container</span>
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
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} ticks={[2000, 4000, 6000, 8000]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="section-header">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Instant executive commands</p>
                </div>
              </div>
              <div className="qa-grid">
                <button className="qa-btn" onClick={() => navigate("/onboard")}>
                  <span className="qa-icon">+</span>
                  <span>Onboard New Admin</span>
                </button>
                <button className="qa-btn">
                  <span className="qa-icon">⚡</span>
                  <span>Emergency Suspend</span>
                </button>
                <button className="qa-btn">
                  <span className="qa-icon">↺</span>
                  <span>Override Decision</span>
                </button>
                <button className="qa-btn">
                  <span className="qa-icon">⚙️</span>
                  <span>System Config</span>
                </button>
                <button className="qa-btn">
                  <span className="qa-icon">📄</span>
                  <span>Export Report</span>
                </button>
                <button className="qa-btn">
                  <span className="qa-icon">📢</span>
                  <span>Broadcast Alert</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="dashboard-bottom">
            {/* Admin Team */}
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
                      <td>
                        <span className="role-badge">{member.role}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${member.status.toLowerCase()}`}>
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

            {/* Critical Alerts */}
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

          {/* Administrative Modules */}
          <div className="modules-section">
            <h3 className="modules-title">Administrative Modules</h3>
            <div className="modules-grid">
              {modules.map((mod) => (
                <div className="module-card" key={mod.label}>
                  <div className="module-icon" style={{ background: mod.bg }}>
                    {mod.icon}
                  </div>
                  <span className="module-label">{mod.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="admin-footer">
            <span>© 2024 AdminCore Webframe System</span>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
