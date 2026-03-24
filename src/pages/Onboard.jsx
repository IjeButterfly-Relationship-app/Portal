import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Onboard.css";
import "../styles/OnboardAdmin.css";
import "../styles/AdminCoreDashboard.css";

// ── Sub-components ────────────────────────────────────────────────────────────

const Toggle = ({ checked, onChange, id }) => (
  <label className="toggle" htmlFor={id}>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-checked={checked}
      role="switch"
    />
    <span className="toggle__track">
      <span className="toggle__thumb" />
    </span>
  </label>
);

const ModulePermission = ({
  icon,
  title,
  description,
  checked,
  onChange,
  id,
}) => (
  <div className="module-row">
    <div className="module-row__icon">{icon}</div>
    <div className="module-row__info">
      <p className="module-row__title">{title}</p>
      <p className="module-row__desc">{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} id={id} />
  </div>
);

// ── Icons (inline SVG) ────────────────────────────────────────────────────────

const icons = {
  concierge: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 13c0-2.21 1.79-4 4-4s4 1.79 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  profiles: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2"
        y="4"
        width="16"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8h4M12 11h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5l-3 3V5a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  coaching: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 16V9M8 16V5M12 16V8M16 16V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  moderation: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2L3 6v5c0 4 3.13 7.74 7 8.93C17 19.74 17 11 17 11V6L10 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3v14h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 14l3-4 3 2 4-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  billing: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2"
        y="5"
        width="16"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M2 9h16" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 13h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="5"
        y="9"
        width="10"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 9V7a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2"
        y="4"
        width="16"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2 7l8 5 8-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  twofa: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2L3 6v5c0 4 3.13 7.74 7 8.93C17 19.74 17 11 17 11V6L10 2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 10l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7l5 3-5 3V7z" fill="currentColor" />
    </svg>
  ),
};

// ── Main Component ────────────────────────────────────────────────────────────

const OnboardAdmin = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Onboard");

  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // ── Navigation Items ───────────────────────────────────────────────────────
  const NAV_ITEMS = [
    { icon: "", label: "Dashboard" },
    { icon: "", label: "Admins" },
    { icon: "", label: "Onboard" },
    { icon: "", label: "Activity Log" },
  ];

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const CHART_DATA = [2600, 3800, 3200, 4800, 4200, 5600];

  const ROLE_CLASS = {
    "Concierge Admin": "concierge",
    "Head Concierge": "concierge",
    "Super User": "superuser",
  };

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Uganda");

  // Role & Department
  const [adminRole, setAdminRole] = useState("Concierge Admin");
  const [jobTitle, setJobTitle] = useState("Head Concierge");
  const [reportingTo, setReportingTo] = useState("Super User (Alex Kirabo)");
  const [accessLevel, setAccessLevel] = useState("standard");

  // Account Security
  const [tempPassword, setTempPassword] = useState("············");
  const [confirmPassword, setConfirmPassword] = useState("············");

  // Module Permissions
  const [permissions, setPermissions] = useState({
    concierge: true,
    profiles: true,
    messages: true,
    coaching: true,
    moderation: false,
    analytics: true,
    billing: false,
    security: false,
  });

  // Welcome Email
  const [sendCredentials, setSendCredentials] = useState(true);
  const [require2fa, setRequire2fa] = useState(true);

  const togglePermission = (key) =>
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Admin account created successfully!");
  };

  const moduleList = [
    {
      key: "concierge",
      icon: icons.concierge,
      title: "Concierge Module",
      description: "Match curator, member management",
    },
    {
      key: "profiles",
      icon: icons.profiles,
      title: "View Member Profiles",
      description: "Read only access to all profiles",
    },
    {
      key: "messages",
      icon: icons.messages,
      title: "Send Messages",
      description: "Contact members directly",
    },
    {
      key: "coaching",
      icon: icons.coaching,
      title: "Manage Coaching",
      description: "Book and track sessions",
    },
    {
      key: "moderation",
      icon: icons.moderation,
      title: "Moderation Access",
      description: "View flagged accounts",
    },
    {
      key: "analytics",
      icon: icons.analytics,
      title: "Analytics Access",
      description: "View own performance data",
    },
    {
      key: "billing",
      icon: icons.billing,
      title: "Billing Access",
      description: "View subscription info",
    },
    {
      key: "security",
      icon: icons.security,
      title: "Security Access",
      description: "View security alerts",
    },
  ];

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
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`nav-item${activeNav === item.label ? " active" : ""}`}
              onClick={() => {
                if (item.label === "Admins") {
                  navigate("/moderatordashboard");
                } else if (item.label === "Onboard") {
                  navigate("/onboard");
                } else {
                  setActiveNav(item.label);
                }
              }}
            >
              {item.label}
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
      <main className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__left">
            <div className="breadcrumb">
              <span>Onboard</span>
            </div>
          </div>
          <div className="topbar__right">
            <div className="user-menu">
              <div className="user-avatar">
                <span>A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="page__content">
          <div className="page__header">
            <h1 className="page__title">Onboard New Admin</h1>
            <p className="page__subtitle">
              Create account, assign role and set granular permissions.
            </p>
          </div>
          <div className="page__actions">
            <button type="button" className="btn btn--ghost">
              Cancel
            </button>
            <button
              type="submit"
              form="onboard-form"
              className="btn btn--primary"
            >
              Create Admin Account
            </button>
          </div>

          {/* Left column */}
          <div className="layout__left">
            {/* Module Permissions */}
            <section className="card" aria-labelledby="permissions-heading">
              <div className="card__header">
                <h2 className="card__title" id="permissions-heading">
                  Module Permissions
                </h2>
                <span className="card__badge">CONTROL ACCESS</span>
              </div>
              <div className="module-list">
                {moduleList.map((m) => (
                  <ModulePermission
                    key={m.key}
                    id={`perm-${m.key}`}
                    icon={m.icon}
                    title={m.title}
                    description={m.description}
                    checked={permissions[m.key]}
                    onChange={() => togglePermission(m.key)}
                  />
                ))}
              </div>
            </section>

            {/* Send Welcome Email */}
            <section className="card" aria-labelledby="email-heading">
              <h2 className="card__title" id="email-heading">
                Send Welcome Email
              </h2>
              <div className="module-list">
                <div className="module-row">
                  <div className="module-row__icon">{icons.email}</div>
                  <div className="module-row__info">
                    <p className="module-row__title">Send login credentials</p>
                    <p className="module-row__desc">
                      Email temporary password to admin
                    </p>
                  </div>
                  <Toggle
                    checked={sendCredentials}
                    onChange={setSendCredentials}
                    id="toggle-credentials"
                  />
                </div>
              </div>
            </section>

            {/* Additional Admin Fields */}
            <section className="card" aria-labelledby="admin-fields-heading">
              <h2 className="card__title" id="admin-fields-heading">
                Admin Details
              </h2>
              <div className="form-grid form-grid--2">
                <div className="field field--full">
                  <label className="field__label" htmlFor="reportingTo">
                    Reporting To
                  </label>
                  <div className="field__select-wrap">
                    <select
                      id="reportingTo"
                      className="field__select"
                      value={reportingTo}
                      onChange={(e) => setReportingTo(e.target.value)}
                    >
                      <option>Super User (Alex Kirabo)</option>
                      <option>Super User (Janet Omondi)</option>
                      <option>Manager (David Ssali)</option>
                    </select>
                    <svg
                      className="field__select-arrow"
                      viewBox="0 0 12 8"
                      fill="none"
                    >
                      <path
                        d="M1 1l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="field field--full">
                  <label className="field__label">Access Level</label>
                  <div
                    className="radio-group"
                    role="radiogroup"
                    aria-label="Access Level"
                  >
                    <label
                      className={`radio-btn ${accessLevel === "standard" ? "radio-btn--active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="accessLevel"
                        value="standard"
                        checked={accessLevel === "standard"}
                        onChange={() => setAccessLevel("standard")}
                      />
                      <span className="radio-btn__circle" />
                      <span className="radio-btn__label">standard Access</span>
                    </label>
                    <label
                      className={`radio-btn ${accessLevel === "elevated" ? "radio-btn--active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="accessLevel"
                        value="elevated"
                        checked={accessLevel === "elevated"}
                        onChange={() => setAccessLevel("elevated")}
                      />
                      <span className="radio-btn__circle" />
                      <span className="radio-btn__label">elevated Access</span>
                    </label>
                    <label
                      className={`radio-btn ${accessLevel === "full" ? "radio-btn--active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="accessLevel"
                        value="full"
                        checked={accessLevel === "full"}
                        onChange={() => setAccessLevel("full")}
                      />
                      <span className="radio-btn__circle" />
                      <span className="radio-btn__label">full Access</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Account Security */}
            <section className="card" aria-labelledby="security-heading">
              <h2 className="card__title" id="security-heading">
                Account Security
              </h2>

              <div className="form-grid form-grid--2">
                <div className="field">
                  <label className="field__label" htmlFor="tempPassword">
                    Temporary Password
                  </label>
                  <input
                    id="tempPassword"
                    className="field__input"
                    type="password"
                    placeholder="············"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    className="field__input"
                    type="password"
                    placeholder="············"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="info-box">
                <svg className="info-box__icon" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 9v5M10 7v.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="info-box__text">
                  Admin will be required to change password on first login.
                  Two-factor authentication will be enabled by default and must
                  be configured during the first onboarding session.
                </p>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="layout__right">
            {/* Module Permissions */}
            <section className="card" aria-labelledby="permissions-heading">
              <div className="card__header">
                <h2 className="card__title" id="permissions-heading">
                  Module Permissions
                </h2>
                <span className="card__badge">CONTROL ACCESS</span>
              </div>
              <div className="module-list">
                {moduleList.map((m) => (
                  <ModulePermission
                    key={m.key}
                    id={`perm-${m.key}`}
                    icon={m.icon}
                    title={m.title}
                    description={m.description}
                    checked={permissions[m.key]}
                    onChange={() => togglePermission(m.key)}
                  />
                ))}
              </div>
            </section>

            {/* Send Welcome Email */}
            <section className="card" aria-labelledby="email-heading">
              <h2 className="card__title" id="email-heading">
                Send Welcome Email
              </h2>
              <div className="module-list">
                <div className="module-row">
                  <div className="module-row__icon">{icons.email}</div>
                  <div className="module-row__info">
                    <p className="module-row__title">Send login credentials</p>
                    <p className="module-row__desc">
                      Email temporary password to admin
                    </p>
                  </div>
                  <Toggle
                    checked={sendCredentials}
                    onChange={setSendCredentials}
                    id="toggle-credentials"
                  />
                </div>
                <div className="module-row">
                  <div className="module-row__icon">{icons.twofa}</div>
                  <div className="module-row__info">
                    <p className="module-row__title">Require 2FA setup</p>
                    <p className="module-row__desc">
                      Must set up authenticator on login
                    </p>
                  </div>
                  <Toggle
                    checked={require2fa}
                    onChange={setRequire2fa}
                    id="toggle-2fa"
                  />
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <div className="next-steps" role="note" aria-label="Next Steps">
              <div className="next-steps__header">
                {icons.next}
                <strong>Next Steps</strong>
              </div>
              <p className="next-steps__body">
                Once created, the new admin will receive an invitation link
                valid for 48 hours. You can track their activation status in the
                Admin Management list.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <p> 2024 AdminCore Wireframe System</p>
      </footer>
    </div>
  );
};

export default OnboardAdmin;
