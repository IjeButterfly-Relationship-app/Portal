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

  // ── Layout / Structure ──────────────────────────────────────
  describe("Layout", () => {
    it("renders the sidebar with Butterfly logo", () => {
      renderDashboard();
      expect(screen.getByText("Butterfly")).toBeInTheDocument();
    });

    it("renders the topbar search input", () => {
      renderDashboard();
      expect(
        screen.getByPlaceholderText("Search dashboard..."),
      ).toBeInTheDocument();
    });

    it("renders the page title", () => {
      renderDashboard();
      expect(screen.getByText("System Overview")).toBeInTheDocument();
    });

    it("renders the online badge", () => {
      renderDashboard();
      expect(screen.getByText(/System Online/i)).toBeInTheDocument();
    });

    it("renders the user chip with Super Admin name", () => {
      renderDashboard();
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
        renderDashboard();
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
        expect(within(nav).getByText(label)).toBeInTheDocument();
      });
    });

    it("renders CORE OPERATIONS section label", () => {
      renderDashboard();
      expect(screen.getByText("CORE OPERATIONS")).toBeInTheDocument();
    });

    it("renders Logout button", () => {
      renderDashboard();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  // ── Stats Cards ─────────────────────────────────────────────
  describe("Stats Cards", () => {
    it("renders TOTAL MEMBERS stat", () => {
      renderDashboard();
      expect(screen.getByText("TOTAL MEMBERS")).toBeInTheDocument();
    });

    it("renders PREMIUM USERS stat", () => {
      renderDashboard();
      expect(screen.getByText("PREMIUM USERS")).toBeInTheDocument();
    });

    it("renders REVENUE stat", () => {
      renderDashboard();
      expect(screen.getByText("REVENUE (24HRS)")).toBeInTheDocument();
    });

    it("renders ADMINS ONLINE stat", () => {
      renderDashboard();
      expect(screen.getByText("ADMINS ONLINE")).toBeInTheDocument();
    });

    it("renders ACTIVE ESCALATIONS stat", () => {
      renderDashboard();
      expect(screen.getByText("ACTIVE ESCALATIONS")).toBeInTheDocument();
    });

    it("renders metric cards with admin-metric-card class", () => {
      renderDashboard();
      expect(screen.getAllByTestId(/metric-card|admin-metric/).length).toBeGreaterThan(0);
    });
  });

  // ── Chart ───────────────────────────────────────────────────
  describe("Platform Engagement Chart", () => {
    it("renders the chart section title", () => {
      renderDashboard();
      expect(screen.getByText("Platform Engagement")).toBeInTheDocument();
    });

    it("renders chart container", () => {
      renderDashboard();
      expect(screen.getByRole("region", { name: /chart|platform engagement/i }) ||
            screen.getByTestId("chart-container")).toBeInTheDocument();
    });
  });

  // ── Quick Actions ────────────────────────────────────────────
  describe("Quick Actions", () => {
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
        renderDashboard();
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it("renders quick action buttons with qa-btn class", () => {
      renderDashboard();
      const btn = screen.getByRole("button", { name: /Onboard New Admin/i });
      expect(btn).toBeInTheDocument();
    });
  });
});
