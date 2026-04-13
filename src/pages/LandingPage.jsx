import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import "../App.css";

/* ─── QR Code (SVG pattern) ─── */

/* ══════════════════════════════════════════
   HERO - Glassy Purple Overlay
══════════════════════════════════════════ */
const Hero = () => (
  <section className="hero">
    {/* Background Image - Butterfly */}
    <div className="hero-background">
      <img
        src="/butterfly.jpg"
        alt="Community"
        className="hero-image"
      />
    </div>

    {/* Deep Purple Glass Overlay */}
    <div className="hero-overlay"></div>

    {/* Navigation Bar - Glassmorphism Style */}
    <nav className="navbar">
      <a href="/" className="nav-brand">
        <img
          src="/butterfly-logo.png"
          alt="Amoura"
          className="navbar__logo-img"
        />
        <span className="nav-brand-text">
          Amoura<sup className="trademark">™</sup>
        </span>
      </a>
      <div className="nav-menu">
        <a href="#features" className="nav-link">Features</a>
        <a href="#how-it-works" className="nav-link">Steps</a>
        <a href="#faqs" className="nav-link">FAQs</a>
        <a href="#get-app" className="nav-link">Get the App</a>
        <div className="nav-buttons">
          <button className="nav-app-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span>AppStore</span>
          </button>
          <button className="nav-app-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
            </svg>
            <span>GooglePlay</span>
          </button>
        </div>
      </div>
    </nav>

    {/* Content */}
    <div className="hero-content">
      <h1 className="hero-title">
        ONE WORLD.
        <br />
        ONE GAY SOCIAL APP.
      </h1>

      {/* App Store Buttons */}
      <div className="app-buttons">
        <button className="app-button app-store">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="button-text">
            <span className="button-label">Download on the</span>
            <span className="button-store">App Store</span>
          </div>
        </button>

        <button className="app-button google-play">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
          </svg>
          <div className="button-text">
            <span className="button-label">Get it on</span>
            <span className="button-store">Google Play</span>
          </div>
        </button>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="scroll-indicator">
      <div className="scroll-dot"></div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   FEATURES — layered stack (matches reference image)
══════════════════════════════════════════ */
const features = [
  {
    image: "butterfly1.jpeg",
    title: "Daily Spark Prompts",
    desc: "1,500 therapist-approved conversation starters to deepen your connection.",
    tag: "Prompts",
  },
  {
    image: "butterfly2.jpeg",
    title: "Private Secure Vault",
    desc: "End-to-end encrypted space for your photos and memories.",
    tag: "Security",
  },
  {
    image: "butterfly3.jpeg",
    title: "Relationship Check-Ins",
    desc: "Weekly wellness check-ins to keep your bond strong.",
    tag: "Check-Ins",
  },
  {
    image: "butterfly4.jpeg",
    title: "Deep Compatibility",
    desc: "Find compatible partners who share your values.",
    tag: "Compatibility",
  },
  {
    image: "couple2.png",
    title: "Relationship Coaches",
    desc: "Expert guidance from certified professionals.",
    tag: "Coaching",
  },
  {
    image: "couple.png",
    title: "Local & Global",
    desc: "Meet people around the corner or across the world.",
    tag: "Global",
  },
];

// How many cards peek out behind the front card
const BEHIND_COUNT = 2;
// How many px each card behind shifts right
const PEEK_PX = 56;
// How much each card behind shrinks (0–1)
const SCALE_STEP = 0.035;

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Build ordered slice: [activeIndex, activeIndex+1, activeIndex+2, …]
  const visibleCards = Array.from({ length: BEHIND_COUNT + 1 }, (_, i) => {
    const fi = (activeIndex + i) % features.length;
    return { ...features[fi], featureIndex: fi, stackPos: i };
  });

  return (
    <section className="section section--alt" id="features">
      <div className="features__two-col">
        {/* ── Left col: heading + active-card info + controls ── */}
        <div className="features__header-col">
          <h2 className="section__title features__title">
            Bloom together with
            <br />
            <em>deeper</em> connections.
          </h2>
          <p className="section__subtitle features__subtitle">
            Built different. No endless swiping, no shallow connections — just
            meaningful matches backed by real compatibility science.
          </p>

          <div className="features__active-info">
            <span className="features__active-tag">
              {features[activeIndex].tag}
            </span>
            <h3 className="features__active-title">
              {features[activeIndex].title}
            </h3>
            <p className="features__active-desc">
              {features[activeIndex].desc}
            </p>
          </div>

          <div className="features__static" style={{ display: "none" }}>
            <p>Daily Spark Prompts</p>
            <p>Private Secure Vault</p>
            <p>Relationship Check-Ins</p>
          </div>
        </div>

        {/* ── Right col: stacked cards ── */}
        <div className="features__cards-col">
          {/*
            The stack wrapper uses position:relative so absolute children
            are positioned relative to it.  We render cards back-to-front
            (reversed) so the front card paints last and sits on top.
          */}
          <div className="feature-stack">
            {[...visibleCards]
              .reverse()
              .map(({ image, tag, featureIndex, stackPos }) => {
                const translateX = stackPos * PEEK_PX;
                const scale = 1 - stackPos * SCALE_STEP;
                const brightness = 1 - stackPos * 0.1;

                return (
                  <div
                    key={featureIndex}
                    className={`feature-stack__card${stackPos === 0 ? " active" : ""}`}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex: BEHIND_COUNT + 1 - stackPos,
                      filter:
                        stackPos === 0 ? "none" : `brightness(${brightness})`,
                    }}
                    onClick={() =>
                      stackPos !== 0 && setActiveIndex(featureIndex)
                    }
                  >
                    {/* Full-bleed photo */}
                    <div className="feature-stack__image-wrap">
                      <img
                        src={`/${image}`}
                        alt={tag}
                        className="feature-stack__image"
                      />
                    </div>

                    {/*
                    Yellow pill tag — rotated vertically on the RIGHT edge,
                    exactly like the reference screenshot.
                  */}
                    <div className="feature-stack__tag-wrap">
                      <span className="feature-stack__tag">{tag}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   STEPS
══════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    title: "Create Your Profile",
    desc: "Set up your account and build your profile to start connecting with others",
  },
  {
    num: "02",
    title: "See Your Matches",
    desc: "Discover compatible partners who share your values and relationship goals.",
  },
  {
    num: "03",
    title: "Start Real Conversations",
    desc: "Begin meaningful dialogues with daily prompts designed to deepen your connection.",
  },
  {
    num: "04",
    title: "Grow Together",
    desc: "Build healthy relationships through meaningful connections and shared experiences.",
  },
];

const Steps = () => (
  <section className="steps-section" id="how-it-works">
    <div className="section__header">
      {/* <p className="section__badge">💫 HOW IT WORKS</p> */}
      <h2 className="section__title">Four steps to a better bond</h2>
    </div>
    <div className="steps-grid">
      {steps.map((s) => (
        <div className="step-card" key={s.num}>
          <div className="step-card__number">{s.num}</div>
          <h3 className="step-card__title">{s.title}</h3>
          <p className="step-card__desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */
const faqs = [
  {
    q: "Is Amoura for couples only?",
    a: "While our core is designed for romantic journeys, Amoura is designed for any two people looking to deepen their bond — siblings, long-term friends, or family members who want to improve communication habits.",
  },
  {
    q: "How secure is my private data?",
    a: "Your data is end-to-end encrypted and stored on secure servers. We never sell or share your personal data with third parties. Your vault content is accessible only to you and your partner.",
  },
  {
    q: "What&apos;s the difference between Free and Premium?",
    a: "Free gives you access to 3 daily prompts and basic check-ins. Premium unlocks unlimited prompts, the full vault, analytics dashboard, priority support, and our entire library of relationship courses.",
  },
  {
    q: "Can I use it if we live in different time zones?",
    a: "Absolutely! Amoura is fully asynchronous. Each partner receives prompts at a time that suits their local timezone, and replies are stored safely until the other person checks in.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-section" id="faqs">
      <div className="faq-inner">
        <div
          className="section__header"
          style={{ textAlign: "center", margin: "0 auto 0" }}
        >
          <h2 className="section__title">Frequently Asked Questions</h2>
          <p className="section__subtitle">
            Everything you need to know about the Amoura experience.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <span className="faq-chevron">▼</span>
              </button>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section" id="get-app">
      <div className="cta-container">
        <div className="cta-left">
          <h2 className="cta-title">
            Ready to grow your
            <br />
            relationship?
          </h2>
          <div className="cta-stats">
            <span className="cta-stat">50,000+ couples</span>
          </div>
          <p className="cta-subtitle">
            Download Amoura free. No subscription required to start — just open
            the app and begin.
          </p>
          <p className="cta-trial">
            <span className="cta-trial__highlight">7-day free trial</span> of
            Premium
          </p>
          <div className="cta-actions">
            <button
              className="cta-primary-btn"
              onClick={() => navigate("/download")}
            >
              Get Started Now
            </button>
          </div>
          <div className="cta-store-badges">
            <button className="cta__app-store-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="cta__badge-text">
                <span className="cta__badge-small">Download on the</span>
                <span className="cta__badge-large">App Store</span>
              </div>
            </button>
            <button className="cta__google-play-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="cta__badge-text">
                <span className="cta__badge-small">GET IT ON</span>
                <span className="cta__badge-large">Google Play</span>
              </div>
            </button>
          </div>
        </div>
        <div className="cta-right">
          <div className="floating-screens">
            <div className="screen screen-1">
              <img src="/discover.jpeg" alt="Discover screen" />
            </div>
            <div className="screen screen-2">
              <img src="/onboard.jpeg" alt="Onboard screen" />
            </div>
            <div className="screen screen-3">
              <img src="/profile.jpeg" alt="Profile screen" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <div
          className="navbar__logo footer__logo-wrapper"
          style={{ fontSize: "1.1rem" }}
        >
          <img
            src="/butterfly-logo.png"
            alt="Amoura"
            className="footer__logo-img"
          />
          <span className="footer__logo-text">
            Amoura<sup className="trademark">™</sup>
          </span>
        </div>
        <p>
          The world&apos;s most intuitive relationship app for couples who want
          to build deeper connection through science-backed habits.
        </p>
      </div>
      {[
        { title: "Product", links: ["Features", "Security"] },
        { title: "Company", links: ["About Us", "Press", "Careers"] },
        {
          title: "Legal",
          links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
        },
        {
          title: "Connect",
          links: ["Help Centre", "Contact Us", "Give Feedback"],
        },
      ].map((col) => (
        <div className="footer__col" key={col.title}>
          <h4>{col.title}</h4>
          <ul>
            {col.links.map((l) => (
              <li key={l}>
                <button className="footer-link-btn">{l}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="footer__bottom">
      <span>© 2025 Amoura Inc. All rights reserved.</span>
      <span>Made with 💜 for couples everywhere</span>
    </div>
  </footer>
);

/* ══════════════════════════════════════════
   APP
══════════════════════════════════════════ */
export default function App() {
  return (
    <div>
      <Hero />
      <Features />
      <Steps />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
