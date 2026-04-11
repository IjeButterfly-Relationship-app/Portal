import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import "../App.css";

/* ─── QR Code (SVG pattern) ─── */
/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
const Navbar = () => (
  <nav className="navbar">
    <a href="/" className="navbar__logo">
      <img
        src="/butterfly-logo.png"
        alt="Butterfly"
        className="navbar__logo-img"
      />
      <span className="navbar__logo-text">Butterfly</span>
    </a>
    <div className="navbar__nav-container">
      <ul className="navbar__links">
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#how-it-works">How it Works</a>
        </li>
        <li>
          <a href="#pricing">Pricing</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
    <div className="navbar__buttons">
      <button className="navbar__login">Login</button>
      <button className="navbar__download">Download</button>
    </div>
  </nav>
);

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
const Hero = () => (
  <section className="hero">
    <div className="hero__background" />
    <div className="hero__glass-overlay" />
    <div className="hero__inner">
      <div className="hero__content">
        <p className="hero__eyebrow">Join 40,000+ couples</p>
        <h1 className="hero__title">
          Find deeper
          <br />
          <em>healthier</em>
          <br />
          relationships.
        </h1>
        <p className="hero__subtitle">
          Butterfly is the world's most intuitive relationship app, designed to
          help you build meaningful habits, spark deep conversations, and grow
          closer every day.
        </p>
        <div className="hero__cta">
          <button className="hero__download-btn">Download the app</button>
        </div>
        <div className="hero__store-badges">
          <span className="hero__app-store">App Store</span>
          <span className="hero__google-play">Google Play</span>
        </div>
        <div className="hero__ratings">
          <span className="hero__stars">★★★★★</span>
          <span className="hero__rating-text">12,000 ratings</span>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   PRESS BAR
═════════════════════════════════════════ */
const PressBar = () => (
  <section className="press-bar">
    <p className="press-bar__label">As seen in</p>
    <div className="press-bar__logos">
      <span className="press-bar__publication">TechPulse</span>
      <span className="press-bar__publication">Wellness</span>
      <span className="press-bar__publication">UX Daily</span>
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
    title: "Build Your Style",
    desc: "Create your profile and preferences to find your perfect match.",
  },
  {
    num: "02",
    title: "Invite Your Partner",
    desc: "Connect with your partner to start your journey together.",
  },
  {
    num: "03",
    title: "Grow Every Day",
    desc: "Build healthy habits through daily prompts and check-ins.",
  },
];

const Steps = () => (
  <section className="steps-section" id="how-it-works">
    <div className="section__header">
      <p className="section__badge">💫 HOW IT WORKS</p>
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
   SCREENSHOTS
══════════════════════════════════════════ */
const Screenshots = () => (
  <section className="screenshots-section">
    <div className="section__header">
      <h2 className="section__title">Beautifully designed for connection</h2>
    </div>
    <div className="screenshots-grid">
      <div className="screenshot-card">
        <div className="screenshot-card__image" />
        <p className="screenshot-card__label">Daily Prompts</p>
      </div>
      <div className="screenshot-card">
        <div className="screenshot-card__image" />
        <p className="screenshot-card__label">Weekly Analytics</p>
      </div>
      <div className="screenshot-card">
        <div className="screenshot-card__image" />
        <p className="screenshot-card__label">Shared Vault</p>
      </div>
    </div>
    <div className="connection-score">
      <span className="connection-score__value">92%</span>
      <span className="connection-score__label">Connection Score</span>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */
const faqs = [
  {
    q: "Is Butterfly for couples only?",
    a: "While our core is designed for romantic journeys, Butterfly is designed for any two people looking to deepen their bond — siblings, long-term friends, or family members who want to improve communication habits.",
  },
  {
    q: "How secure is my private data?",
    a: "Your data is end-to-end encrypted and stored on secure servers. We never sell or share your personal data with third parties. Your vault content is accessible only to you and your partner.",
  },
  {
    q: "What's the difference between Free and Premium?",
    a: "Free gives you access to 3 daily prompts and basic check-ins. Premium unlocks unlimited prompts, the full vault, analytics dashboard, priority support, and our entire library of relationship courses.",
  },
  {
    q: "Can I use it if we live in different time zones?",
    a: "Absolutely! Butterfly is fully asynchronous. Each partner receives prompts at a time that suits their local timezone, and replies are stored safely until the other person checks in.",
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
            Everything you need to know about the Butterfly experience.
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
            Download Butterfly free. No subscription required to start — just
            open the app and begin.
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
            alt="Butterfly"
            className="footer__logo-img"
          />
          <span className="footer__logo-text">Butterfly</span>
        </div>
        <p>
          The world's most intuitive relationship app for couples who want to
          build deeper connection through science-backed habits.
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
      <span>© 2025 Butterfly Inc. All rights reserved.</span>
      <span>Made with 💜 for couples everywhere</span>
    </div>
  </footer>
);

/* ══════════════════════════════════════════
   PRICING
══════════════════════════════════════════ */
const Pricing = () => (
  <section className="pricing-section" id="pricing">
    <div className="section__header">
      <h2 className="section__title">Simple, transparent pricing</h2>
    </div>
    <div className="pricing-cards">
      <div className="pricing-card">
        <h3 className="pricing-card__title">Free</h3>
        <p className="pricing-card__desc">Essential features for couples</p>
      </div>
      <div className="pricing-card pricing-card--premium">
        <h3 className="pricing-card__title">Premium</h3>
        <p className="pricing-card__desc">Full access to all features</p>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   CONTACT
══════════════════════════════════════════ */
const Contact = () => (
  <section className="contact-section" id="contact">
    <div className="section__header">
      <h2 className="section__title">Get in touch</h2>
    </div>
    <div className="contact-form">
      <input type="email" placeholder="Your email" />
      <textarea placeholder="Message" />
      <button>Send</button>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   APP
══════════════════════════════════════════ */
export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PressBar />
      <Features />
      <Steps />
      <Screenshots />
      <FAQ />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}
