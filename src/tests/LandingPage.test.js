import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

// ─── Navbar ───────────────────────────────────────────────────────────────────

describe("Navbar", () => {
  it("renders the Butterfly brand name", () => {
    render(<App />);
    expect(screen.getAllByText("Butterfly").length).toBeGreaterThan(0);
  });

  it("renders all navigation links", () => {
    render(<App />);
    expect(screen.getAllByText("Features").length).toBeGreaterThan(0);
    expect(screen.getAllByText("How it Works").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pricing").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
  });

  it("renders Login and Download CTA buttons", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /^login$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /download/i }).length,
    ).toBeGreaterThan(0);
  });
});

// ─── Hero ─────────────────────────────────────────────────────────────────────

describe("Hero Section", () => {
  it("renders the main headline", () => {
    render(<App />);
    expect(screen.getByText(/find deeper/i)).toBeInTheDocument();
  });

  it('renders the italic keyword "healthier"', () => {
    render(<App />);
    expect(screen.getByText("healthier")).toBeInTheDocument();
  });

  it("renders the subtitle description", () => {
    render(<App />);
    expect(screen.getByText(/spark deep conversations/i)).toBeInTheDocument();
  });

  it("renders Download the app button", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /download the app/i }),
    ).toBeInTheDocument();
  });

  it("renders App Store and Google Play badges", () => {
    render(<App />);
    expect(screen.getAllByText("App Store").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Google Play").length).toBeGreaterThan(0);
  });

  it("renders star rating", () => {
    render(<App />);
    expect(screen.getByText(/12,000 ratings/i)).toBeInTheDocument();
  });

  it('renders the eyebrow "Join 40,000+ couples" text', () => {
    render(<App />);
    expect(screen.getByText(/40,000\+/i)).toBeInTheDocument();
  });
});

// ─── Press Bar ────────────────────────────────────────────────────────────────

describe("Press Bar", () => {
  it('renders "As seen in" label', () => {
    render(<App />);
    expect(screen.getByText(/as seen in/i)).toBeInTheDocument();
  });

  it("renders publication names", () => {
    render(<App />);
    expect(screen.getByText(/TechPulse/i)).toBeInTheDocument();
    expect(screen.getByText(/Wellness/i)).toBeInTheDocument();
    expect(screen.getByText(/UX Daily/i)).toBeInTheDocument();
  });
});

// ─── Features ─────────────────────────────────────────────────────────────────

describe("Features Section", () => {
  it("renders the section heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /bloom/i })).toBeInTheDocument();
  });

  it("renders all three feature card titles", () => {
    render(<App />);
    expect(screen.getByText("Daily Spark Prompts")).toBeInTheDocument();
    expect(screen.getByText("Private Secure Vault")).toBeInTheDocument();
    expect(screen.getByText("Relationship Check-Ins")).toBeInTheDocument();
  });

  it("renders feature card descriptions", () => {
    render(<App />);
    expect(screen.getByText(/1,500 therapist-approved/i)).toBeInTheDocument();
    expect(screen.getByText(/end-to-end encrypted/i)).toBeInTheDocument();
  });
});

// ─── Steps ────────────────────────────────────────────────────────────────────

describe("How It Works / Steps Section", () => {
  it("renders the HOW IT WORKS badge", () => {
    render(<App />);
    expect(screen.getByText(/💫 HOW IT WORKS/i)).toBeInTheDocument();
  });

  it("renders all three step titles", () => {
    render(<App />);
    expect(screen.getByText("Build Your Style")).toBeInTheDocument();
    expect(screen.getByText("Invite Your Partner")).toBeInTheDocument();
    expect(screen.getByText("Grow Every Day")).toBeInTheDocument();
  });

  it("renders step numbers 01, 02, 03", () => {
    render(<App />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });
});

// ─── Screenshots ──────────────────────────────────────────────────────────────

describe("Screenshots Section", () => {
  it("renders the section heading", () => {
    render(<App />);
    expect(screen.getByText(/beautifully designed/i)).toBeInTheDocument();
  });

  it("renders the three screenshot labels", () => {
    render(<App />);
    expect(screen.getByText("Daily Prompts")).toBeInTheDocument();
    expect(screen.getByText("Weekly Analytics")).toBeInTheDocument();
    expect(screen.getAllByText("Shared Vault").length).toBeGreaterThan(0);
  });

  it("renders the connection score percentage", () => {
    render(<App />);
    expect(screen.getByText("92%")).toBeInTheDocument();
  });
});

// // ─── Testimonials ─────────────────────────────────────────────────────────────

// describe("Testimonials Section", () => {
//   it('renders "Hear from happy couples" heading', () => {
//     render(<App />);
//     expect(screen.getByText(/hear from/i)).toBeInTheDocument();
//   });

//   it("renders both testimonial author names", () => {
//     render(<App />);
//     expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
//     expect(screen.getByText("Marcus Stone")).toBeInTheDocument();
//   });

//   it("renders testimonial role labels", () => {
//     render(<App />);
//     expect(screen.getByText("Married 4 years")).toBeInTheDocument();
//     expect(screen.getByText("Long-distance couple")).toBeInTheDocument();
//   });

//   it("renders aggregate rating text", () => {
//     render(<App />);
//     expect(screen.getByText(/4\.9\/5 average rating/i)).toBeInTheDocument();
//   });
// });

// ─── FAQ ──────────────────────────────────────────────────────────────────────

describe("FAQ Section", () => {
  it("renders the FAQ heading", () => {
    render(<App />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders all four FAQ questions", () => {
    render(<App />);
    expect(
      screen.getByText(/is butterfly for couples only/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/how secure is my private data/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/difference between free and premium/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/different time zones/i)).toBeInTheDocument();
  });

  it("FAQ answers are hidden by default", () => {
    render(<App />);
    const answer = screen.getByText(
      /1,500 therapist-approved conversation starters/i,
    );
    // This text is in a feature card, not FAQ; test the FAQ-specific one:
    const faqAnswer = screen.getByText(/designed for any two people/i);
    const faqItem = faqAnswer.closest(".faq-item");
    expect(faqItem).not.toHaveClass("open");
  });

  it("opens an FAQ item when its question is clicked", () => {
    render(<App />);
    const firstQuestion = screen.getByText(/is butterfly for couples only/i);
    fireEvent.click(firstQuestion);
    const faqItem = firstQuestion.closest(".faq-item");
    expect(faqItem).toHaveClass("open");
  });

  it("closes an FAQ item when clicked again (toggle)", () => {
    render(<App />);
    const firstQuestion = screen.getByText(/is butterfly for couples only/i);
    fireEvent.click(firstQuestion);
    fireEvent.click(firstQuestion);
    const faqItem = firstQuestion.closest(".faq-item");
    expect(faqItem).not.toHaveClass("open");
  });

  it("only one FAQ item is open at a time", () => {
    render(<App />);
    const q1 = screen.getByText(/is butterfly for couples only/i);
    const q2 = screen.getByText(/how secure is my private data/i);
    fireEvent.click(q1);
    fireEvent.click(q2);
    const item1 = q1.closest(".faq-item");
    const item2 = q2.closest(".faq-item");
    expect(item1).not.toHaveClass("open");
    expect(item2).toHaveClass("open");
  });
});

// ─── CTA Section ──────────────────────────────────────────────────────────────

describe("CTA Section", () => {
  it("renders the CTA heading", () => {
    render(<App />);
    expect(screen.getByText(/ready to grow your/i)).toBeInTheDocument();
  });

  it("renders the Get Started Now button", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /get started now/i }),
    ).toBeInTheDocument();
  });

  it("renders the free trial mention", () => {
    render(<App />);
    expect(screen.getByText(/7-day free trial/i)).toBeInTheDocument();
  });

  it("renders the 50,000+ couples stat", () => {
    render(<App />);
    expect(screen.getByText(/50,000\+/i)).toBeInTheDocument();
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

describe("Footer", () => {
  it("renders the brand description in footer", () => {
    render(<App />);
    expect(screen.getByText(/science-backed habits/i)).toBeInTheDocument();
  });

  it("renders all footer column headings", () => {
    render(<App />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
  });

  it("renders footer links", () => {
    render(<App />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Careers")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<App />);
    expect(screen.getByText(/© 2025 Butterfly Inc/i)).toBeInTheDocument();
  });
});
