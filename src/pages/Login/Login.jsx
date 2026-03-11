import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Login.module.css";

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
    sessionStorage.setItem("admin_logged_in", "true");
    sessionStorage.setItem("admin_email", "admin@admin.com");
    sessionStorage.setItem("admin_role", "super_admin");
    navigate("/dashboard");
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginContainer}>
        {/* Left Side - Logo */}
        <div className={styles.leftSide}>
          <div className={styles.logoContainer}>
            <img
              src="/butterfly-logo.png"
              alt="Butterfly Logo"
              className={styles.logo}
            />
            <div className={styles.brandSection}>
              <h1 className={styles.brandName}>
                Butterfly<span className={styles.trademark}>™</span>
              </h1>
              <p className={styles.slogan}>Trusted Connections, Real Relationships</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            {/* Welcome Text */}
            <div className={styles.welcomeSection}>
              <h2 className={styles.welcomeTitle}>Welcome back!</h2>
              <p className={styles.welcomeSubtitle}>
                Enter your credentials to access your account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSignIn} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  Remember me
                </label>
                <button type="button" className={styles.forgotLink} onClick={() => {}}>
                  Forgot password?
                </button>
              </div>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <button type="submit" className={styles.loginButton} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
