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

// /* ─── Navbar ─── */
// const Navbar = () => (
//   <nav className="navbar">
//     <div className="navbar__logo">
//       <img
//         src="/butterfly-logo.png"
//         alt="Butterfly"
//         className="navbar__logo-img"
//       />
//       <span className="navbar__logo-text">Butterfly</span>
//     </div>
//     <div className="navbar__right">
//       <div className="navbar__social">
//         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="navbar__social-icon" aria-label="Instagram">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
//             <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
//             <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
//           </svg>
//         </a>
//         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="navbar__social-icon" aria-label="Facebook">
//           <svg viewBox="0 0 24 24" fill="currentColor">
//             <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
//           </svg>
//         </a>
//         <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="navbar__social-icon" aria-label="YouTube">
//           <svg viewBox="0 0 24 24" fill="currentColor">
//             <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//           </svg>
//         </a>
//       </div>
//       <a href="#register" className="navbar__cta">
//         Register Now
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M7 17L17 7M17 7H7M17 7V17"/>
//         </svg>
//       </a>
//     </div>
//   </nav>
// );

/* ─── Hero ─── */
const Hero = () => (
  <section className="hero">
    <div className="hero__inner">
      <div className="hero__content">
        <h1 className="hero__title">
          Find deeper,
          <br />
          <span>healthier</span>
          <br />
          connections.
        </h1>
        <p className="hero__subtitle">
          Butterfly is the world's most intuitive relationship app, designed to
          help you build meaningful habits, spark deep conversations, and grow
          closer every day.
        </p>
        {/* <div className="hero__actions">
          <button className="btn btn--primary">💜 Download the app</button>
        </div> */}
        <div className="hero__stores">
          <div className="store-badges">
            <div className="store-badge">
              <img src="/google.png" alt="Google Play" />
            </div>
            <div className="store-badge">
              <img src="/appstore.png" alt="App Store" />
            </div>
          </div>
          <div className="qr-code">
            <QRCode />
          </div>
        </div>
        <p className="qr-text">Scan to download</p>
        {/* <div className="hero__stats">
          <span className="hero__stars">★★★★★</span>
          <span>4.9/5 · Over 12,000 ratings on App Store</span>
        </div> */}
      </div>
    </div>
    <div className="hero__background"></div>
  </section>
);

/* ─── Features ─── */
const features = [
  {
    icon: "lovers.png",
    title: "Deep Compatibility",
    desc: "Find compatible partners who share your values and relationship goals. Connect with people who complement your personality and lifestyle.",
  },
  {
    icon: "verified.png",
    title: "Verified Profiles",
    desc: "Every profile goes through photo & identity verification. No catifishing, no fake accounts-only real people",
  },
  {
    icon: "coach.png",
    title: "Relationship Coaches",
    desc: "Get expert guidance from certified relationship coaches. Learn proven techniques to strengthen your bond.",
  },
  {
    icon: "security1.png",
    title: "Private Secure Vault",
    desc: "A dedicated and encrypted space for your photos, milestones, diary entries, and shared memories. Trusted only by to two of you.",
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
            Built different.No endless swiping, no shallow connections-just
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

/* ─── Steps ─── */
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
    title: "Start real conversations",
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
    <div className="badge">💫 HOW IT WORKS</div>
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

/* ─── Testimonials ─── */
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
  <section className="testimonials-section">
    <div className="testimonials-inner">
      <div className="testimonials__left">
        <h2>
          Hear from <span>happy</span> couples.
        </h2>
        <p className="testimonials__subtitle">
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

/* ─── FAQ ─── */
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
    <section className="faq-section" id="pricing">
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

/* ─── CTA ─── */
const CTA = () => (
  <section className="cta-section">
    <div className="cta-container">
      <div className="cta-left">
        <h3 className="cta-badge">GET THE APP</h3>
        <h2 className="cta-title">
          Your person is already
          <br />
          waiting for you
        </h2>
        <p className="cta-subtitle">
          Download Butterfly free. No subscription required to start - just open the app and begin.
        </p>
        <div className="cta-stores">
          <div className="store-badges">
            <div className="store-badge">
              <img src="/google.png" alt="Google Play" />
            </div>
            <div className="store-badge">
              <img src="/appstore.png" alt="App Store" />
            </div>
          </div>
          <div className="qr-code">
            <QRCode />
          </div>
        </div>
        <p className="qr-text">Scan to download</p>
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

/* ─── Footer ─── */
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
          build deeper coannection through science-backed habits.
        </p>
      </div>
      {[
        {
          title: "Product",
          links: ["Features", "Security"],
        },
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

/* ─── App ─── */
export default function App() {
  return (
    <div>
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
