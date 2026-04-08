import { render, screen, fireEvent } from "@testing-library/react";
import FlaggedAccount from "../pages/FlaggedAccount";

// ─── Render helper ────────────────────────────────────────────────────────────
function setup() {
  return render(<FlaggedAccount />);
}

// ─── Header ───────────────────────────────────────────────────────────────────
describe("Header", () => {
  it("renders the brand name", () => {
    setup();
    expect(screen.getByText("Butterfly Admin")).toBeInTheDocument();
  });

  it("renders the search input with correct placeholder", () => {
    setup();
    expect(
      screen.getByPlaceholderText("Search users, admins, or tickets...")
    ).toBeInTheDocument();
  });

  it("renders the logged-in user name and role", () => {
    setup();
    expect(screen.getByText("Alex Rivera")).toBeInTheDocument();
    expect(screen.getByText("Super Admin")).toBeInTheDocument();
  });
});

// ─── Mod Queue / Sidebar ──────────────────────────────────────────────────────
describe("Mod Queue sidebar", () => {
  it("shows the queue title", () => {
    setup();
    expect(screen.getByText("Mod Queue")).toBeInTheDocument();
  });

  it("shows the ticket count badge", () => {
    setup();
    expect(screen.getByText("42 Tickets")).toBeInTheDocument();
  });

  it("renders Pending and Reports tabs", () => {
    setup();
    expect(screen.getByRole("button", { name: "Pending" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reports" })).toBeInTheDocument();
  });

  it("Pending tab is active by default", () => {
    setup();
    expect(screen.getByRole("button", { name: "Pending" })).toHaveClass("active");
    expect(screen.getByRole("button", { name: "Reports" })).not.toHaveClass("active");
  });

  it("switches to Reports tab on click", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Reports" }));
    expect(screen.getByRole("button", { name: "Reports" })).toHaveClass("active");
    expect(screen.getByRole("button", { name: "Pending" })).not.toHaveClass("active");
  });

  it("renders all 5 ticket items", () => {
    setup();
    const names = ["Sarah Jenkins", "Marcus Thorne", "Elena Rodriguez", "Kevin Wu", "Aria Stark"];
    names.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  it("renders correct ticket IDs", () => {
    setup();
    ["T-1024", "T-1025", "T-1026", "T-1027", "T-1028"].forEach((id) =>
      expect(screen.getByText(id)).toBeInTheDocument()
    );
  });

  it("shows priority badges with correct labels", () => {
    setup();
    // high appears for T-1024 and T-1026
    const highBadges = screen.getAllByText("high");
    expect(highBadges.length).toBe(2);
    expect(screen.getAllByText("medium").length).toBe(2);
    expect(screen.getByText("low")).toBeInTheDocument();
  });

  it("clicking a ticket makes it active", () => {
    setup();
    const marcusItem = screen.getByText("Marcus Thorne").closest("li");
    fireEvent.click(marcusItem);
    expect(marcusItem).toHaveClass("active");
  });

  it("renders View Past Decisions button", () => {
    setup();
    expect(screen.getByRole("button", { name: /view past decisions/i })).toBeInTheDocument();
  });
});

// ─── Profile Panel ────────────────────────────────────────────────────────────
describe("User profile panel", () => {
  it("shows the user's name", () => {
    setup();
    expect(screen.getByRole("heading", { name: "Sarah Jenkins" })).toBeInTheDocument();
  });

  it("shows Tier: Gold badge", () => {
    setup();
    expect(screen.getByText("Tier: Gold")).toBeInTheDocument();
  });

  it("shows User ID", () => {
    setup();
    expect(screen.getByText(/U-982/)).toBeInTheDocument();
  });

  it("shows join date", () => {
    setup();
    expect(screen.getByText(/Oct 2023/)).toBeInTheDocument();
  });

  it("renders Full Profile link", () => {
    setup();
    expect(screen.getByRole("link", { name: /full profile/i })).toBeInTheDocument();
  });

  it("shows the AI risk score", () => {
    setup();
    // "82" is inside the risk score element
    expect(screen.getByText(/82/)).toBeInTheDocument();
  });
});

// ─── Biometric Verification ───────────────────────────────────────────────────
describe("Biometric verification section", () => {
  it("renders section heading", () => {
    setup();
    expect(screen.getByText(/biometric verification/i)).toBeInTheDocument();
  });

  it("shows Live Check Passed badge", () => {
    setup();
    expect(screen.getByText("Live Check Passed")).toBeInTheDocument();
  });

  it("shows Expires 2029 for passport", () => {
    setup();
    expect(screen.getByText("Expires 2029")).toBeInTheDocument();
  });

  it("shows CURRENT SUBMISSION label on selfie", () => {
    setup();
    expect(screen.getByText("CURRENT SUBMISSION")).toBeInTheDocument();
  });

  it("shows DATABASE RECORD label on passport", () => {
    setup();
    expect(screen.getByText("DATABASE RECORD")).toBeInTheDocument();
  });

  it("renders Submission Metadata section", () => {
    setup();
    expect(screen.getByText("Submission Metadata")).toBeInTheDocument();
  });

  it("metadata is expanded by default", () => {
    setup();
    expect(screen.getByText(/192\.168\.1\.45/)).toBeInTheDocument();
  });

  it("collapses metadata on toggle click", () => {
    setup();
    fireEvent.click(screen.getByText("Submission Metadata"));
    expect(screen.queryByText(/192\.168\.1\.45/)).not.toBeInTheDocument();
  });

  it("expands metadata again on second click", () => {
    setup();
    fireEvent.click(screen.getByText("Submission Metadata"));
    fireEvent.click(screen.getByText("Submission Metadata"));
    expect(screen.getByText(/192\.168\.1\.45/)).toBeInTheDocument();
  });

  it("shows device type", () => {
    setup();
    expect(screen.getByText(/iPhone 15 Pro Max/)).toBeInTheDocument();
  });

  it("shows OS Integrity Genuine badge", () => {
    setup();
    expect(screen.getByText("Genuine")).toBeInTheDocument();
  });
});

// ─── Fraud Sentinel / Moderation Intel ────────────────────────────────────────
describe("Moderation Intel panel", () => {
  it("renders section title", () => {
    setup();
    expect(screen.getByText("Moderation Intel")).toBeInTheDocument();
  });

  it("renders AI Fraud Sentinel Analysis heading", () => {
    setup();
    expect(screen.getByText(/ai fraud sentinel analysis/i)).toBeInTheDocument();
  });

  it("shows face mismatch flag", () => {
    setup();
    expect(screen.getByText(/face mismatch/i)).toBeInTheDocument();
  });

  it("shows IP geolocation mismatch flag", () => {
    setup();
    expect(screen.getByText(/IP Geolocation Mismatch/)).toBeInTheDocument();
  });

  it("shows device ID shared flag", () => {
    setup();
    expect(screen.getByText(/Device ID shared with 3 previously banned accounts/)).toBeInTheDocument();
  });

  it("renders Previous Flags section", () => {
    setup();
    expect(screen.getByText("Previous Flags")).toBeInTheDocument();
  });

  it("shows suspicious messaging rate flag entry", () => {
    setup();
    expect(screen.getByText(/suspicious messaging rate/i)).toBeInTheDocument();
  });

  it("shows ID Verified entry in previous flags", () => {
    setup();
    expect(screen.getByText(/ID Verified \(Primary Level\)/)).toBeInTheDocument();
  });
});

// ─── Action Buttons ───────────────────────────────────────────────────────────
describe("Action buttons", () => {
  it("renders Approve Profile button", () => {
    setup();
    expect(screen.getByRole("button", { name: /approve profile/i })).toBeInTheDocument();
  });

  it("renders Reject Submission button", () => {
    setup();
    expect(screen.getByRole("button", { name: /reject submission/i })).toBeInTheDocument();
  });

  it("renders Flag for Review button", () => {
    setup();
    expect(screen.getByRole("button", { name: /flag for review/i })).toBeInTheDocument();
  });

  it("renders Escalate to Super Admin button", () => {
    setup();
    expect(screen.getByRole("button", { name: /escalate to super admin/i })).toBeInTheDocument();
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────
describe("Footer", () => {
  it("shows copyright notice", () => {
    setup();
    expect(screen.getByText(/© 2024 Butterfly Admin/)).toBeInTheDocument();
  });

  it("shows system online status", () => {
    setup();
    expect(screen.getByText(/System Online: v2\.4\.1/)).toBeInTheDocument();
  });

  it("renders Privacy Policy link", () => {
    setup();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
  });

  it("renders Internal Documentation link", () => {
    setup();
    expect(screen.getByRole("link", { name: /internal documentation/i })).toBeInTheDocument();
  });

  it("renders Support Ticket link", () => {
    setup();
    expect(screen.getByRole("link", { name: /support ticket/i })).toBeInTheDocument();
  });
});