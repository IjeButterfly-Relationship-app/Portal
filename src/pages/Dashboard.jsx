import React, { useState } from "react";
import {
  ChevronRight,
  Bell,
  Settings,
  MoreVertical,
  Eye,
  EyeOff,
  AlertCircle,
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
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Daily");

  const analyticsData = [
    { name: "Mon", purple: 2400, cyan: 300 },
    { name: "Tue", purple: 1398, cyan: 221 },
    { name: "Wed", purple: 9800, cyan: 229 },
    { name: "Thu", purple: 3908, cyan: 200 },
    { name: "Fri", purple: 4800, cyan: 218 },
    { name: "Sat", purple: 3800, cyan: 250 },
    { name: "Sun", purple: 4300, cyan: 210 },
  ];

  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 5500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 6500 },
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
      reporter: "James L.",
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
    <div className="dashboard-wrapper">
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* HEADER */}
        <div className="header">
          <input
            type="text"
            placeholder="Search users, coaches, or logs..."
            className="header-search"
          />

          <div className="header-right">
            <div className="header-system-status">
              <div className="header-system-status-title">System Online</div>
              <div className="header-system-status-time">
                Oct 24, 2023 • 10:42 AM
              </div>
            </div>
            <Bell size={20} className="header-bell-icon" />
            <div className="header-filter-btn">Filter Period</div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="content-area">
          {/* Stats Cards */}
          <div className="stats-grid">
            {[
              {
                icon: "👥",
                label: "Total Active Users",
                value: "1,284,592",
                change: "+12.5%",
                color: "#7F55E0",
              },
              {
                icon: "📊",
                label: "Daily Active Sessions",
                value: "42,890",
                change: "+5.2%",
                color: "#06B6D4",
              },
              {
                icon: "⏳",
                label: "Pending Verifications",
                value: "154",
                change: null,
                color: "#FF9500",
              },
              {
                icon: "💰",
                label: "Weekly Revenue",
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
                    {stat.icon}
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

          {/* Charts Row */}
          <div className="charts-row">
            {/* Growth Analytics */}
            <div className="panel">
              <div style={{ marginBottom: "20px" }}>
                <h3 className="panel-title">Growth Analytics</h3>
                <p className="panel-subtitle">
                  User retention and acquisition trends
                </p>
              </div>

              <div className="analytics-tabs">
                {["Daily", "Weekly", "Monthly"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`analytics-tab${activeTab === tab ? " active" : ""}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analyticsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="purple"
                    stroke="#7F55E0"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="cyan"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="analytics-metrics">
                <div className="analytics-metric">
                  <div
                    className="analytics-metric-value"
                    style={{ color: "#7F55E0" }}
                  >
                    64.2%
                  </div>
                  <div className="analytics-metric-label">USER CONVERSION</div>
                </div>
                <div className="analytics-metric">
                  <div
                    className="analytics-metric-value"
                    style={{ color: "#EF4444" }}
                  >
                    1.4%
                  </div>
                  <div className="analytics-metric-label">CHURN RATE</div>
                </div>
                <div className="analytics-metric">
                  <div
                    className="analytics-metric-value"
                    style={{ color: "#06B6D4" }}
                  >
                    18m 42s
                  </div>
                  <div className="analytics-metric-label">AVG. SESSION</div>
                </div>
              </div>
            </div>

            {/* Moderation Hub */}
            <div className="panel">
              <div className="moderation-header">
                <h3 className="panel-title">Moderation Hub</h3>
                <span className="moderation-badge">3 Live Requests</span>
              </div>

              <div className="moderation-list">
                {moderationItems.map((item) => (
                  <div key={item.id} className="moderation-item">
                    <div className="moderation-item-header">
                      <span className="moderation-item-type">{item.type}</span>
                      <span className="moderation-item-time">{item.time}</span>
                    </div>
                    <div className="moderation-item-target">
                      Target: {item.target}
                    </div>
                    <div className="moderation-item-reporter">
                      Reported by {item.reporter}
                    </div>
                    <div className="moderation-item-actions">
                      <button className="moderation-item-btn">Approve</button>
                      <button className="moderation-item-btn">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="moderation-view-all">
                Open Full Moderation Suite{" "}
                <ChevronRight
                  size={14}
                  style={{ display: "inline", marginLeft: "4px" }}
                />
              </button>
            </div>
          </div>

          {/* Coach Verification & System Pulse */}
          <div className="coach-system-row">
            {/* Coach Verification Queue */}
            <div className="panel">
              <div className="coach-header">
                <div>
                  <h3 className="panel-title">Coach Verification Queue</h3>
                  <p className="panel-subtitle">
                    Manual review required for professional credentials
                  </p>
                </div>
                <button className="coach-view-all">
                  View All{" "}
                  <ChevronRight size={14} style={{ display: "inline" }} />
                </button>
              </div>

              <div className="coach-table-wrapper">
                <table className="coach-table">
                  <thead>
                    <tr>
                      <th>COACH PROFILE</th>
                      <th>SPECIALIZATION</th>
                      <th>SUBMITTED</th>
                      <th>STATUS</th>
                      <th style={{ textAlign: "center" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coachData.map((coach) => (
                      <tr key={coach.id}>
                        <td className="td-name">{coach.name}</td>
                        <td className="td-muted">{coach.role}</td>
                        <td className="td-muted">{coach.date}</td>
                        <td>
                          <span className="coach-status-badge">
                            {coach.status}
                          </span>
                        </td>
                        <td className="td-center">
                          <MoreVertical size={14} className="coach-more-icon" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Pulse */}
            <div className="panel">
              <h3 className="system-pulse-title">System Pulse</h3>
              <p className="system-pulse-subtitle">
                Recent administrative actions
              </p>

              <div className="system-pulse-list">
                {systemPulse.map((item) => (
                  <div key={item.id} className="system-pulse-item">
                    <div className="system-pulse-item-header">
                      <div className="system-pulse-item-user">{item.user}</div>
                      <span className="system-pulse-item-time">
                        {item.time}
                      </span>
                    </div>
                    <div className="system-pulse-item-action">
                      {item.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Charts Row */}
          <div className="bottom-row">
            {/* Revenue Flow */}
            <div className="panel">
              <h3 className="revenue-title">Revenue Flow</h3>
              <p className="revenue-subtitle">
                Subscription vs. One-time gifts
              </p>

              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="panel">
              <h3 className="quick-actions-title">Quick Actions</h3>
              <p className="quick-actions-subtitle">
                Admin operational shortcuts
              </p>

              <div className="quick-actions-list">
                <button className="quick-actions-btn">📤 Export Data</button>
                <button className="quick-actions-btn">✓ Bulk Verify</button>
                <button className="quick-actions-btn">🔍 Filter Logs</button>
                <button className="quick-actions-btn">📅 Schedule</button>
              </div>
            </div>

            {/* Security Alert */}
            <div className="security-alert">
              <div className="security-alert-header">
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <h3 className="security-alert-title">Security Alert</h3>
              </div>
              <p className="security-alert-action-label">
                Action Required Immediately
              </p>
              <p className="security-alert-body">
                Detected multiple failed login attempts from unusual IP
                addresses (192.168.0.2) targeting Admin Panel.
              </p>
              <button className="security-alert-btn">Enforce Lockdown</button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="footer-user">
            <div className="footer-avatar"></div>
            <div>
              <div className="footer-user-name">William Finn</div>
              <div className="footer-user-role">Super Admin</div>
            </div>
          </div>

          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              Compliance Hub
            </a>
            <a href="#" className="footer-link">
              Contact Support
            </a>
          </div>

          <div className="footer-copyright">
            Butterfly Crypto Admin Dashboard © 2023 • All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
