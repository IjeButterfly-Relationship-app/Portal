import React, { useState } from "react";
import "../styles/Onboard.css";
import "../styles/OnboardAdmin.css";

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
  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    <div className="onboard-app">
      {/* ── Top Nav ── */}
      <nav className="navbar">
        <div className="navbar__left">
          <div className="navbar__logo">
            <div className="logo-mark" aria-label="AdminCore logo" />
          </div>
        </div>
        <div className="navbar__center">
          <div className="navbar__search">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
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
            <input
              type="text"
              placeholder="Search dashboard…"
              className="navbar__search-input"
              aria-label="Search dashboard"
            />
          </div>
        </div>
        <div className="navbar__right">
          <button className="icon-btn" aria-label="Notifications">
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
          </button>
          <button className="icon-btn" aria-label="Settings">
            <svg viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="navbar__avatar">
            <span className="navbar__avatar-name">Super Admin</span>
            <span className="navbar__avatar-email">admin@admincore.io</span>
            <div className="avatar-circle" aria-hidden="true">
              SA
            </div>
          </div>
        </div>
      </nav>

      {/* ── Page ── */}
      <main className="page">
        {/* Page header */}
        <div className="page__header">
          <div>
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
        </div>

        {/* ── Two-column layout ── */}
        <div className="layout">
          {/* Left column */}
          <div className="layout__left">
            <form id="onboard-form" onSubmit={handleSubmit} noValidate>
              {/* Personal Information */}
              <section className="card" aria-labelledby="personal-info-heading">
                <h2 className="card__title" id="personal-info-heading">
                  Personal Information
                </h2>

                <div className="form-grid form-grid--2">
                  <div className="field">
                    <label className="field__label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      className="field__input"
                      type="text"
                      placeholder="e.g. Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className="field__input"
                      type="text"
                      placeholder="e.g. Nakato"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="field__input"
                      type="email"
                      placeholder="sarah.nakato@admincore.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      className="field__input"
                      type="tel"
                      placeholder="+256 700 123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="city">
                      City / Region
                    </label>
                    <input
                      id="city"
                      className="field__input"
                      type="text"
                      placeholder="Kampala, Uganda"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="country">
                      Country
                    </label>
                    <div className="field__select-wrap">
                      <select
                        id="country"
                        className="field__select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option>Uganda</option>
                        <option>Kenya</option>
                        <option>Tanzania</option>
                        <option>Rwanda</option>
                        <option>Nigeria</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
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
                </div>
              </section>

              {/* Role & Department */}
              <section className="card" aria-labelledby="role-heading">
                <h2 className="card__title" id="role-heading">
                  Role & Department
                </h2>

                <div className="form-grid form-grid--2">
                  <div className="field">
                    <label className="field__label" htmlFor="adminRole">
                      Admin Role
                    </label>
                    <div className="field__select-wrap">
                      <select
                        id="adminRole"
                        className="field__select"
                        value={adminRole}
                        onChange={(e) => setAdminRole(e.target.value)}
                      >
                        <option>Concierge Admin</option>
                        <option>Super Admin</option>
                        <option>Content Admin</option>
                        <option>Support Admin</option>
                        <option>Analytics Admin</option>
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
                  <div className="field">
                    <label className="field__label" htmlFor="jobTitle">
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      className="field__input"
                      type="text"
                      placeholder="Head Concierge"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>

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
                    <label className={`radio-btn ${accessLevel === "standard" ? "radio-btn--active" : ""}`}>
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
                    <label className={`radio-btn ${accessLevel === "elevated" ? "radio-btn--active" : ""}`}>
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
                    <label className={`radio-btn ${accessLevel === "full" ? "radio-btn--active" : ""}`}>
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
                  <svg
                    className="info-box__icon"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
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
                    Two-factor authentication will be enabled by default and
                    must be configured during the first onboarding session.
                  </p>
                </div>
              </section>
            </form>
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
