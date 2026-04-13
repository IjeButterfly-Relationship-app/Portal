import { useNavigate } from "react-router-dom";
import "../styles/DownloadApp.css";

/* ─── Play Store Header ─── */
const PlayStoreHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="play-header">
      <div className="play-header__left">
        <button className="play-header__logo" onClick={() => navigate("/")}>
          <svg viewBox="0 0 24 24" className="play-logo">
            <path
              fill="#EA4335"
              d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z"
            />
            <path
              fill="#FBBC05"
              d="M20.548 10.273L6.345 1.146A1.002 1.002 0 0 0 5.003 2v20c0 .75.83 1.204 1.46.817l14.202-9.127a1 1 0 0 0-.117-1.717z"
            />
            <path
              fill="#4285F4"
              d="M3.609 1.814c-.37.21-.609.606-.609 1.03v18.312c0 .423.239.82.609 1.03l10.597-10.597L3.609 1.814z"
            />
            <path
              fill="#34A853"
              d="M3.609 22.186l10.597-10.186 6.253 5.983L6.34 22.854a1 1 0 0 1-1.46-.817l-.271-.851z"
            />
          </svg>
          <span className="play-logo-text">Google Play</span>
        </button>
        <nav className="play-nav">
          <button type="button" className="play-nav__link">
            Games
          </button>
          <button type="button" className="play-nav__link active">
            Apps
          </button>
          <button type="button" className="play-nav__link">
            Kids
          </button>
        </nav>
      </div>
      <div className="play-header__right">
        <button className="play-icon-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
        <button className="play-icon-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

/* ─── App Header Section ─── */
const AppHeader = () => (
  <section className="app-header">
    <div className="app-header__content">
      <div className="app-header__left">
        <h1 className="app-title">Butterfly: Relationship App</h1>
        <p className="app-developer">Butterfly Inc.</p>
        <div className="app-meta">
          <span className="app-badge">Contains ads</span>
        </div>
        <div className="app-stats">
          <div className="app-stat">
            <span className="app-stat__value">4.8★</span>
            <span className="app-stat__label">2.5M reviews</span>
          </div>
          <div className="app-stat-divider" />
          <div className="app-stat">
            <span className="app-stat__value">10M+</span>
            <span className="app-stat__label">Downloads</span>
          </div>
          <div className="app-stat-divider" />
          <div className="app-stat">
            <span className="app-stat__icon">🛡️</span>
            <span className="app-stat__label">Rated for 12+</span>
          </div>
        </div>
        <div className="app-actions">
          <button className="app-install-btn">Install</button>
          <button className="app-action-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>
          <button className="app-action-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Add to wishlist
          </button>
        </div>
        <p className="app-device-msg">
          <svg viewBox="0 0 24 24" fill="currentColor" className="device-icon">
            <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
          </svg>
          This app is available for all of your devices
        </p>
      </div>
      <div className="app-header__right">
        <div className="app-icon-large">
          <img src="/butterfly-logo.png" alt="Butterfly App Icon" />
        </div>
      </div>
    </div>
  </section>
);

/* ─── Screenshots Section ─── */
const Screenshots = () => (
  <section className="app-screenshots">
    <div className="screenshots-container">
      <div className="screenshot-card screenshot-card--featured">
        <div className="screenshot-card__content">
          <span className="screenshot-tag">Deep Compatibility</span>
          <p className="screenshot-text">
            Find compatible partners who share your values and relationship
            goals.
          </p>
        </div>
        <img src="/discover.jpeg" alt="Discover Feature" />
      </div>
      <div className="screenshot-card">
        <img src="/onboard.jpeg" alt="Onboard Screen" />
      </div>
      <div className="screenshot-card">
        <img src="/profile.jpeg" alt="Profile Screen" />
      </div>
      <div className="screenshot-card">
        <img src="/butterfly1.jpeg" alt="App Feature" />
      </div>
    </div>
  </section>
);

/* ─── About Section ─── */
const AboutSection = () => (
  <section className="app-about">
    <h2 className="about-title">About this app</h2>
    <p className="about-text">
      Butterfly is the world&apos;s most intuitive relationship app, designed to
      help you build meaningful habits, spark deep conversations, and grow
      closer every day. With verified profiles, relationship coaching, and a
      secure private vault, Butterfly gives you everything you need to find and
      nurture real love.
    </p>
    <div className="about-tags">
      <span className="about-tag">Dating</span>
      <span className="about-tag">Relationships</span>
      <span className="about-tag">Lifestyle</span>
    </div>
  </section>
);

/* ─── Features Section ─── */
const Features = () => (
  <section className="app-features">
    <h2 className="features-title">Key Features</h2>
    <div className="features-grid">
      <div className="feature-item">
        <span className="feature-icon"></span>
        <span className="feature-text">Deep Compatibility Matching</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon"></span>
        <span className="feature-text">Verified Profiles</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon"></span>
        <span className="feature-text">Daily Conversation Prompts</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon"></span>
        <span className="feature-text">Private Secure Vault</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon"></span>
        <span className="feature-text">Relationship Coaching</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon"></span>
        <span className="feature-text">Local & Global Matching</span>
      </div>
    </div>
  </section>
);

/* ─── App Support ─── */
const AppSupport = () => (
  <section className="app-support">
    <div className="app-support__header">
      <h3 className="app-support__title">App support</h3>
      <button className="app-support__toggle">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
    </div>
  </section>
);

/* ─── Main Page ─── */
export default function DownloadApp() {
  return (
    <div className="play-store-page">
      <PlayStoreHeader />
      <main className="play-store-main">
        <AppHeader />
        <Screenshots />
        <AboutSection />
        <Features />
        <AppSupport />
      </main>
    </div>
  );
}
