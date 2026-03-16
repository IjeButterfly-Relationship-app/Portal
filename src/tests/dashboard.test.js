import { render, screen, fireEvent } from "@testing-library/react";
import AdminCoreDashboard from "../pages/AdminDashbord";

describe("AdminCoreDashboard", () => {
  beforeEach(() => {
    render(<AdminCoreDashboard />);
  });

  // ── Layout / Structure ──────────────────────────────────────
  describe("Layout", () => {
    it("renders the sidebar", () => {
      expect(screen.getByText("AdminCore")).toBeInTheDocument();
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
    const NAV_ITEMS = ["Dashboard", "Admins", "Onboard", "Activity Log"];

    NAV_ITEMS.forEach((label) => {
      it(`renders nav item: ${label}`, () => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it("sets Dashboard as the default active nav item", () => {
      const dashItem = screen.getByText("Dashboard").closest(".nav-item");
      expect(dashItem).toHaveClass("active");
    });

    it("changes active nav item on click", () => {
      const adminsItem = screen.getByText("Admins").closest(".nav-item");
      fireEvent.click(adminsItem);
      expect(adminsItem).toHaveClass("active");
    });
  });

  // ── Stats Cards ─────────────────────────────────────────────
  describe("Stats Cards", () => {
    it("renders Total Members stat", () => {
      expect(screen.getByText("1,284,502")).toBeInTheDocument();
      expect(screen.getByText("Total Members")).toBeInTheDocument();
    });

    it("renders Premium Users stat", () => {
      expect(screen.getByText("87,430")).toBeInTheDocument();
      expect(screen.getByText("Premium Users")).toBeInTheDocument();
    });

    it("renders Revenue stat", () => {
      expect(screen.getByText("$142,890")).toBeInTheDocument();
      expect(screen.getByText("Revenue (USD)")).toBeInTheDocument();
    });

    it("renders Admins Online stat", () => {
      expect(screen.getByText("42 / 50")).toBeInTheDocument();
      expect(screen.getByText("Admins Online")).toBeInTheDocument();
    });

    it("renders Active Escalations stat", () => {
      expect(screen.getByText("18")).toBeInTheDocument();
      expect(screen.getByText("Active Escalations")).toBeInTheDocument();
    });

    it("applies alert-card class to escalations card", () => {
      const escalationValue = screen.getByText("18");
      const card = escalationValue.closest(".stat-card");
      expect(card).toHaveClass("alert-card");
    });
  });

  // ── Chart ───────────────────────────────────────────────────
  describe("Platform Engagement Chart", () => {
    it("renders the chart section title", () => {
      expect(screen.getByText("Platform Engagement")).toBeInTheDocument();
    });

    it("renders an SVG chart element", () => {
      const svg = document.querySelector("svg.chart");
      expect(svg).toBeInTheDocument();
    });

    it("renders all six month labels on the chart", () => {
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].forEach((m) => {
        expect(screen.getByText(m)).toBeInTheDocument();
      });
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
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it("Onboard New Admin button has primary class", () => {
      const btn = screen.getByText("Onboard New Admin").closest(".qa-btn");
      expect(btn).toHaveClass("primary");
    });

    it("Emergency Suspend button has danger class", () => {
      const btn = screen.getByText("Emergency Suspend").closest(".qa-btn");
      expect(btn).toHaveClass("danger");
    });
  });

  // ── Team Table ───────────────────────────────────────────────
  describe("Admin Team Overview", () => {
    const MEMBERS = [
      "Sarah Nakato",
      "Kwame Mensah",
      "Tunde Adewunpo",
      "Fatima Dasi",
    ];

    it("renders the section title", () => {
      expect(screen.getByText("Admin Team Overview")).toBeInTheDocument();
    });

    MEMBERS.forEach((name) => {
      it(`renders team member: ${name}`, () => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it("renders the Manage Admins link", () => {
      expect(screen.getByText("Manage Admins →")).toBeInTheDocument();
    });

    it("renders correct status for Tunde Adewunpo as Busy", () => {
      const row = screen.getByText("Tunde Adewunpo").closest("tr");
      expect(row).toHaveTextContent("Busy");
    });

    it("renders tasks badge for Sarah Nakato as 54", () => {
      const row = screen.getByText("Sarah Nakato").closest("tr");
      expect(row).toHaveTextContent("54");
    });
  });

  // ── Critical Alerts ──────────────────────────────────────────
  describe("Critical Alerts", () => {
    it("renders the section title", () => {
      expect(screen.getByText("Critical Alerts")).toBeInTheDocument();
    });

    const ALERTS = [
      "Fraud detected",
      "Ban detected",
      "Audit detected",
      "Report detected",
      "Verification detected",
    ];

    ALERTS.forEach((alert) => {
      it(`renders alert: ${alert}`, () => {
        expect(screen.getByText(alert)).toBeInTheDocument();
      });
    });

    it("renders the View All Activity Log link", () => {
      expect(screen.getByText("View All Activity Log")).toBeInTheDocument();
    });
  });

  // ── Administrative Modules ───────────────────────────────────
  describe("Administrative Modules", () => {
    const MODULES = [
      "Billing & Revenue",
      "Security & APIs",
      "Policies & Terms",
      "Analytics Engine",
      "Admin Management",
    ];

    it("renders the modules section title", () => {
      expect(screen.getByText("Administrative Modules")).toBeInTheDocument();
    });

    MODULES.forEach((mod) => {
      it(`renders module: ${mod}`, () => {
        expect(screen.getByText(mod)).toBeInTheDocument();
      });
    });
  });

  // ── System Health ────────────────────────────────────────────
  describe("System Health", () => {
    it("renders System Health indicator in sidebar footer", () => {
      expect(screen.getByText("System Health")).toBeInTheDocument();
    });
  });
});
