import React, { useState } from "react";
import "../styles/ModeratorDashboard.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  dashboard: (
    <svg viewBox="0 0 20 20" fill="none">
      <rect
        x="2"
        y="2"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="11"
        y="2"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="2"
        y="11"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="11"
        y="11"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  flags: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M4 3v14M4 3h9l-2 4 2 4H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  members: (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2 17c0-3.31 2.69-6 6-6s6 2.69 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 7a2 2 0 012 2M16 13h2m-1-1v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5l-3 3V5a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  appeals: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L3 7v11h5v-5h4v5h5V7L10 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M3 10h3l2-6 4 12 2-6h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M13 15l4-5-4-5M17 10H8M11 3H5a1 1 0 00-1 1v12a1 1 0 001 1h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2a6 6 0 00-6 6c0 3.5-2 5-2 5h16s-2-1.5-2-5a6 6 0 00-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M11.73 17a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 20 20" fill="none">
      <circle
        cx="8.5"
        cy="8.5"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 13l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  trending: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M2 14l5-5 4 4 7-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warn: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 3L2 17h16L10 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 9v4M10 14.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  ban: (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.05 5.05l9.9 9.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  approve: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10l4 4 8-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" fill="currentColor" />
      <circle
        cx="10"
        cy="10"
        r="6"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 3v10M6 9l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 16h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10a6 6 0 106-6H7M7 4L4 7l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const flaggedItems = [
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
  {
    id: 4,
    user: "Grace M.",
    type: "Harassment Report",
    severity: "high",
    time: "31m ago",
    status: "pending",
    avatar: "GM",
  },
  {
    id: 5,
    user: "Dev P.",
    type: "Suspicious Activity",
    severity: "medium",
    time: "45m ago",
    status: "reviewing",
    avatar: "DP",
  },
];

const recentActions = [
  {
    user: "Flora A.",
    action: "issued a verbal warning",
    target: "Brian_002",
    time: "3m ago",
    type: "warn",
  },
  {
    user: "Tendo K.",
    action: "deployed algorithm update",
    target: "v7.4.1",
    time: "11m ago",
    type: "approve",
  },
  {
    user: "Catherine M.",
    action: "resolved engagement dispute",
    target: "user_891",
    time: "22m ago",
    type: "approve",
  },
  {
    user: "Sarah N.",
    action: "completed compliance audit",
    target: "user_premium_39",
    time: "38m ago",
    type: "approve",
  },
  {
    user: "James L.",
    action: "banned repeat offender",
    target: "user_401",
    time: "1h ago",
    type: "ban",
  },
];

const appealItems = [
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
  {
    id: "APL-235",
    user: "Owen B.",
    reason: "Account restriction review",
    days: 5,
    priority: "low",
  },
];

const navItems = [
  { label: "Dashboard", icon: Icon.dashboard, active: true },
  { label: "Flagged Content", icon: Icon.flags, badge: 14 },
  { label: "User Reports", icon: Icon.reports, badge: 7 },
  { label: "Member Review", icon: Icon.members },
  { label: "Message Queue", icon: Icon.messages, badge: 3 },
  { label: "Appeals", icon: Icon.appeals, badge: 3 },
  { label: "Activity Log", icon: Icon.activity },
];

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, trend, trendDir, color, icon }) => (
  <div className={`stat-card stat-card--${color}`}>
    <div className="stat-card__top">
      <div className="stat-card__icon">{icon}</div>
      {trend && (
        <span className={`stat-card__trend stat-card__trend--${trendDir}`}>
          {trendDir === "up" ? "↑" : "↓"} {trend}
        </span>
      )}
    </div>
    <div className="stat-card__value">{value}</div>
    <div className="stat-card__label">{label}</div>
    {sub && <div className="stat-card__sub">{sub}</div>}
  </div>
);

// ── Mini Sparkline (pure CSS/SVG) ─────────────────────────────────────────────
const Sparkline = ({ data, color = "#9333ea" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120;
  const h = 36;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="sparkline">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ── Bar Chart (inline SVG) ────────────────────────────────────────────────────
const BarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  const w = 340;
  const h = 120;
  const barW = 28;
  const gap = (w - barW * data.length) / (data.length + 1);
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 20}`} className="bar-chart">
      {data.map((d, i) => {
        const barH = (d.value / max) * h;
        const x = gap + i * (barW + gap);
        const y = h - barH;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="4"
              fill={d.highlight ? "#9333ea" : "#ede9fb"}
            />
            <text
              x={x + barW / 2}
              y={h + 14}
              textAnchor="middle"
              fontSize="9"
              fill="#9ca3af"
              fontFamily="DM Sans, sans-serif"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ModeratorDashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [actions, setActions] = useState(
    flaggedItems.reduce((acc, f) => ({ ...acc, [f.id]: null }), {}),
  );

  const handleAction = (id, action) =>
    setActions((prev) => ({ ...prev, [id]: action }));

  const weeklyFlags = [
    { label: "Mon", value: 18, highlight: false },
    { label: "Tue", value: 31, highlight: false },
    { label: "Wed", value: 24, highlight: false },
    { label: "Thu", value: 42, highlight: true },
    { label: "Fri", value: 38, highlight: false },
    { label: "Sat", value: 15, highlight: false },
    { label: "Sun", value: 22, highlight: false },
  ];

  return (
    <div className="mod-app">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__logo" aria-hidden="true" />
          <span className="sidebar__brand-name">Butterfly Admin</span>
        </div>

        <nav className="sidebar__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "nav-item--active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="nav-item__icon">{item.icon}</span>
              <span className="nav-item__label">{item.label}</span>
              {item.badge && (
                <span className="nav-item__badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__mod-info">
            <div className="sidebar__avatar">MO</div>
            <div>
              <p className="sidebar__mod-name">Moderator</p>
              <p className="sidebar__mod-role">Content Review</p>
            </div>
          </div>
          <button className="sidebar__logout">
            {Icon.logout}
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="mod-main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__search">
            <span className="topbar__search-icon">{Icon.search}</span>
            <input
              type="text"
              placeholder="Search dashboard…"
              className="topbar__input"
            />
          </div>
          <div className="topbar__right">
            <button className="icon-btn" aria-label="Notifications">
              {Icon.bell}
              <span className="icon-btn__dot" />
            </button>
            <button className="icon-btn" aria-label="Settings">
              {Icon.settings}
            </button>
            <div className="topbar__avatar-block">
              <div>
                <p className="topbar__name">Super Admin</p>
                <p className="topbar__email">admin@admincore.io</p>
              </div>
              <div className="topbar__avatar">SA</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mod-content">
          {/* Page title row */}
          <div className="page-header">
            <div>
              <div className="page-header__eyebrow">
                <span className="status-dot status-dot--live" />
                <span>Moderation Active</span>
              </div>
              <h1 className="page-header__title">
                <span className="page-header__icon">{Icon.activity}</span>
                Dashboard Overview
              </h1>
              <p className="page-header__sub">
                System health and high-level moderation metrics.
              </p>
            </div>
            <div className="page-header__actions">
              <button className="btn btn--outline">
                {Icon.download} Download Report
              </button>
              <button className="btn btn--primary">
                {Icon.refresh} Update Stats
              </button>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="stats-grid">
            <StatCard
              label="Flagged Accounts"
              value="142"
              sub="Pending moderator review"
              trend="8.3%"
              trendDir="up"
              color="red"
              icon={Icon.warn}
            />
            <StatCard
              label="Reports Today"
              value="38"
              sub="Avg. 5.4/hr resolution"
              trend="12.1%"
              trendDir="up"
              color="orange"
              icon={Icon.reports}
            />
            <StatCard
              label="Resolved Today"
              value="91"
              sub="84% resolution rate"
              trend="6.7%"
              trendDir="up"
              color="green"
              icon={Icon.approve}
            />
            <StatCard
              label="Active Appeals"
              value="3"
              sub="Avg. 3.2 days open"
              trend="2"
              trendDir="down"
              color="purple"
              icon={Icon.appeals}
            />
            <StatCard
              label="Fraud Alerts"
              value="12"
              sub="Critical security incidents"
              trend="4.6%"
              trendDir="up"
              color="red"
              icon={Icon.ban}
            />
            <StatCard
              label="Members Reviewed"
              value="2,109"
              sub="Ongoing real-time checks"
              trend="22.5%"
              trendDir="up"
              color="purple"
              icon={Icon.members}
            />
          </div>

          {/* ── Middle row ── */}
          <div className="mid-row">
            {/* Flagged Content Queue */}
            <section
              className="card card--wide"
              aria-labelledby="queue-heading"
            >
              <div className="card__header">
                <div>
                  <h2 className="card__title" id="queue-heading">
                    Flagged Content Queue
                  </h2>
                  <p className="card__sub">Pending review items</p>
                </div>
                <button className="link-btn">View all {Icon.chevron}</button>
              </div>

              <div className="queue-list">
                {flaggedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`queue-item ${actions[item.id] ? "queue-item--resolved" : ""}`}
                  >
                    <div className="queue-item__avatar">{item.avatar}</div>
                    <div className="queue-item__info">
                      <p className="queue-item__user">{item.user}</p>
                      <p className="queue-item__type">{item.type}</p>
                    </div>
                    <span className={`badge badge--${item.severity}`}>
                      {item.severity}
                    </span>
                    <span className="queue-item__time">{item.time}</span>
                    {actions[item.id] ? (
                      <span
                        className={`action-taken action-taken--${actions[item.id]}`}
                      >
                        {actions[item.id] === "warn"
                          ? "⚠ Warned"
                          : actions[item.id] === "ban"
                            ? "✗ Banned"
                            : "✓ Cleared"}
                      </span>
                    ) : (
                      <div className="queue-item__btns">
                        <button
                          className="action-btn action-btn--warn"
                          title="Warn"
                          onClick={() => handleAction(item.id, "warn")}
                        >
                          {Icon.warn}
                        </button>
                        <button
                          className="action-btn action-btn--ban"
                          title="Ban"
                          onClick={() => handleAction(item.id, "ban")}
                        >
                          {Icon.ban}
                        </button>
                        <button
                          className="action-btn action-btn--clear"
                          title="Clear"
                          onClick={() => handleAction(item.id, "clear")}
                        >
                          {Icon.approve}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Weekly flags chart */}
              <div className="chart-section">
                <p className="chart-section__label">Weekly Flag Volume</p>
                <BarChart data={weeklyFlags} />
              </div>
            </section>

            {/* Right column */}
            <div className="mid-right">
              {/* Quick Actions */}
              <section className="card" aria-labelledby="qa-heading">
                <div className="card__header">
                  <h2 className="card__title" id="qa-heading">
                    Quick Actions
                  </h2>
                  <p className="card__sub">Instant executive commands</p>
                </div>
                <div className="qa-grid">
                  {[
                    {
                      label: "Onboard New Admin",
                      icon: Icon.members,
                      color: "purple",
                    },
                    {
                      label: "Emergency Suspend",
                      icon: Icon.ban,
                      color: "red",
                    },
                    {
                      label: "Override Decision",
                      icon: Icon.warn,
                      color: "orange",
                    },
                    {
                      label: "System Config",
                      icon: Icon.settings,
                      color: "purple",
                    },
                    {
                      label: "Export Report",
                      icon: Icon.download,
                      color: "green",
                    },
                    { label: "Broadcast Alert", icon: Icon.bell, color: "red" },
                  ].map((qa) => (
                    <button
                      key={qa.label}
                      className={`qa-btn qa-btn--${qa.color}`}
                    >
                      <span className="qa-btn__icon">{qa.icon}</span>
                      <span className="qa-btn__label">{qa.label}</span>
                    </button>
                  ))}
                </div>
                <div className="danger-zone">
                  <span className="danger-zone__label">⚡ DANGER ZONE</span>
                  <button className="danger-btn">🔒 Emergency Lockdown</button>
                </div>
              </section>

              {/* Live Activity */}
              <section className="card" aria-labelledby="live-heading">
                <div className="card__header">
                  <h2 className="card__title" id="live-heading">
                    Live Activity
                  </h2>
                  <button className="link-btn">View Log {Icon.chevron}</button>
                </div>
                <div className="activity-feed">
                  {recentActions.map((a, i) => (
                    <div key={i} className="activity-item">
                      <span
                        className={`activity-dot activity-dot--${a.type}`}
                      />
                      <div className="activity-item__body">
                        <p className="activity-item__text">
                          <strong>{a.user}</strong> {a.action}{" "}
                          <span className="activity-item__target">
                            • {a.target}
                          </span>
                        </p>
                        <p className="activity-item__time">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* ── Bottom row ── */}
          <div className="bottom-row">
            {/* Appeals Panel */}
            <section className="card" aria-labelledby="appeals-heading">
              <div className="card__header">
                <div>
                  <h2 className="card__title" id="appeals-heading">
                    Open Appeals
                  </h2>
                  <p className="card__sub">Awaiting moderator review</p>
                </div>
                <button className="link-btn">Manage {Icon.chevron}</button>
              </div>
              <div className="appeals-list">
                {appealItems.map((a) => (
                  <div key={a.id} className="appeal-row">
                    <span className="appeal-row__id">{a.id}</span>
                    <div className="appeal-row__info">
                      <p className="appeal-row__user">{a.user}</p>
                      <p className="appeal-row__reason">{a.reason}</p>
                    </div>
                    <span className={`badge badge--${a.priority}`}>
                      {a.priority}
                    </span>
                    <span className="appeal-row__days">{a.days}d open</span>
                    <button
                      className="icon-btn icon-btn--sm"
                      aria-label="Review appeal"
                    >
                      {Icon.eye}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Resolution Stats */}
            <section className="card" aria-labelledby="stats-heading">
              <div className="card__header">
                <h2 className="card__title" id="stats-heading">
                  Resolution Stats
                </h2>
                <p className="card__sub">Last 10 days</p>
              </div>
              <div className="resolution-metrics">
                {[
                  {
                    label: "Warnings Issued",
                    val: 47,
                    spark: [8, 12, 9, 14, 11, 15, 13, 18, 16, 12],
                    color: "#f59e0b",
                  },
                  {
                    label: "Bans Executed",
                    val: 18,
                    spark: [3, 5, 4, 7, 6, 4, 8, 5, 9, 7],
                    color: "#ef4444",
                  },
                  {
                    label: "Cases Cleared",
                    val: 91,
                    spark: [14, 18, 22, 19, 27, 24, 31, 28, 35, 30],
                    color: "#22c55e",
                  },
                ].map((m) => (
                  <div key={m.label} className="res-metric">
                    <div className="res-metric__left">
                      <p className="res-metric__val">{m.val}</p>
                      <p className="res-metric__label">{m.label}</p>
                    </div>
                    <Sparkline data={m.spark} color={m.color} />
                  </div>
                ))}
              </div>
            </section>

            {/* Revenue Breakdown replaced with Content Breakdown */}
            <section className="card" aria-labelledby="content-heading">
              <div className="card__header">
                <h2 className="card__title" id="content-heading">
                  Content Breakdown
                </h2>
                <button className="link-btn">Full {Icon.chevron}</button>
              </div>
              <div className="content-breakdown">
                {[
                  {
                    label: "Harassment Reports",
                    count: "£281",
                    pct: 38,
                    color: "#ef4444",
                  },
                  {
                    label: "Fake Profiles",
                    count: "£18,200",
                    pct: 24,
                    color: "#9333ea",
                  },
                  {
                    label: "Spam / Ads",
                    count: "£29,410",
                    pct: 20,
                    color: "#3b82f6",
                  },
                  {
                    label: "Matching Disputes",
                    count: "£84,750",
                    pct: 18,
                    color: "#6b7280",
                  },
                ].map((c) => (
                  <div key={c.label} className="cb-row">
                    <span
                      className="cb-row__dot"
                      style={{ background: c.color }}
                    />
                    <span className="cb-row__label">{c.label}</span>
                    <div className="cb-bar-wrap">
                      <div
                        className="cb-bar"
                        style={{ width: `${c.pct}%`, background: c.color }}
                      />
                    </div>
                    <span className="cb-row__pct">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Footer nav ── */}
          <div className="footer-nav">
            {["Go to User Management", "Security Settings", "System Logs"].map(
              (l) => (
                <button key={l} className="footer-nav__btn">
                  {l}
                </button>
              ),
            )}
          </div>
        </main>

        <footer className="mod-footer">
          <p>© 2026 Admin Dashboard. Secure Internal Access Only.</p>
        </footer>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
