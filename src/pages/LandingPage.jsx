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

/* ─── Navbar ─── */
const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__logo">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
      </svg>
      Butterfly
    </div>
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
    <div className="navbar__actions">
      <button className="btn btn--ghost">Login</button>
      <button className="btn btn--primary">Download</button>
    </div>
  </nav>
);

/* ─── Hero ─── */
const Hero = () => (
  <section className="hero">
    <div className="hero__inner">
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span>✨</span> Join 40,000+ couples learning together
        </div>
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
        <div className="hero__actions">
          <button className="btn btn--primary">💜 Download the app</button>
          <a href="#how-it-works" className="btn btn--ghost">
            Learn more →
          </a>
        </div>
        <div className="hero__stores">
          <div className="store-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </div>
          <div className="store-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.112a.99.99 0 010 1.61L15.149 14.5l-2.557-2.557L15.15 9.39l2.549 1.205zM5.864 2.658L16.8 9l-2.302 2.302-8.635-8.635z" />
            </svg>
            Google Play
          </div>
        </div>
        <div className="hero__stats">
          <span className="hero__stars">★★★★★</span>
          <span>4.9/5 · Over 12,000 ratings on App Store</span>
        </div>
      </div>
    </div>
    <div className="hero__background"></div>
  </section>
);



/* ─── Features ─── */
const features = [
  {
    icon: "✨",
    title: "Daily Spark Prompts",
    desc: "Over 1,500 therapist-approved conversation starters, giving you something new and meaningful to discuss every single day.",
  },
  {
    icon: "🔒",
    title: "Private Secure Vault",
    desc: "A dedicated and encrypted space for your photos, milestones, diary entries, and shared memories. Trusted only by the two of you.",
  },
  {
    icon: "📊",
    title: "Relationship Check-Ins",
    desc: "Smart check-ins that help you identify areas of growth and celebrate connection milestones together, week after week.",
  },
];

const Features = () => (
  <section className="section" id="features">
    <div className="features__inner">
      <div className="features__visual">
        <div className="features__phone-mockup">
          <div className="phone-screen">
            <img src="/phone.jpeg" alt="Butterfly App" className="phone-image" />
          </div>
        </div>
      </div>
      <div className="features__content">
        <div className="section__header">
          <h2 className="section__title">
            Everything you need to <em>bloom</em>
            <br />
            together.
          </h2>
          <p className="section__subtitle">
            We believe relationships aren't just found — they're built. Butterfly
            gives you the scientific tools to maintain the spark through every
            season of life.
          </p>
          <a href="#how-it-works" className="section__link">
            Explore all features →
          </a>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card animate-in" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── Steps ─── */
const steps = [
  {
    num: "01",
    icon: "🎨",
    title: "Build Your Style",
    desc: "Set up your couples profile and personalise your relationship journey together.",
  },
  {
    num: "02",
    icon: "💌",
    title: "Invite Your Partner",
    desc: "Send a single link to connect. Share a phone, tablet, or any device easily.",
  },
  {
    num: "03",
    icon: "🌱",
    title: "Grow Every Day",
    desc: "Complete daily rituals and watch your relationship blossom over time.",
  },
];

const Steps = () => (
  <section className="steps-section" id="how-it-works">
    <div className="badge">💫 HOW IT WORKS</div>
    <div className="section__header">
      <h2 className="section__title">Three steps to a better bond</h2>
    </div>
    <p
      className="section__subtitle"
      style={{
        textAlign: "center",
        color: "var(--gray-500)",
        marginTop: "-40px",
        marginBottom: "64px",
      }}
    >
      Getting connected is effortless. We handle the structure so you can focus
      on the connection.
    </p>
    <div className="steps-grid">
      {steps.map((s) => (
        <div className="step-card" key={s.num}>
          <div className="step-card__number">{s.num}</div>
          <div className="step-card__icon">{s.icon}</div>
          <h3 className="step-card__title">{s.title}</h3>
          <p className="step-card__desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Screenshots ─── */
const Screenshots = () => (
  <section className="screenshots-section">
    <div className="section__header">
      <h2 className="section__title">
        Beautifully designed
        <br />
        for clarity
      </h2>
      <p className="section__subtitle">
        A peek inside the interface couples love to use every morning.
      </p>
    </div>
    <div className="screenshots-grid">
      <div>
        <div className="screenshot-card">
          <div className="screenshot-mockup screenshot-mockup--dark">
            <div className="mockup-topbar">
              <span>9:41</span>
              <span>●●●</span>
            </div>
            <div className="mockup-title">Daily Spark</div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.6,
              }}
            >
              "What's a small habit your partner has that secretly makes you
              feel loved?"
            </p>
            <div className="mockup-emoji">💬</div>
            <div
              style={{
                background: "var(--gradient-cta)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "0.78rem",
                color: "white",
                textAlign: "center",
                marginTop: "auto",
              }}
            >
              Send your reply ✨
            </div>
          </div>
        </div>
        <div className="screenshot-label">Daily Prompts</div>
      </div>

      <div>
        <div className="screenshot-card">
          <div className="screenshot-mockup screenshot-mockup--light">
            <div className="mockup-topbar" style={{ color: "var(--gray-500)" }}>
              <span>Weekly Report</span>
              <span>📈</span>
            </div>
            <div className="mockup-title" style={{ color: "var(--gray-900)" }}>
              Connection Score
            </div>
            <div
              style={{
                fontSize: "3rem",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                color: "var(--purple)",
                margin: "8px 0",
              }}
            >
              92%
            </div>
            <div
              className="mockup-bar mockup-bar--full"
              style={{ width: "92%" }}
            ></div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--gray-400)",
                margin: "4px 0 12px",
              }}
            >
              Up 7% from last week
            </div>
            <div className="mockup-grid">
              {["Communication", "Quality Time", "Intimacy", "Support"].map(
                (l) => (
                  <div
                    key={l}
                    style={{
                      background: "white",
                      borderRadius: "10px",
                      padding: "10px",
                      border: "1px solid var(--gray-100)",
                      fontSize: "0.7rem",
                      color: "var(--gray-500)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.1rem", marginBottom: "4px" }}>
                      {l === "Communication"
                        ? "💬"
                        : l === "Quality Time"
                          ? "⏰"
                          : l === "Intimacy"
                            ? "💜"
                            : "🤝"}
                    </div>
                    {l}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="screenshot-label">Weekly Analytics</div>
      </div>

      <div>
        <div className="screenshot-card">
          <div className="screenshot-mockup screenshot-mockup--purple">
            <div className="mockup-topbar" style={{ color: "var(--gray-500)" }}>
              <span>Shared Vault</span>
              <span>🔒</span>
            </div>
            <div className="mockup-title" style={{ color: "var(--gray-900)" }}>
              Our Memories
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {["🌅", "🎂", "🏖️", "🥂", "🌸", "🎵"].map((e, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {e}
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--gradient-cta)",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "0.78rem",
                color: "white",
                textAlign: "center",
                marginTop: "auto",
              }}
            >
              Add a new memory +
            </div>
          </div>
        </div>
        <div className="screenshot-label">Shared Vault</div>
      </div>
    </div>
  </section>
);

/* ─── Testimonials ─── */
const testimonials = [
  {
    text: "Butterfly changed the way we communicate. The daily prompts spark conversations we'd never have had on our own in 4 years of marriage.",
    name: "Sarah Johnson",
    role: "Married 4 years",
    avatar: "SJ",
    avatarClass: "testimonial-avatar--a",
  },
  {
    text: "Long distance for 11 months was tough, but the shared reminders we got each week made us feel less like two separate halves — more like one.",
    name: "Marcus Stone",
    role: "Long-distance couple",
    avatar: "MS",
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
        <p className="testimonials__tagline">
          Over 50,000 partners use Butterfly to navigate everything from
          long-distance to decades of marriage.
        </p>
        <div className="aggregate-rating">
          <span className="rating-stars">★★★★★</span>
          <span>4.9/5 average rating · App Store</span>
        </div>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className={`testimonial-avatar ${t.avatarClass}`}>
                {t.avatar}
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
    <div>
      <h2 className="cta__title">
        Ready to grow your
        <br />
        relationship?
      </h2>
      <p className="cta__subtitle">
        Join 50,000+ couples who are blooming together. Download Butterfly today
        and start your journey with a 7-day free trial of Premium.
      </p>
      <div className="cta__actions">
        <button className="btn btn--white">Get Started Now</button>
      </div>
      <div className="cta__stores">
        {[
          { label: "App Store", icon: "🍎" },
          { label: "Google Play", icon: "▶" },
        ].map((s) => (
          <div className="cta__store" key={s.label}>
            <span>{s.icon}</span> {s.label}
          </div>
        ))}
      </div>
    </div>
    <div className="cta__qr">
      <QRCode />
      <div className="cta__qr-label">
        Scan to
        <br />
        Download
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          Butterfly
        </div>
        <p>
          The world's most intuitive relationship app for couples who want to
          build deeper connection through science-backed habits.
        </p>
        <div className="footer__social">
          {["𝕏", "in", "f", "▶"].map((s) => (
            <div className="social-icon" key={s}>
              {s}
            </div>
          ))}
        </div>
      </div>
      {[
        {
          title: "Product",
          links: ["Features", "Pricing", "Security", "Roadmap"],
        },
        { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
        {
          title: "Legal",
          links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
        },
        {
          title: "Connect",
          links: ["Help Centre", "Contact Us", "Community", "Give Feedback"],
        },
      ].map((col) => (
        <div className="footer__col" key={col.title}>
          <h4>{col.title}</h4>
          <ul>
            {col.links.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
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
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <Screenshots />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
