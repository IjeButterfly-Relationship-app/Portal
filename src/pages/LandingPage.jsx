import { useState } from "react";
import "../styles/LandingPage.css";
import "../App.css";

/* ─── QR Code (SVG pattern) ─── */
const QRCode = () => {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
  ];
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 21 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c}
              y={r}
              width={1}
              height={1}
              fill="#111827"
              rx="0.1"
            />
          ) : null,
        ),
      )}
    </svg>
  );
};

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
const Navbar = () => (
  <nav className="navbar">
    {/* Logo */}
    <a href="/" className="navbar__logo">
      <img
        src="/butterfly-logo.png"
        alt="Butterfly"
        className="navbar__logo-img"
      />
      <span className="navbar__logo-text">Butterfly</span>
    </a>

    {/* Center nav links */}
    <div className="navbar__nav-container">
      <ul className="navbar__links">
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#how-it-works">Steps</a>
        </li>
        <li>
          <a href="#testimonials">Testimonies</a>
        </li>
        <li>
          <a href="#faqs">FAQS</a>
        </li>
        <li>
          <a href="#get-app">Get the app</a>
        </li>
      </ul>
    </div>
  </nav>
);

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
const Hero = () => (
  <section className="hero">
    {/* Smoke white background */}
    <div className="hero__background" />

    <div className="hero__inner">
      {/* Text content */}
      <div className="hero__content">
        <h1 className="hero__title">
          Trusted
          <br />
          Connections,
          <br />
          <span>Real</span> Relationships.
        </h1>
        <p className="hero__subtitle">
          Butterfly is the world's most intuitive relationship app, designed to
          help you build meaningful habits, spark deep conversations, and grow
          closer every day.
        </p>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   FEATURES
══════════════════════════════════════════ */
const features = [
  {
    icon: "lovers.png",
    title: "Deep Compatibility",
    desc: "Find compatible partners who share your values and relationship goals. Connect with people who complement your personality and lifestyle.",
  },
  {
    icon: "verified.png",
    title: "Verified Profiles",
    desc: "Every profile goes through photo & identity verification. No catfishing, no fake accounts — only real people.",
  },
  {
    icon: "coach.png",
    title: "Relationship Coaches",
    desc: "Get expert guidance from certified relationship coaches. Learn proven techniques to strengthen your bond.",
  },
  {
    icon: "security1.png",
    title: "Private Secure Vault",
    desc: "A dedicated and encrypted space for your photos, milestones, diary entries, and shared memories. Trusted only by the two of you.",
  },
  {
    icon: "premium.png",
    title: "Butterfly Premium",
    desc: "Unlock exclusive features and enhanced matching. Get priority support, advanced filters, and unlimited likes to find your perfect match faster.",
  },
  {
    icon: "global.png",
    title: "Local & Global",
    desc: "Meet people around the corner or across the world. Filter by proximity or open your heart to long-distance connections.",
  },
];

const Features = () => (
  <section className="section section--alt" id="features">
    <div className="features__inner">
      <div className="features__content">
        <div className="section__header">
          <h2 className="section__title">
            Everything you need to <em>find</em>
            <br />
            real love.
          </h2>
          <p className="section__subtitle">
            Built different. No endless swiping, no shallow connections — just
            meaningful matches backed by real compatibility science.
          </p>
        </div>
      </div>
      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card animate-in" key={f.title}>
            <div className="feature-card__icon">
              <img
                src={`/${f.icon}`}
                alt={f.title}
                className="feature-icon-img"
              />
            </div>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   STEPS
══════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    title: "Create Your Profile",
    desc: "Set up your account and build your profile to start connecting with others.",
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
   TESTIMONIALS
══════════════════════════════════════════ */
const testimonials = [
  {
    text: "Butterfly changed the way we communicate. The daily prompts spark conversations we'd never have had on our own in 4 years of marriage.",
    name: "Sarah Johnson",
    role: "Married 4 years",
    avatar: "couple1.png",
    avatarClass: "testimonial-avatar--a",
  },
  {
    text: "Long distance for 11 months was tough, but the shared reminders we got each week made us feel less like two separate halves — more like one.",
    name: "Marcus Stone",
    role: "Long-distance couple",
    avatar: "couple.png",
    avatarClass: "testimonial-avatar--b",
  },
];

const Testimonials = () => (
  <section className="testimonials-section" id="testimonials">
    <div className="testimonials-inner">
      <div className="testimonials__left">
        <h2>
          Hear from <span>happy</span> couples.
        </h2>
        <p className="testimonials__tagline">
          Real stories from real couples who've found their spark with
          Butterfly.
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className={`testimonial-avatar ${t.avatarClass}`}>
                  <img
                    src={`/${t.avatar}`}
                    alt={t.name}
                    className="testimonial-avatar-img"
                  />
                </div>
                <div className="testimonial-author__info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="testimonials__right">
        <div className="testimonials__image-card">
          <img
            src="/couple2.png"
            alt="Happy couple"
            className="testimonials__image"
          />
        </div>
      </div>
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
const CTA = () => (
  <section className="cta-section" id="get-app">
    <div className="cta-container">
      <div className="cta-left">
        <h3 className="cta-badge">GET THE APP</h3>
        <h2 className="cta-title">
          Your person is already
          <br />
          waiting for you
        </h2>
        <p className="cta-subtitle">
          Download Butterfly free. No subscription required to start — just open
          the app and begin.
        </p>
        <div className="cta-stores">
          <div className="qr-code">
            <QRCode />
            <p className="qr-text">Scan to download</p>
          </div>
          <div className="store-badge">
            <img src="/google.png" alt="Google Play" />
          </div>
          <div className="store-badge">
            <img src="/appstore.png" alt="App Store" />
          </div>
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

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <div className="navbar__logo" style={{ fontSize: "1.1rem" }}>
          <img
            src="/butterfly-logo.png"
            alt="Butterfly"
            className="footer__logo-img"
          />
          Butterfly
        </div>
        <p>
          The world's most intuitive relationship app for couples who want to
          build deeper connection through science-backed habits.
        </p>
      </div>
      {[
        { title: "Product", links: ["Features", "Security"] },
        { title: "Company", links: ["About Us", "Press"] },
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
   APP
══════════════════════════════════════════ */
export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
