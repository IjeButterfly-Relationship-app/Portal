import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/authService";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);
      sessionStorage.setItem("admin_logged_in", "true");
      sessionStorage.setItem("admin_email", data.email);
      sessionStorage.setItem("admin_role", data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.glassCard}>
        {/* LEFT — Brand */}
        <div className={styles.leftPanel}>
          <img
            src="/butterfly-logo.png"
            alt="Butterfly Logo"
            className={styles.logo}
          />
          <h1 className={styles.brandName}>
            Butterfly<span className={styles.trademark}>™</span>
          </h1>
          <p className={styles.slogan}>
            Trusted Connections. Real Relationships.
          </p>
        </div>

        {/* RIGHT — Login */}
        <div className={styles.rightPanel}>
          <h2 className={styles.welcomeText}>Welcome, Admin</h2>
          <p className={styles.welcomeSub}>Sign in to your secure dashboard</p>

          <form onSubmit={handleSignIn} className={styles.form}>
            <div className={styles.fieldGroup}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}></span>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}></div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}></span>

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>
            <button type="button" className={styles.forgot}>
              Forgot password?
            </button>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In to Dashboard →"}
            </button>
          </form>

          <div className={styles.footer}>
            <div className={styles.footerRow}>
             
            </div>
            <p className={styles.footerWarn}>
              Unauthorized access is strictly prohibited. All activities are
              monitored and logged.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © 2026 Butterfly™ — Trusted Connections. Real Relationships.
      </div>
    </div>
  );
}
