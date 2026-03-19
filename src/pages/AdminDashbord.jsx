import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminCoreDashboard.css";
import "../styles/ModeratorDashboard.css";

const TEAM = [
  {
    name: "Sarah Nakato",
    role: "Geolingo",
    color: "#8B5CF6",
    initials: "SN",
    status: "Online",
    tasks: 54,
    last: "Active now",
  },
  {
    name: "Kwame Mensah",
    role: "Moderator",
    color: "#F59E0B",
    initials: "KM",
    status: "Online",
    tasks: 9,
    last: "Active now",
  },
  {
    name: "Tunde Adewunpo",
    role: "Tech",
    color: "#3B82F6",
    initials: "TA",
    status: "Busy",
    tasks: 7,
    last: "Active now",
  },
  {
    name: "Fatima Dasi",
    role: "Analytics",
    color: "#EC4899",
    initials: "FD",
    status: "Online",
    tasks: 5,
    last: "Active now",
  },
];

const ALERTS = [
  {
    type: "Fraud detected",
    target: "Target: user_682",
    time: "2m ago",
    color: "#EF4444",
  },
  {
    type: "Ban detected",
    target: "Target: bob_alpha",
    time: "6m ago",
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
    time: "2m ago",
    color: "#EF4444",
  },
  {
    type: "Verification detected",
    target: "Target: premium_link",
    time: "5h ago",
    color: "#F97316",
  },
];

const MODULES = [
  {
    icon: (
      <img
        src="/billing.jpeg"
        alt="Billing & Revenue"
        style={{ width: "24px", height: "24px", borderRadius: "4px" }}
      />
    ),
    label: "Billing & Revenue",
    bg: "#FEF3C7",
  },
  {
    icon: (
      <img
        src="/security.png"
        alt="Security & APIs"
        style={{ width: "24px", height: "24px", borderRadius: "4px" }}
      />
    ),
    label: "Security & APIs",
    bg: "#EDE9FE",
  },
  {
    icon: (
      <img
        src="/policies.png"
        alt="Policies & Terms"
        style={{ width: "24px", height: "24px", borderRadius: "4px" }}
      />
    ),
    label: "Policies & Terms",
    bg: "#DBEAFE",
  },
  {
    icon: (
      <img
        src="/analytics.jpeg"
        alt="Analytics Engine"
        style={{ width: "24px", height: "24px", borderRadius: "4px" }}
      />
    ),
    label: "Analytics Engine",
    bg: "#D1FAE5",
  },
  {
    icon: (
      <img
        src="/admin.jpeg"
        alt="Admin Management"
        style={{ width: "24px", height: "24px", borderRadius: "4px" }}
      />
    ),
    label: "Admin Management",
    bg: "#FCE7F3",
  },
];

const NAV_ITEMS = [
  { icon: "", label: "Dashboard" },
  { icon: "", label: "Admins" },
  { icon: "", label: "Onboard" },
  { icon: "", label: "Activity Log" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const CHART_DATA = [2600, 3800, 3200, 4800, 4200, 5600];

const ROLE_CLASS = {
  Geolingo: "role-geolingo",
  Moderator: "role-moderator",
  Tech: "role-tech",
  Analytics: "role-analytics",
};

// Moderator-specific data
const FLAGGED_ITEMS = [
  {
    id: 1,
    user: "Brian K.",
    type: "Inappropriate Message",
    severity: "high",
    time: "2m ago",
    status: "pending",
    avatar: "BK",
  },
  {
    id: 2,
    user: "Amara S.",
    type: "Fake Profile",
    severity: "critical",
    time: "8m ago",
    status: "pending",
    avatar: "AS",
  },
  {
    id: 3,
    user: "Tom O.",
    type: "Spam Content",
    severity: "medium",
    time: "14m ago",
    status: "reviewing",
    avatar: "TO",
  },
];

const APPEAL_ITEMS = [
  {
    id: "APL-241",
    user: "Marcus T.",
    reason: "Wrongful ban appeal",
    days: 2,
    priority: "high",
  },
  {
    id: "APL-238",
    user: "Keisha R.",
    reason: "Content removal dispute",
    days: 3,
    priority: "medium",
  },
];

function MiniChart() {
  const W = 560,
    H = 160;
  const pad = { t: 10, b: 30, l: 40, r: 10 };
  const minV = Math.min(...CHART_DATA) - 400;
  const maxV = Math.max(...CHART_DATA) + 200;

  const xs = CHART_DATA.map(
    (_, i) => pad.l + (i / (CHART_DATA.length - 1)) * (W - pad.l - pad.r),
  );
  const ys = CHART_DATA.map(
    (v) => pad.t + (1 - (v - minV) / (maxV - minV)) * (H - pad.t - pad.b),
  );

  const pathD = xs
    .map((x, i) => {
      if (i === 0) return `M ${x} ${ys[i]}`;
      const cpx = (xs[i - 1] + x) / 2;
      return `C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${x} ${ys[i]}`;
    })
    .join(" ");

  const areaD = `${pathD} L ${xs[xs.length - 1]} ${H - pad.b} L ${xs[0]} ${H - pad.b} Z`;

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {[2000, 4000, 6000].map((v) => {
        const y =
          pad.t + (1 - (v - minV) / (maxV - minV)) * (H - pad.t - pad.b);
        return (
          <g key={v}>
            <line
              x1={pad.l}
              y1={y}
              x2={W - pad.r}
              y2={y}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
            <text
              x={pad.l - 6}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#9CA3AF"
            >
              {(v / 1000).toFixed(0)}k
            </text>
          </g>
        );
      })}

      <path d={areaD} fill="url(#areaGrad)" />
      <path
        d={pathD}
        fill="none"
        stroke="#A855F7"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={ys[i]}
          r={i === CHART_DATA.length - 1 ? 5 : 0}
          fill="#A855F7"
        />
      ))}

      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={xs[i]}
          y={H - 8}
          textAnchor="middle"
          fontSize="10"
          fill="#9CA3AF"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}

export default function AdminCoreDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [userRole, setUserRole] = useState("admin"); // Can be "admin", "moderator", "tech", "analytics"
  const navigate = useNavigate();

  // Role-based navigation items
  const getNavItemsByRole = () => {
    const adminItems = NAV_ITEMS;
    const moderatorItems = [
      { icon: "", label: "Dashboard" },
      { icon: "", label: "Flagged Content", badge: "12" },
      { icon: "", label: "Reports" },
      { icon: "", label: "Appeals", badge: "3" },
      { icon: "", label: "User Reviews" },
      { icon: "", label: "Activity Log" },
    ];
    
    switch(userRole) {
      case "moderator":
        return moderatorItems;
      case "admin":
      default:
        return adminItems;
    }
  };

  return (
    <div className="app">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img
            src="/butterfly-logo.png"
            alt="Butterfly Logo"
            className="logo-icon"
          />
          AdminCore
        </div>

        <nav className="sidebar-nav">
          {getNavItemsByRole().map((item) => (
            <div
              key={item.label}
              className={`nav-item${activeNav === item.label ? " active" : ""}`}
              onClick={() => {
                if (item.label === "Admins") {
                  setUserRole("moderator");
                  setActiveNav("Dashboard");
                } else if (item.label === "Onboard") {
                  navigate("/onboard");
                } else {
                  setActiveNav(item.label);
                }
              }}
            >
              {item.label}
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="system-health">
            <span className="health-dot" />
            System Health
          </div>
          <div className="health-bars">
            {[1, 1, 1, 1, 0, 1, 1, 0, 1, 1].map((active, i) => (
              <div key={i} className={`health-bar${active ? " active" : ""}`} />
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-box">
            🔍
            <input placeholder="Search dashboard..." />
          </div>
          <div className="topbar-actions">
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className="role-selector"
              style={{ marginRight: "12px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white" }}
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="tech">Tech</option>
              <option value="analytics">Analytics</option>
            </select>
            <div className="icon-btn">
              🔔
              <div className="badge">3</div>
            </div>
            <div className="icon-btn">⚙️</div>
            <div className="user-chip">
              <div className="avatar">SA</div>
              <div className="user-info">
                <span className="user-name">Super Admin</span>
                <span className="user-role">admin@admincore.io</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <div className="page-title">System Overview</div>
              <div className="page-subtitle">
                Global controls &amp; real-time platform health
              </div>
            </div>
            <div className="online-badge">
              <div className="health-dot" />
              System Online — v2.4.1
            </div>
          </div>

          {/* Stats Row - Role Based */}
          <div className="stats-row">
            {userRole === "admin" ? (
              <>
                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/members.jpeg"
                      alt="Total Members"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Total Members</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Free + Premium globally</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/premium.png"
                      alt="Premium Users"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Premium Users</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">0% conversion rate</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/revenue.jpeg"
                      alt="Revenue (USD)"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Revenue (USD)</div>
                  <div className="stat-value">$0</div>
                  <div className="stat-sub">Subscriptions + events</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/adminonline.png"
                      alt="Admins Online"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Admins Online</div>
                  <div className="stat-value">0/0</div>
                  <div className="stat-sub">Across all departments</div>
                </div>

                <div className="stat-card alert-card">
                  <div className="stat-icon">
                    <img
                      src="/escalations.png"
                      alt="Active Escalations"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Active Escalations</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Require SU intervention</div>
                </div>
              </>
            ) : userRole === "moderator" ? (
              <>
                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/flaggedAccount.png"
                      alt="Flagged Accounts"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Flagged Accounts</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Pending moderator review</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/reports.png"
                      alt="Reports Today"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Reports Today</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Avg. 5.4/hr resolution</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/resolved.png"
                      alt="Resolved Today"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Resolved Today</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">84% resolution rate</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/appeals.png"
                      alt="Active Appeals"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Active Appeals</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Pending review</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/fraudalerts.png"
                      alt="Fraud Alerts"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Fraud Alerts</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Critical security incidents</div>
                </div>
              </>
            ) : (
              // Default/Other roles
              <>
                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/members.jpeg"
                      alt="Total Members"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Total Members</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Platform overview</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <img
                      src="/adminonline.png"
                      alt="Team Online"
                      style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="stat-label">Team Online</div>
                  <div className="stat-value">0</div>
                  <div className="stat-sub">Active team members</div>
                </div>
              </>
            )}
          </div>

          {/* Middle Row: Chart left, Quick Actions + Alerts stacked right */}
          <div className="middle-row">
            <div className="chart-card">
              <div className="card-title">Platform Engagement</div>
              <div className="card-subtitle">
                Daily growth and match frequency
              </div>
              <div className="chart-area">
                <MiniChart />
              </div>
            </div>

            <div className="middle-right-col">
              <div className="quick-actions-card">
                <div className="card-title">Quick Actions</div>
                <div className="card-subtitle">Instant executive commands</div>
                <div className="qa-grid">
                  <button
                    className="qa-btn primary"
                    onClick={() => navigate("/onboard")}
                  >
                    <span className="qa-icon"></span>Onboard New Admin
                  </button>
                  <button className="qa-btn danger">
                    <span className="qa-icon"></span>Emergency Suspend
                  </button>
                  <button className="qa-btn">
                    <span className="qa-icon"></span>Override Decision
                  </button>
                  <button className="qa-btn">
                    <span className="qa-icon"></span>System Config
                  </button>
                  <button className="qa-btn">
                    <span className="qa-icon"></span>Export Report
                  </button>
                  <button className="qa-btn">
                    <span className="qa-icon"></span>Broadcast Alert
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row Second Part: Team Overview and Critical Alerts side by side */}
          <div className="middle-row-second">
            <div className="team-card">
              <div className="card-header">
                <div>
                  <div className="card-title">Admin Team Overview</div>
                  <div className="card-subtitle">
                    Live status across all admin roles
                  </div>
                </div>
                <div className="manage-link">Manage Admins →</div>
              </div>

              <table className="team-table">
                <thead>
                  <tr>
                    <th>Admin</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Tasks</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {TEAM.map((member) => (
                    <tr key={member.name}>
                      <td>
                        <div className="member-cell">
                          <div
                            className="member-avatar"
                            style={{ background: member.color }}
                          >
                            {member.initials}
                          </div>
                          <div className="member-name">{member.name}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge role-${member.role.toLowerCase()}`}>
                          {member.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-dot dot-${member.status.toLowerCase()}`} />
                        {member.status}
                      </td>
                      <td>
                        <span className="tasks-badge">{member.tasks}</span>
                      </td>
                      <td className="last-active">{member.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="alerts-card">
              <div className="card-header">
                <div>
                  <div className="card-title">Critical Alerts</div>
                  <div className="card-subtitle">
                    Security and fraud notifications
                  </div>
                </div>
              </div>
              <div className="alert-list">
                {ALERTS.map((alert, i) => (
                  <div className="alert-item" key={i}>
                    <div
                      className="alert-bullet"
                      style={{ background: alert.color }}
                    />
                    <div className="alert-info">
                      <div className="alert-type">{alert.type}</div>
                      <div className="alert-target">{alert.target}</div>
                    </div>
                    <div className="alert-time">{alert.time}</div>
                  </div>
                ))}
              </div>
              <div className="view-log-link">View All Activity Log</div>
            </div>
          </div>

          
          {/* Role-based Content Sections */}
          {userRole === "moderator" && (
            <>
              {/* Flagged Content Queue */}
              <div className="middle-row">
                <div className="chart-card">
                  <div className="card-title">Flagged Content Queue</div>
                  <div className="card-subtitle">Pending review items</div>
                  <div className="flagged-list">
                    {FLAGGED_ITEMS.map((item) => (
                      <div key={item.id} className="flagged-item">
                        <div className="flagged-avatar">{item.avatar}</div>
                        <div className="flagged-info">
                          <div className="flagged-user">{item.user}</div>
                          <div className="flagged-type">{item.type}</div>
                        </div>
                        <div className="flagged-meta">
                          <span className={`severity-badge severity-${item.severity}`}>
                            {item.severity}
                          </span>
                          <span className="flagged-time">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="middle-right-col">
                  <div className="quick-actions-card">
                    <div className="card-title">Quick Actions</div>
                    <div className="card-subtitle">Moderator tools</div>
                    <div className="qa-grid">
                      <button className="qa-btn primary">Review All</button>
                      <button className="qa-btn danger">Emergency Block</button>
                      <button className="qa-btn">Bulk Resolve</button>
                      <button className="qa-btn">Export Report</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appeals Section */}
              <div className="middle-row-second">
                <div className="team-card">
                  <div className="card-header">
                    <div>
                      <div className="card-title">Active Appeals</div>
                      <div className="card-subtitle">
                        Pending appeal reviews
                      </div>
                    </div>
                    <div className="manage-link">View All →</div>
                  </div>
                  <div className="appeals-list">
                    {APPEAL_ITEMS.map((appeal) => (
                      <div key={appeal.id} className="appeal-item">
                        <div className="appeal-id">{appeal.id}</div>
                        <div className="appeal-info">
                          <div className="appeal-user">{appeal.user}</div>
                          <div className="appeal-reason">{appeal.reason}</div>
                        </div>
                        <div className="appeal-meta">
                          <span className={`priority-badge priority-${appeal.priority}`}>
                            {appeal.priority}
                          </span>
                          <span className="appeal-days">{appeal.days} days</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="alerts-card">
                  <div className="card-header">
                    <div>
                      <div className="card-title">Moderation Stats</div>
                      <div className="card-subtitle">
                        Today's performance
                      </div>
                    </div>
                  </div>
                  <div className="mod-stats">
                    <div className="mod-stat-item">
                      <div className="mod-stat-value">0</div>
                      <div className="mod-stat-label">Items Reviewed</div>
                    </div>
                    <div className="mod-stat-item">
                      <div className="mod-stat-value">0%</div>
                      <div className="mod-stat-label">Accuracy Rate</div>
                    </div>
                    <div className="mod-stat-item">
                      <div className="mod-stat-value">0min</div>
                      <div className="mod-stat-label">Avg Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Admin-only content */}
          {userRole === "admin" && (
            <div className="modules-row">
              <div className="card-title">Administrative Modules</div>
              <div className="modules-grid">
                {MODULES.map((mod) => (
                  <div className="module-item" key={mod.label}>
                    <div
                      className="module-icon-wrap"
                      style={{ background: mod.bg }}
                    >
                      {mod.icon}
                    </div>
                    <div className="module-label">{mod.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-content">
            <div className="footer-left">
              <p>
                © 2026 Butterfly™ — Trusted Connections. Real Relationships.
              </p>
            </div>
            <div className="footer-right">
              <p>
                System Version: v2.4.1 | Last Updated:{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
