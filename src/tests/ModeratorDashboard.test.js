import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ModeratorDashboard from "./ModeratorDashboard";

const setup = () => render(<ModeratorDashboard />);

// =============================================================================
// Sidebar
// =============================================================================
describe("Sidebar", () => {
  test("renders brand name", () => {
    setup();
    expect(screen.getByText("Butterfly Admin")).toBeInTheDocument();
  });

  test("renders all nav items", () => {
    setup();
    const labels = [
      "Dashboard",
      "Flagged Content",
      "User Reports",
      "Member Review",
      "Message Queue",
      "Appeals",
      "Activity Log",
    ];
    labels.forEach((l) => expect(screen.getByText(l)).toBeInTheDocument());
  });

  test("Dashboard nav item is active by default", () => {
    setup();
    const btn = screen.getByRole("button", { name: /Dashboard/i });
    expect(btn).toHaveClass("nav-item--active");
  });

  test("clicking a nav item makes it active", () => {
    setup();
    const flagBtn = screen.getByRole("button", { name: /Flagged Content/i });
    fireEvent.click(flagBtn);
    expect(flagBtn).toHaveClass("nav-item--active");
  });

  test("Dashboard becomes inactive after switching nav", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /User Reports/i }));
    expect(screen.getByRole("button", { name: /Dashboard/i })).not.toHaveClass(
      "nav-item--active",
    );
  });

  test("shows badge count on Flagged Content nav item", () => {
    setup();
    // badge is inside the nav item
    const flagBtn = screen.getByRole("button", { name: /Flagged Content/i });
    expect(within(flagBtn).getByText("14")).toBeInTheDocument();
  });

  test("shows badge count on User Reports nav item", () => {
    setup();
    const btn = screen.getByRole("button", { name: /User Reports/i });
    expect(within(btn).getByText("7")).toBeInTheDocument();
  });

  test("shows badge count on Message Queue nav item", () => {
    setup();
    const btn = screen.getByRole("button", { name: /Message Queue/i });
    expect(within(btn).getByText("3")).toBeInTheDocument();
  });

  test("renders Logout button", () => {
    setup();
    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
  });

  test("renders moderator info in sidebar footer", () => {
    setup();
    expect(screen.getByText("Moderator")).toBeInTheDocument();
    expect(screen.getByText("Content Review")).toBeInTheDocument();
  });
});

// =============================================================================
// Topbar
// =============================================================================
describe("Topbar", () => {
  test("renders search input", () => {
    setup();
    expect(
      screen.getByPlaceholderText("Search dashboard…"),
    ).toBeInTheDocument();
  });

  test("renders Notifications button", () => {
    setup();
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
  });

  test("renders Settings button", () => {
    setup();
    expect(screen.getByLabelText("Settings")).toBeInTheDocument();
  });

  test("renders Super Admin avatar initials", () => {
    setup();
    expect(screen.getByText("SA")).toBeInTheDocument();
  });

  test("renders admin email", () => {
    setup();
    expect(screen.getByText("admin@admincore.io")).toBeInTheDocument();
  });
});

// =============================================================================
// Page Header
// =============================================================================
describe("Page Header", () => {
  test("renders Moderation Active status", () => {
    setup();
    expect(screen.getByText("Moderation Active")).toBeInTheDocument();
  });

  test("renders Dashboard Overview heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Dashboard Overview/i }),
    ).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    setup();
    expect(
      screen.getByText("System health and high-level moderation metrics."),
    ).toBeInTheDocument();
  });

  test("renders Download Report button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /Download Report/i }),
    ).toBeInTheDocument();
  });

  test("renders Update Stats button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /Update Stats/i }),
    ).toBeInTheDocument();
  });
});

// =============================================================================
// Stat Cards
// =============================================================================
describe("Stat Cards", () => {
  const stats = [
    { label: "Flagged Accounts", value: "142" },
    { label: "Reports Today", value: "38" },
    { label: "Resolved Today", value: "91" },
    { label: "Active Appeals", value: "3" },
    { label: "Fraud Alerts", value: "12" },
    { label: "Members Reviewed", value: "2,109" },
  ];

  stats.forEach(({ label, value }) => {
    test(`renders ${label} stat card with value ${value}`, () => {
      setup();
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});

// =============================================================================
// Flagged Content Queue
// =============================================================================
describe("Flagged Content Queue", () => {
  test("renders queue section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Flagged Content Queue/i }),
    ).toBeInTheDocument();
  });

  test("renders all 5 flagged items", () => {
    setup();
    expect(screen.getByText("Brian K.")).toBeInTheDocument();
    expect(screen.getByText("Amara S.")).toBeInTheDocument();
    expect(screen.getByText("Tom O.")).toBeInTheDocument();
    expect(screen.getByText("Grace M.")).toBeInTheDocument();
    expect(screen.getByText("Dev P.")).toBeInTheDocument();
  });

  test("renders flag types", () => {
    setup();
    expect(screen.getByText("Inappropriate Message")).toBeInTheDocument();
    expect(screen.getByText("Fake Profile")).toBeInTheDocument();
    expect(screen.getByText("Spam Content")).toBeInTheDocument();
    expect(screen.getByText("Harassment Report")).toBeInTheDocument();
    expect(screen.getByText("Suspicious Activity")).toBeInTheDocument();
  });

  test("renders severity badges", () => {
    setup();
    expect(screen.getByText("critical")).toBeInTheDocument();
    // multiple 'high' and 'medium' badges
    const highs = screen.getAllByText("high");
    expect(highs.length).toBeGreaterThanOrEqual(1);
  });

  test("warn action button for first item works", () => {
    setup();
    const warnBtns = screen.getAllByTitle("Warn");
    fireEvent.click(warnBtns[0]);
    expect(screen.getByText("⚠ Warned")).toBeInTheDocument();
  });

  test("ban action button for second item works", () => {
    setup();
    const banBtns = screen.getAllByTitle("Ban");
    fireEvent.click(banBtns[1]);
    expect(screen.getByText("✗ Banned")).toBeInTheDocument();
  });

  test("clear action button for third item works", () => {
    setup();
    const clearBtns = screen.getAllByTitle("Clear");
    fireEvent.click(clearBtns[2]);
    expect(screen.getByText("✓ Cleared")).toBeInTheDocument();
  });

  test("resolved item gets opacity class", () => {
    setup();
    const warnBtns = screen.getAllByTitle("Warn");
    fireEvent.click(warnBtns[0]);
    // After action, queue-item should have resolved class
    const queueItems = document.querySelectorAll(".queue-item");
    expect(queueItems[0]).toHaveClass("queue-item--resolved");
  });

  test("renders weekly flag volume chart section", () => {
    setup();
    expect(screen.getByText("Weekly Flag Volume")).toBeInTheDocument();
  });
});

// =============================================================================
// Quick Actions
// =============================================================================
describe("Quick Actions", () => {
  test("renders Quick Actions section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Quick Actions/i }),
    ).toBeInTheDocument();
  });

  const qaLabels = [
    "Onboard New Admin",
    "Emergency Suspend",
    "Override Decision",
    "System Config",
    "Export Report",
    "Broadcast Alert",
  ];
  qaLabels.forEach((label) => {
    test(`renders "${label}" quick action`, () => {
      setup();
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders DANGER ZONE label", () => {
    setup();
    expect(screen.getByText("⚡ DANGER ZONE")).toBeInTheDocument();
  });

  test("renders Emergency Lockdown button", () => {
    setup();
    expect(screen.getByText("🔒 Emergency Lockdown")).toBeInTheDocument();
  });
});

// =============================================================================
// Live Activity
// =============================================================================
describe("Live Activity", () => {
  test("renders Live Activity section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Live Activity/i }),
    ).toBeInTheDocument();
  });

  test("renders activity entries", () => {
    setup();
    expect(screen.getByText(/Flora A\./)).toBeInTheDocument();
    expect(screen.getByText(/Tendo K\./)).toBeInTheDocument();
    expect(screen.getByText(/Catherine M\./)).toBeInTheDocument();
    expect(screen.getByText(/Sarah N\./)).toBeInTheDocument();
    expect(screen.getByText(/James L\./)).toBeInTheDocument();
  });
});

// =============================================================================
// Appeals Panel
// =============================================================================
describe("Open Appeals", () => {
  test("renders Open Appeals section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Open Appeals/i }),
    ).toBeInTheDocument();
  });

  test("renders all appeal IDs", () => {
    setup();
    expect(screen.getByText("APL-241")).toBeInTheDocument();
    expect(screen.getByText("APL-238")).toBeInTheDocument();
    expect(screen.getByText("APL-235")).toBeInTheDocument();
  });

  test("renders appeal users", () => {
    setup();
    expect(screen.getByText("Marcus T.")).toBeInTheDocument();
    expect(screen.getByText("Keisha R.")).toBeInTheDocument();
    expect(screen.getByText("Owen B.")).toBeInTheDocument();
  });

  test("renders appeal reasons", () => {
    setup();
    expect(screen.getByText("Wrongful ban appeal")).toBeInTheDocument();
    expect(screen.getByText("Content removal dispute")).toBeInTheDocument();
    expect(screen.getByText("Account restriction review")).toBeInTheDocument();
  });

  test("renders days open indicators", () => {
    setup();
    expect(screen.getByText("2d open")).toBeInTheDocument();
    expect(screen.getByText("3d open")).toBeInTheDocument();
    expect(screen.getByText("5d open")).toBeInTheDocument();
  });

  test("renders review appeal buttons", () => {
    setup();
    const reviewBtns = screen.getAllByLabelText("Review appeal");
    expect(reviewBtns.length).toBe(3);
  });
});

// =============================================================================
// Resolution Stats
// =============================================================================
describe("Resolution Stats", () => {
  test("renders Resolution Stats section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Resolution Stats/i }),
    ).toBeInTheDocument();
  });

  test("renders Warnings Issued metric", () => {
    setup();
    expect(screen.getByText("Warnings Issued")).toBeInTheDocument();
  });

  test("renders Bans Executed metric", () => {
    setup();
    expect(screen.getByText("Bans Executed")).toBeInTheDocument();
  });

  test("renders Cases Cleared metric", () => {
    setup();
    expect(screen.getByText("Cases Cleared")).toBeInTheDocument();
  });
});

// =============================================================================
// Content Breakdown
// =============================================================================
describe("Content Breakdown", () => {
  test("renders Content Breakdown section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /Content Breakdown/i }),
    ).toBeInTheDocument();
  });

  test("renders all content categories", () => {
    setup();
    expect(screen.getByText("Harassment Reports")).toBeInTheDocument();
    expect(screen.getByText("Fake Profiles")).toBeInTheDocument();
    expect(screen.getByText(/Spam/)).toBeInTheDocument();
    expect(screen.getByText("Matching Disputes")).toBeInTheDocument();
  });
});

// =============================================================================
// Footer nav & footer
// =============================================================================
describe("Footer", () => {
  test("renders Go to User Management button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "Go to User Management" }),
    ).toBeInTheDocument();
  });

  test("renders Security Settings button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "Security Settings" }),
    ).toBeInTheDocument();
  });

  test("renders System Logs button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "System Logs" }),
    ).toBeInTheDocument();
  });

  test("renders copyright notice", () => {
    setup();
    expect(
      screen.getByText(/2026 Admin Dashboard. Secure Internal Access Only./i),
    ).toBeInTheDocument();
  });
});
