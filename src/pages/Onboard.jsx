import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Onboard.css";

const BASE_URL = "http://208.68.36.144";

const MODULE_PERMISSIONS = [
  {
    label: "Moderation Access",
    key: "moderationAccess",
    description: "View flagged accounts",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1.5l5.5 2.2v4C12.5 10.5 10 12.5 7 13c-3-0.5-5.5-2.5-5.5-5.3v-4L7 1.5z"
          stroke="#d946ef"
          strokeWidth="1.4"
          strokeLinejoin="round"
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
        <rect x="1" y="8" width="3" height="5" rx="0.5" fill="#d946ef" />
        <rect x="5.5" y="5" width="3" height="8" rx="0.5" fill="#d946ef" />
        <rect x="10" y="2" width="3" height="11" rx="0.5" fill="#d946ef" />
      </svg>
    ),
  },
  {
    label: "Billing Admin",
    key: "billingAccess",
    description: "Manage subscription info",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="3.5"
          width="12"
          height="7.5"
          rx="1.5"
          stroke="#d946ef"
          strokeWidth="1.4"
        />
        <path d="M1 6.5h12" stroke="#d946ef" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Support Agent",
    key: "supportAgent",
    description: "Handle member support tickets",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5" fill="#d946ef" />
        <path d="M7 5v2.5M7 9h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Compliance Admin",
    key: "complianceAdmin",
    description: "Manage compliance and policies",
    defaultOn: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="1" stroke="#d946ef" strokeWidth="1.4" />
        <path d="M4 7l2 2 4-4" stroke="#d946ef" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
  const [reportingToId, setReportingToId] = useState("alex-kirabo");
  const [accessLevel, setAccessLevel] = useState("standard Access");

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

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const togglePermission = (key, value) => {
    setPermissions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setApiError("");
    setApiSuccess("");

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
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      city: city.trim(),
      country: country,
      role: role,
      jobTitle: jobTitle.trim(),
      reportingToId: reportingToId || null,
      accessLevel: accessLevel,
      temporaryPassword: temporaryPassword,
      moderationAccess: permissions.moderationAccess,
      analyticsAccess: permissions.analyticsAccess,
      billingAccess: permissions.billingAccess,
      supportAgent: permissions.supportAgent,
      complianceAdmin: permissions.complianceAdmin,
      sendWelcomeEmail: sendWelcomeEmail,
      requireTwoFa: requireTwoFa,
    };

    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setApiError(
          "You must be logged in to onboard a new admin. Please login first.",
        );
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      const response = await fetch(`${BASE_URL}/admin-onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setApiSuccess(
          data.message ||
            "Admin onboarded successfully! Email invitation sent.",
        );
        setTimeout(() => {
          // Optional: reset form here if needed
        }, 3000);
      } else if (response.status === 401) {
        setApiError("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          setApiError(data.errors.map((e) => e.message || e).join(" "));
        } else {
          setApiError(
            data.message || `Request failed with status ${response.status}.`,
          );
        }
      }
    } catch (error) {
      setApiError(
        "Unable to reach the server. Please check your network connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ob-app">
      <Sidebar />

      <div className="ob-main">
        <header className="ob-topbar">
          <div className="ob-topbar-right">
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
              <input placeholder="Search users, coaches, or logs..." />
            </div>
            <div className="ob-icon-btn ob-notification-btn">
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
              <span className="ob-notification-badge">3</span>
            </div>
            <div className="ob-user-chip">
              <div className="ob-user-info">
                <span className="ob-user-name">Super Admin</span>
                <span className="ob-user-email">admin@admincore.io</span>
              </div>
              <div className="ob-avatar">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="15" fill="#ede0f9" />
                  <circle cx="15" cy="12" r="5" fill="#d946ef" />
                  <path
                    d="M5 27c0-5.523 4.477-10 10-10s10 4.477 10 10"
                    fill="#d946ef"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <main className="ob-content">
          {apiError && (
            <div className="ob-alert ob-alert--error">
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
            <div className="ob-alert ob-alert--success">
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

          <div className="ob-grid">
            <div className="ob-col-left">
              <div className="ob-col-header">
                <h1 className="ob-page-title">Onboard New Admin</h1>
                <p className="ob-page-sub">
                  Create account, assign role and set granular permissions.
                </p>
              </div>
              <section className="ob-card">
                <h2 className="ob-card-title">Personal Information</h2>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label" htmlFor="first-name">
                      FIRST NAME
                    </label>
                    <input
                      id="first-name"
                      className="ob-input"
                      placeholder="e.g. Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="ob-field">
                    <label className="ob-label" htmlFor="last-name">
                      LAST NAME
                    </label>
                    <input
                      id="last-name"
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
                    <option value="alex-kirabo">
                      Super User (Alex Kirabo)
                    </option>
                    <option value="super-admin">Super Admin</option>
                    <option value="team-lead">Team Lead</option>
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
                          value={`${level} Access`}
                          checked={accessLevel === `${level} Access`}
                          onChange={(e) => setAccessLevel(e.target.value)}
                          className="ob-radio-input"
                        />
                        <span className="ob-radio-dot" />
                        {`${level} Access`}
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <section className="ob-card">
                <h2 className="ob-card-title">Account Security</h2>
                <div className="ob-row2">
                  <div className="ob-field">
                    <label className="ob-label" htmlFor="temporary-password">
                      TEMPORARY PASSWORD
                    </label>
                    <div className="ob-password-wrapper">
                      <input
                        id="temporary-password"
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
                        aria-label={
                          showTempPassword
                            ? "Hide temporary value"
                            : "Show temporary value"
                        }
                      >
                        {showTempPassword ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="ob-field">
                    <label className="ob-label" htmlFor="confirm-password">
                      CONFIRM PASSWORD
                    </label>
                    <div className="ob-password-wrapper">
                      <input
                        id="confirm-password"
                        className="ob-input ob-input-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="ob-eye-btn"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirmation value"
                            : "Show confirmation value"
                        }
                      >
                        {showConfirmPassword ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
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
                      stroke="#d946ef"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M7 5.5V8M7 9.5V10"
                      stroke="#d946ef"
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

            <div className="ob-col-right">
              <div className="ob-action-btns">
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

        <footer className="ob-footer">
          <div className="ob-footer-links">
            <a href="#" className="ob-footer-link">Privacy</a>
            <a href="#" className="ob-footer-link">Terms</a>
            <a href="#" className="ob-footer-link">Support</a>
          </div>
          <div className="ob-footer-copyright">© 2024 Butterfly</div>
        </footer>
      </div>
    </div>
  );
}
