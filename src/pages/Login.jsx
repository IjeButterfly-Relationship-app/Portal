import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import styles from "../styles/Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      // Call login from authService
      const data = await authService.login(email, password);

      // Store authentication data
      authService.storeAuthData(data);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Handle different error types
      if (err.message) {
        setError(err.message);
      } else if (err.error) {
        setError(err.error);
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginContainer}>
        {/* Left Side - Logo & Branding */}
        <div className={styles.leftSide}>
          <div className={styles.logoContainer}>
            <img
              src="/butterfly-logo.png"
              alt="Butterfly Logo"
              className={styles.logo}
            />
            <div className={styles.brandSection}>
              <h1 className={styles.brandName}>
                Amoura
                <span className={styles.trademark}>™</span>
              </h1>
              <p className={styles.slogan}>
                Trusted Connections, Real Relationships
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightSide}>
          <div className={styles.glassCard}>
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
                {/* Email Input */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.input}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          width="20"
                          height="20"
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
                          width="20"
                          height="20"
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

                {/* Form Options */}
                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      disabled={loading}
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className={styles.forgotLink}
                    onClick={() => navigate("/forgot-password")}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className={styles.errorMessage} role="alert">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
