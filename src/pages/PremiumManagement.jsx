import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/PremiumManagement.css";
import {
  Bell,
  Settings,
  Menu,
  TrendingUp,
  TrendingDown,
  Check,
  X,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ButterflyAdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  const metrics = [
    {
      title: "Premium Subscribers",
      value: "1,228",
      trend: "+1.05%",
      icon: "👥",
      positive: true,
    },
    {
      title: "Premium Users",
      value: "8,612",
      trend: "-0.08%",
      icon: "⚙️",
      positive: false,
    },
    {
      title: "Monthly Revenue",
      value: "$15,720",
      trend: "+1.98%",
      icon: "💰",
      positive: true,
    },
    {
      title: "Conversion Rate",
      value: "14.2%",
      trend: "-3.8%",
      icon: "✨",
      positive: false,
    },
  ];

  const members = [
    {
      id: 1,
      name: "Lisa Wang",
      email: "lisa.w@company.com",
      status: "Active",
      email_verified: true,
      work: true,
      last_login: "15 Oct, 2021",
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma.wilson@company.io",
      status: "Cancelled",
      email_verified: true,
      work: true,
      last_login: "15 Oct, 2021",
    },
    {
      id: 3,
      name: "James Chen",
      email: "james@jettech.com",
      status: "Blocked",
      email_verified: true,
      work: false,
      last_login: "14 Oct, 2021",
    },
    {
      id: 4,
      name: "Robert Miller",
      email: "rmiller@studio.net",
      status: "Active",
      email_verified: true,
      work: true,
      last_login: "14 Oct, 2021",
    },
    {
      id: 5,
      name: "Sophia Grey",
      email: "sophia.g@agency.com",
      status: "Active",
      email_verified: false,
      work: true,
      last_login: "13 Oct, 2021",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Kara Matthews",
      action: "updated",
      detail: "to premium",
      time: "2 mins ago",
    },
    {
      id: 2,
      user: "Henry Stiff",
      action: "subscription",
      detail: "expires",
      time: "12 mins ago",
    },
    {
      id: 3,
      user: "Samuel Brooks",
      action: "payment",
      detail: "failed",
      time: "1 hour ago",
    },
    {
      id: 4,
      user: "Grace Tagg",
      action: "renewed",
      detail: "Premium",
      time: "9 hours ago",
    },
  ];

  const billingAlerts = [
    { id: 1, title: "12", label: "Failed Renewals", color: "alert" },
    { id: 2, title: "$5", label: "Pending Refunds", color: "warning" },
    { id: 3, title: "8", label: "Expired Subscriptions", color: "error" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">◆</div>
            <span>Butterfly Admin</span>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search admins, addons, or ranks..."
            />
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn">
            <Bell size={20} />
          </button>
          <button className="icon-btn">
            <Settings size={20} />
          </button>
          <div className="user-profile">
            <div className="avatar">A</div>
            <div>
              <p className="user-name">Admin User</p>
              <p className="user-role">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        <Sidebar activeItem="billing" />

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Breadcrumb and Header */}
          <div className="content-header">
            <div>
              <p className="breadcrumb">Billing › Premium Membership</p>
              <h1>Management</h1>
            </div>
            <div className="header-actions">
              <button className="btn-secondary">
                <Download size={16} />
                Export CSV
              </button>
              <button className="btn-primary">
                <TrendingUp size={16} />
                Upgrade Campaign
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-header">
                  <span className="metric-icon">{metric.icon}</span>
                  <span
                    className={`metric-trend ${metric.positive ? "positive" : "negative"}`}
                  >
                    {metric.trend}
                  </span>
                </div>
                <h3 className="metric-title">{metric.title}</h3>
                <p className="metric-value">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="chart-section">
            <div className="chart-container">
              <div className="chart-header">
                <div>
                  <h2>Membership Growth & Revenue</h2>
                  <p>Track subscription trends over the last 6 months</p>
                </div>
                <div className="chart-date">📅 Monthly Revenue 28.2021</div>
              </div>
              <svg className="chart-svg" viewBox="0 0 700 300">
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#7c3aed", stopOpacity: 0.4 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#7c3aed", stopOpacity: 0.02 }}
                    />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line
                  x1="60"
                  y1="250"
                  x2="680"
                  y2="250"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <line
                  x1="60"
                  y1="190"
                  x2="680"
                  y2="190"
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
                <line
                  x1="60"
                  y1="130"
                  x2="680"
                  y2="130"
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
                <line
                  x1="60"
                  y1="70"
                  x2="680"
                  y2="70"
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />

                {/* Chart path with gradient fill */}
                <path
                  d="M 60 220 Q 150 200 240 190 T 420 140 T 600 60"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="3"
                />
                <path
                  d="M 60 220 Q 150 200 240 190 T 420 140 T 600 60 L 600 270 L 60 270 Z"
                  fill="url(#chartGradient)"
                />

                {/* Y-axis labels */}
                <text
                  x="40"
                  y="255"
                  fontSize="12"
                  textAnchor="end"
                  fill="#6b7280"
                >
                  $0
                </text>
                <text
                  x="40"
                  y="135"
                  fontSize="12"
                  textAnchor="end"
                  fill="#6b7280"
                >
                  $4000
                </text>
                <text
                  x="40"
                  y="75"
                  fontSize="12"
                  textAnchor="end"
                  fill="#6b7280"
                >
                  $8000
                </text>

                {/* X-axis labels */}
                <text
                  x="60"
                  y="280"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  Jan
                </text>
                <text
                  x="150"
                  y="280"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  Feb
                </text>
                <text
                  x="240"
                  y="280"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  Mar
                </text>
                <text
                  x="330"
                  y="280"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  Apr
                </text>
                <text
                  x="420"
                  y="280"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  May
                </text>
                <text
                  x="510"
                  y="280"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  Jun
                </text>
              </svg>
            </div>

            {/* Plans Comparison */}
            <div className="plans-comparison">
              <div className="plan-card freemium">
                <h3>Freemium</h3>
                <p className="plan-info">0/subscription</p>
                <ul className="features-list">
                  <li className="feature-yes">
                    <Check size={16} /> Limited chat access
                  </li>
                  <li className="feature-yes">
                    <Check size={16} /> Basic community tools
                  </li>
                  <li className="feature-no">
                    <X size={16} /> No voice & video calls
                  </li>
                  <li className="feature-no">
                    <X size={16} /> Priority coaching requests
                  </li>
                </ul>
              </div>

              <div className="plan-card premium">
                <h3>Premium</h3>
                <p className="plan-info">1/subscription</p>
                <ul className="features-list">
                  <li className="feature-yes">
                    <Check size={16} /> Unlimited chat & voice
                  </li>
                  <li className="feature-yes">
                    <Check size={16} /> High-def video calls
                  </li>
                  <li className="feature-yes">
                    <Check size={16} /> Browse & request for coaches
                  </li>
                  <li className="feature-yes">
                    <Check size={16} /> Dedicated account manager
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Access Status Table */}
          <div className="table-section">
            <div className="table-header">
              <div>
                <h2>Premium Access Status</h2>
                <p>Manage individual user permissions and verification</p>
              </div>
              <div className="table-controls">
                <button className="filter-btn">🔽 Filter status...</button>
                <button className="icon-btn">
                  <Download size={18} />
                </button>
                <button className="icon-btn">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <table className="members-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>STATUS</th>
                  <th>EMAIL</th>
                  <th>WORK</th>
                  <th>LAST LOGIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="member-info">
                        <div className="member-avatar">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="member-name">{member.name}</p>
                          <p className="member-email">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge status-${member.status.toLowerCase()}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td>
                      <span className="check-icon">
                        {member.email_verified ? (
                          <Check size={16} />
                        ) : (
                          <X size={16} />
                        )}
                      </span>
                    </td>
                    <td>
                      <span className="check-icon">
                        {member.work ? <Check size={16} /> : <X size={16} />}
                      </span>
                    </td>
                    <td>{member.last_login}</td>
                    <td>
                      <button className="action-btn">⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <p className="pagination-info">Showing 1-5 of 1,228 members</p>
              <div className="pagination-controls">
                <span>Rows per page: 10</span>
                <button className="pag-btn">Previous</button>
                <button className="pag-btn active">1</button>
                <button className="pag-btn">2</button>
                <button className="pag-btn">3</button>
                <button className="pag-btn">Next</button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="dashboard-sidebar-right">
          {/* Recent Activity */}
          <div className="sidebar-section">
            <h3>Recent Membership Activity</h3>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-avatar">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{activity.user}</strong>
                      {activity.action}
                    </p>
                    <p className="activity-detail">{activity.detail}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Alerts */}
          <div className="sidebar-section">
            <div className="alerts-header">
              <h3>Billing Alerts</h3>
              <a href="#" className="view-all">
                View All
              </a>
            </div>
            <div className="alerts-list">
              {billingAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`alert-item alert-${alert.color}`}
                >
                  <div className="alert-number">{alert.title}</div>
                  <div className="alert-label">{alert.label}</div>
                  <a href="#" className="alert-view">
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2024 Butterfly Admin. All rights reserved.</p>
        <p>
          Last updated: 4/17/2026, 12:55:00 PM • Data source: Stripe & Internal
          DB
        </p>
      </footer>
    </div>
  );
}
