import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Onboard.css";

const BASE_URL = "http://localhost:3001";

const NAV_ITEMS = [
  { label: "Dashboard" },
  { label: "Members" },
  { label: "Admins" },
  { label: "Onboard" },
  { label: "Analytics" },
  { label: "Settings" },
];

const MODULE_PERMISSIONS = [
  {
    label: "Concierge Module",
    key: "conciergeModule",
    description: "Match curation, member management",
    defaultOn: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="#9c27b0" strokeWidth="1.4" />
        <circle cx="7" cy="7" r="2.5" stroke="#9c27b0" strokeWidth="1.4" />
        <circle cx="7" cy="7" r="0.8" fill="#9c27b0" />
      </svg>
    ),
  },
  {
    label: "View Member Profiles",
    key: "viewMemberProfiles",
    description: "Read-only access to all profiles",
    defaultOn: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="5" r="2.5" stroke="#9c27b0" strokeWidth="1.4" />
        <path
          d="M2 13c0-2.761 2.239-5 5-5s5 2.239 5 5"
          stroke="#9c27b0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Send Messages",
    key: "sendMessages",
    description: "Contact members directly",
    defaultOn: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="3"
          width="12"
          height="8"
          rx="1.5"
          stroke="#9c27b0"
          strokeWidth="1.4"
        />
        <path
          d="M1 5l6 4 6-4"
          stroke="#9c27b0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Manage Coaching",
    key: "manageCoaching",
    description: "Book and track sessions",
    defaultOn: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1.5"
          y="3"
          width="11"
          height="9"
          rx="1.5"
          stroke="#9c27b0"
          strokeWidth="1.4"
        />
        <path
          d="M1.5 6h11M5 1.5V4M9 1.5V4"
          stroke="#9c27b0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Moderation Access",
    key: "moderationAccess",
    description: "View flagged accounts",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="#9c27b0" strokeWidth="1.4" />
        <path
          d="M7 4.5V7.5M7 9.5V10"
          stroke="#9c27b0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Analytics Access",
    key: "analyticsAccess",
    description: "View own performance data",
    defaultOn: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="8" width="3" height="5" rx="0.5" fill="#9c27b0" />
        <rect x="5.5" y="5" width="3" height="8" rx="0.5" fill="#9c27b0" />
        <rect x="10" y="2" width="3" height="11" rx="0.5" fill="#9c27b0" />
      </svg>
    ),
  },
  {
    label: "Billing Access",
    key: "billingAccess",
    description: "View subscription info",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="3.5"
          width="12"
          height="7.5"
          rx="1.5"
          stroke="#9c27b0"
          strokeWidth="1.4"
        />
        <path d="M1 6.5h12" stroke="#9c27b0" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Security Access",
    key: "securityAccess",
    description: "View security alerts",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1.5l5.5 2.2v4C12.5 10.5 10 12.5 7 13c-3-0.5-5.5-2.5-5.5-5.3v-4L7 1.5z"
          stroke="#9c27b0"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      className={`ob-toggle${checked ? " ob-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-checked={checked}
      role="switch"
      type="button"
    >
      <span className="ob-toggle-knob" />
    </button>
  );
}

export default function Onboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Onboard");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("Kampala, Uganda");
  const [country, setCountry] = useState("Uganda");

  const [role, setRole] = useState("Concierge Admin");
  const [jobTitle, setJobTitle] = useState("Head Concierge");
  const [reportingToId, setReportingToId] = useState("");
  const [accessLevel, setAccessLevel] = useState("standard");

  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [permissions, setPermissions] = useState(
    MODULE_PERMISSIONS.reduce((acc, mod) => {
      acc[mod.key] = mod.defaultOn;
      return acc;
    }, {}),
  );

  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [requireTwoFa, setRequireTwoFa] = useState(true);

  // API state
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const togglePermission = (key, value) => {
    setPermissions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Reset feedback
    setApiError("");
    setApiSuccess("");

    // Basic validation
    if (!firstName.trim() || !lastName.trim()) {
      setApiError("First name and last name are required.");
      return;
    }
    if (!email.trim()) {
      setApiError("Email address is required.");
      return;
    }
    if (!temporaryPassword) {
      setApiError("Please set a temporary password.");
      return;
    }
    if (temporaryPassword !== confirmPassword) {
      setApiError("Passwords do not match.");
      return;
    }

    const payload = {
      // Personal Information
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      city: city.trim(),
      country: country,

      // Role & Department
      role: role,
      jobTitle: jobTitle.trim(),
      reportingToId: reportingToId || null,
      accessLevel: accessLevel,

      // Account Security
      temporaryPassword: temporaryPassword,

      // Module Permissions
      conciergeModule: permissions.conciergeModule,
      viewMemberProfiles: permissions.viewMemberProfiles,
      sendMessages: permissions.sendMessages,
      manageCoaching: permissions.manageCoaching,
      moderationAccess: permissions.moderationAccess,
      analyticsAccess: permissions.analyticsAccess,
      billingAccess: permissions.billingAccess,
      securityAccess: permissions.securityAccess,

      // Welcome Email Settings
      sendWelcomeEmail: sendWelcomeEmail,
      requireTwoFa: requireTwoFa,
    };

    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setApiError("You must be logged in to onboard a new admin. Please login first.");
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      const response = await fetch(`${BASE_URL}/api/admins/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setApiSuccess(
          data.message || "Admin account created successfully! Redirecting...",
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Handle validation errors array or single message
        if (data.errors && Array.isArray(data.errors)) {
          setApiError(data.errors.map((e) => e.message || e).join(" "));
        } else {
          setApiError(
            data.message || `Request failed with status ${response.status}.`,
          );
        }
      }
    } catch (error) {
      console.error("Onboard API error:", error);
      setApiError(
        "Unable to reach the server. Please check your network connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ob-app">
      {/* ── Sidebar ── */}
      <aside className="ob-sidebar">
        <div className="ob-sidebar-logo">
          <span className="ob-logo-mark">
            <img src="/butterfly-logo.png" alt="Butterfly" />
          </span>
          <span className="ob-logo-text">AdminCore</span>
        </div>

        <nav className="ob-sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`ob-nav-item${activeNav === item.label ? " ob-nav-item--active" : ""}`}
              onClick={() => {
                if (item.label === "Admins") {
                  navigate("/moderatordashboard");
                } else {
                  setActiveNav(item.label);
                }
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <div className="ob-sidebar-footer">
          <div className="ob-system-health">
            <span className="ob-health-dot" />
            System Health
          </div>
          <div className="ob-health-bars">
            {[1, 1, 1, 1, 0, 1, 1, 0, 1, 1].map((on, i) => (
              <div
                key={i}
                className={`ob-health-bar${on ? " ob-health-bar--on" : ""}`}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ob-main">
        {/* Topbar */}
        <header className="ob-topbar">
          <div className="ob-search">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              className="ob-search-svg"
            >
              <circle
                cx="5.5"
                cy="5.5"
                r="4"
                stroke="#9ca3af"
                strokeWidth="1.4"
              />
              <path
                d="M8.5 8.5L12 12"
                stroke="#9ca3af"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <input placeholder="Search dashboard..." />
          </div>
          <div className="ob-topbar-right">
            <div className="ob-icon-btn">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="2.2"
                  stroke="#6b7280"
                  strokeWidth="1.3"
                />
                <path
                  d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3 3l1 1M11 11l1 1M3 12l1-1M11 4l1-1"
                  stroke="#6b7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="ob-user-chip">
              <div className="ob-user-info">
                <span className="ob-user-name">Super Admin</span>
                <span className="ob-user-email">admin@admincore.io</span>
              </div>
              <div className="ob-avatar">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="15" fill="#ede0f9" />
                  <circle cx="15" cy="12" r="5" fill="#9c27b0" />
                  <path
                    d="M5 27c0-5.523 4.477-10 10-10s10 4.477 10 10"
                    fill="#ce93d8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="ob-content">
          {/* Page Header Row */}
          <div className="ob-page-header">
            <div>
              <h1 className="ob-page-title">Onboard New Admin</h1>
              <p className="ob-page-sub">
                Create account, assign role and set granular permissions.
              </p>
            </div>
            <div className="ob-header-btns">
              <button
                className="ob-btn-cancel"
                type="button"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="ob-btn-create"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Admin Account"}
              </button>
            </div>
          </div>

          {/* API Feedback Banners */}
          {apiError && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                color: "#b91c1c",
                borderRadius: "8px",
                padding: "10px 16px",
                marginBottom: "16px",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="#b91c1c"
                  strokeWidth="1.3"
                />
                <path
                  d="M7 4.5V7.5M7 9.5V10"
                  stroke="#b91c1c"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              {apiError}
            </div>
          )}
          {apiSuccess && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                color: "#15803d",
                borderRadius: "8px",
                padding: "10px 16px",
                marginBottom: "16px",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="#15803d"
                  strokeWidth="1.3"
                />
                <path
                  d="M4.5 7l2 2 3-3"
                  stroke="#15803d"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {apiSuccess}
            </div>
          )}

          {/* Main Grid */}
          <div className="ob-grid">
            {/* Left */}
            <div className="ob-col-left">
              {/* Personal Information */}
              <section className="ob-card">
                <h2 className="ob-card-title">Personal Information</h2>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label">FIRST NAME</label>
                    <input
                      className="ob-input"
                      placeholder="e.g. Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">LAST NAME</label>
                    <input
                      className="ob-input"
                      placeholder="e.g. Nakato"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label">EMAIL ADDRESS</label>
                    <input
                      className="ob-input"
                      type="email"
                      placeholder="sarah.nakato@admincore.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">PHONE NUMBER</label>
                    <input
                      className="ob-input"
                      placeholder="+256 700 123456"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label">CITY / REGION</label>
                    <input
                      className="ob-input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">COUNTRY</label>
                    <select
                      className="ob-input ob-select"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option>Uganda</option>
                      <option>Kenya</option>
                      <option>Tanzania</option>
                      <option>Rwanda</option>
                      <option>Nigeria</option>
                      <option>South Africa</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Role & Department */}
              <section className="ob-card">
                <h2 className="ob-card-title">Role &amp; Department</h2>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label">ADMIN ROLE</label>
                    <select
                      className="ob-input ob-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Concierge Admin</option>
                      <option>Super Admin</option>
                      <option>Moderator</option>
                      <option>Analyst</option>
                    </select>
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">JOB TITLE</label>
                    <input
                      className="ob-input"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="ob-field ob-field--full">
                  <label className="ob-label">REPORTING TO</label>
                  <select
                    className="ob-input ob-select"
                    value={reportingToId}
                    onChange={(e) => setReportingToId(e.target.value)}
                  >
                    <option value="">Select manager (optional)</option>
                    <option value="">Super User (Alex Kirabo)</option>
                    <option value="">Super Admin</option>
                    <option value="">Team Lead</option>
                  </select>
                </div>
                <div className="ob-field ob-field--full">
                  <label className="ob-label">ACCESS LEVEL</label>
                  <div className="ob-radio-group">
                    {["standard", "elevated", "full"].map((level) => (
                      <label key={level} className="ob-radio-label">
                        <input
                          type="radio"
                          name="accessLevel"
                          value={level}
                          checked={accessLevel === level}
                          onChange={() => setAccessLevel(level)}
                          className="ob-radio-input"
                        />
                        <span className="ob-radio-dot" />
                        {level.charAt(0).toUpperCase() + level.slice(1)} Access
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Account Security */}
              <section className="ob-card">
                <h2 className="ob-card-title">Account Security</h2>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label">TEMPORARY PASSWORD</label>
                    <div className="ob-password-wrapper">
                      <input
                        className="ob-input ob-input-password"
                        type={showTempPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={temporaryPassword}
                        onChange={(e) => setTemporaryPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="ob-eye-btn"
                        onClick={() => setShowTempPassword(!showTempPassword)}
                        aria-label={showTempPassword ? "Hide password" : "Show password"}
                      >
                        {showTempPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">CONFIRM PASSWORD</label>
                    <div className="ob-password-wrapper">
                      <input
                        className="ob-input ob-input-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="ob-eye-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ob-notice">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="ob-notice-icon"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="5.5"
                      stroke="#9c27b0"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M7 5.5V8M7 9.5V10"
                      stroke="#9c27b0"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p>
                    Admin will be required to change password on first login.
                    Two factor authentication will be enabled by default and
                    must be configured during the first onboarding session.
                  </p>
                </div>
              </section>
            </div>

            {/* Right */}
            <div className="ob-col-right">
              {/* Module Permissions */}
              <section className="ob-card">
                <div className="ob-perm-header">
                  <h2 className="ob-card-title ob-card-title--nm">
                    Module Permissions
                  </h2>
                  <span className="ob-ctrl-label">CONTROL ACCESS</span>
                </div>
                <div className="ob-perm-list">
                  {MODULE_PERMISSIONS.map((mod) => (
                    <div key={mod.label} className="ob-perm-row">
                      <div className="ob-perm-icon">{mod.icon}</div>
                      <div className="ob-perm-info">
                        <div className="ob-perm-name">{mod.label}</div>
                        <div className="ob-perm-desc">{mod.description}</div>
                      </div>
                      <Toggle
                        checked={permissions[mod.key]}
                        onChange={(val) => togglePermission(mod.key, val)}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Send Welcome Email */}
              <section className="ob-card">
                <h2 className="ob-card-title">Send Welcome Email</h2>
                <div className="ob-perm-row">
                  <div className="ob-perm-info">
                    <div className="ob-perm-name">Send login credentials</div>
                    <div className="ob-perm-desc">
                      Email temporary password to admin
                    </div>
                  </div>
                  <Toggle
                    checked={sendWelcomeEmail}
                    onChange={setSendWelcomeEmail}
                  />
                </div>
                <div className="ob-perm-row ob-perm-row--last">
                  <div className="ob-perm-info">
                    <div className="ob-perm-name">Require 2FA setup</div>
                    <div className="ob-perm-desc">
                      Must set up authenticator on login
                    </div>
                  </div>
                  <Toggle checked={requireTwoFa} onChange={setRequireTwoFa} />
                </div>
              </section>

              {/* Next Steps */}
              <div className="ob-next-steps">
                <div className="ob-next-steps-hd">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle
                      cx="7"
                      cy="7"
                      r="5.5"
                      stroke="white"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M7 4V7.5L9.5 9"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <strong>Next Steps</strong>
                </div>
                <p>
                  Once created, the new admin will receive an invitation link
                  valid for 48 hours. You can track their activation status in
                  the Admin Management list.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="ob-footer">© 2024 AdminCore Wireframe System</footer>
      </div>
    </div>
  );
}
