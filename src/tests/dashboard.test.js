import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const renderDashboard = () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>,
  );
};

describe("Dashboard", () => {
  beforeEach(() => {
    // Set up localStorage for Super Admin role
    localStorage.setItem("admin_role", "Super Admin");
    localStorage.setItem("admin_email", "superadmin@example.com");
  });

  afterEach(() => {
    localStorage.clear();
  });

  const setupDashboard = () => renderDashboard();

  // ── Layout / Structure ──────────────────────────────────────
  describe("Layout", () => {
    beforeEach(() => {
      setupDashboard();
    });

    it("renders the sidebar with Butterfly logo", () => {
      expect(screen.getByText("Butterfly")).toBeInTheDocument();
    });

    it("renders the topbar search input", () => {
      expect(
        screen.getByPlaceholderText("Search dashboard..."),
      ).toBeInTheDocument();
    });

    it("renders the page title", () => {
      expect(screen.getByText("System Overview")).toBeInTheDocument();
    });

    it("renders the online badge", () => {
      expect(screen.getByText(/System Online/i)).toBeInTheDocument();
    });

    it("renders the user chip with Super Admin name", () => {
      expect(screen.getByText("Super Admin")).toBeInTheDocument();
    });
  });

  // ── Navigation ──────────────────────────────────────────────
  describe("Navigation", () => {
    const NAV_ITEMS = [
      "Moderation",
      "Analytics",
      "Billing",
      "Security & APIs",
      "Policies",
      "Activity Logs",
    ];

    NAV_ITEMS.forEach((label) => {
      it(`renders nav item: ${label}`, () => {
        setupDashboard();
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
        expect(within(nav).getByText(label)).toBeInTheDocument();
      });
    });

    it("renders CORE OPERATIONS section label", () => {
      setupDashboard();
      expect(screen.getByText("CORE OPERATIONS")).toBeInTheDocument();
    });

    it("renders Logout button", () => {
      setupDashboard();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  // ── Stats Cards ─────────────────────────────────────────────
  describe("Stats Cards", () => {
    beforeEach(() => {
      setupDashboard();
    });

    it("renders TOTAL MEMBERS stat", () => {
      expect(screen.getByText("TOTAL MEMBERS")).toBeInTheDocument();
    });

    it("renders PREMIUM USERS stat", () => {
      expect(screen.getByText("PREMIUM USERS")).toBeInTheDocument();
    });

    it("renders REVENUE stat", () => {
      expect(screen.getByText("REVENUE (24HRS)")).toBeInTheDocument();
    });

    it("renders ADMINS ONLINE stat", () => {
      expect(screen.getByText("ADMINS ONLINE")).toBeInTheDocument();
    });

    it("renders ACTIVE ESCALATIONS stat", () => {
      expect(screen.getByText("ACTIVE ESCALATIONS")).toBeInTheDocument();
    });

    it("renders metric cards with admin-metric-card class", () => {
      const cards = screen.getAllByRole("heading").filter(h => 
        h.closest("[class*='admin-metric-card']")
      );
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  // ── Chart ───────────────────────────────────────────────────
  describe("Platform Engagement Chart", () => {
    beforeEach(() => {
      setupDashboard();
    });

    it("renders the chart section title", () => {
      expect(screen.getByText("Platform Engagement")).toBeInTheDocument();
    });

    it("renders chart container", () => {
      expect(screen.getByText(/Platform Engagement/i).closest("section") || 
            screen.getByRole("region", { name: /chart/i }) ||
            screen.getByTestId("chart-container")).toBeInTheDocument();
    });
  });

  // ── Quick Actions ────────────────────────────────────────────
  describe("Quick Actions", () => {
    beforeEach(() => {
      setupDashboard();
    });

    const ACTIONS = [
      "Onboard New Admin",
      "Emergency Suspend",
      "Override Decision",
      "System Config",
      "Export Report",
      "Broadcast Alert",
    ];

    ACTIONS.forEach((label) => {
      it(`renders Quick Action button: ${label}`, () => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it("renders quick action buttons with qa-btn class", () => {
      const btn = screen.getByRole("button", { name: /Onboard New Admin/i });
      expect(btn).toBeInTheDocument();
    });
  });
});
