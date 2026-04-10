import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Onboard from "../pages/Onboard";

const renderOnboard = () =>
  render(
    <MemoryRouter initialEntries={["/onboard"]}>
      <Onboard />
    </MemoryRouter>,
  );

// ── Sidebar ──────────────────────────────────────────────────────────────────
describe("Sidebar", () => {
  it("renders Butterfly brand text", () => {
    renderOnboard();
    expect(screen.getByText("Butterfly")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    renderOnboard();
    const nav = screen.getByRole("navigation");
    [
      "Dashboard",
      "Members",
      "Admins",
      "Onboard",
      "Analytics",
      "Settings",
    ].forEach((label) => {
      expect(within(nav).getByText(label)).toBeInTheDocument();
    });
  });

  it("marks Onboard as the active nav item", () => {
    renderOnboard();
    const el = screen.getByText("Onboard").closest(".ob-nav-item");
    expect(el).toHaveClass("ob-nav-item--active");
  });

  it("renders CORE OPERATIONS section label", () => {
    renderOnboard();
    expect(screen.getByText("CORE OPERATIONS")).toBeInTheDocument();
  });

  it("renders Logout button", () => {
    renderOnboard();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});

// ── Topbar ───────────────────────────────────────────────────────────────────
describe("Topbar", () => {
  it("renders search input", () => {
    renderOnboard();
    expect(
      screen.getByPlaceholderText("Search dashboard..."),
    ).toBeInTheDocument();
  });

  it("shows notification badge with count 3", () => {
    renderOnboard();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows user name and email", () => {
    renderOnboard();
    const banner = screen.getByRole("banner");
    expect(within(banner).getByText("Super Admin")).toBeInTheDocument();
    expect(within(banner).getByText("admin@admincore.io")).toBeInTheDocument();
  });
});

// ── Page Header ───────────────────────────────────────────────────────────────
describe("Page Header", () => {
  it("renders page title", () => {
    renderOnboard();
    expect(screen.getByText("Onboard New Admin")).toBeInTheDocument();
  });

  it("renders page subtitle", () => {
    renderOnboard();
    expect(
      screen.getByText(
        "Create account, assign role and set granular permissions.",
      ),
    ).toBeInTheDocument();
  });

  it("renders Cancel button", () => {
    renderOnboard();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("renders Create Admin Account button", () => {
    renderOnboard();
    expect(
      screen.getByRole("button", { name: /create admin account/i }),
    ).toBeInTheDocument();
  });
});

// ── Personal Information ──────────────────────────────────────────────────────
describe("Personal Information", () => {
  it("renders section heading", () => {
    renderOnboard();
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
  });

  it("renders all field labels", () => {
    renderOnboard();
    [
      "FIRST NAME",
      "LAST NAME",
      "EMAIL ADDRESS",
      "PHONE NUMBER",
      "CITY / REGION",
      "COUNTRY",
    ].forEach((l) => {
      expect(screen.getByText(l)).toBeInTheDocument();
    });
  });

  it("first name placeholder is correct", () => {
    renderOnboard();
    expect(screen.getByPlaceholderText("e.g. Sarah")).toBeInTheDocument();
  });

  it("last name placeholder is correct", () => {
    renderOnboard();
    expect(screen.getByPlaceholderText("e.g. Nakato")).toBeInTheDocument();
  });

  it("email placeholder is correct", () => {
    renderOnboard();
    expect(
      screen.getByPlaceholderText("sarah.nakato@admincore.io"),
    ).toBeInTheDocument();
  });

  it("phone placeholder is correct", () => {
    renderOnboard();
    expect(screen.getByPlaceholderText("+256 700 123456")).toBeInTheDocument();
  });

  it("city defaults to 'Kampala, Uganda'", () => {
    renderOnboard();
    expect(screen.getByDisplayValue("Kampala, Uganda")).toBeInTheDocument();
  });

  it("country defaults to Uganda", () => {
    renderOnboard();
    expect(screen.getByDisplayValue("Uganda")).toBeInTheDocument();
  });

  it("allows typing in first name", async () => {
    renderOnboard();
    const input = screen.getByPlaceholderText("e.g. Sarah");
    await userEvent.type(input, "Sarah");
    expect(input).toHaveValue("Sarah");
  });

  it("allows changing country", () => {
    renderOnboard();
    const select = screen.getByDisplayValue("Uganda");
    fireEvent.change(select, { target: { value: "Kenya" } });
    expect(select).toHaveValue("Kenya");
  });
});

// ── Role & Department ─────────────────────────────────────────────────────────
describe("Role & Department", () => {
  it("renders section heading", () => {
    renderOnboard();
    expect(screen.getByText("Role & Department")).toBeInTheDocument();
  });

  it("admin role defaults to Concierge Admin", () => {
    renderOnboard();
    expect(screen.getByDisplayValue("Concierge Admin")).toBeInTheDocument();
  });

  it("job title defaults to Head Concierge", () => {
    renderOnboard();
    expect(screen.getByDisplayValue("Head Concierge")).toBeInTheDocument();
  });

  it("reporting to defaults correctly", () => {
    renderOnboard();
    expect(
      screen.getByDisplayValue("Super User (Alex Kirabo)"),
    ).toBeInTheDocument();
  });

  it("renders 3 access level radio options", () => {
    renderOnboard();
    expect(screen.getAllByRole("radio").length).toBe(3);
  });

  it("standard Access is selected by default", () => {
    renderOnboard();
    expect(screen.getByDisplayValue("standard Access")).toBeChecked();
  });

  it("can switch to elevated Access", () => {
    renderOnboard();
    const radio = screen.getByDisplayValue("elevated Access");
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it("can switch to full Access", () => {
    renderOnboard();
    const radio = screen.getByDisplayValue("full Access");
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });
});

// ── Account Security ──────────────────────────────────────────────────────────
describe("Account Security", () => {
  it("renders section heading", () => {
    renderOnboard();
    expect(screen.getByText("Account Security")).toBeInTheDocument();
  });

  it("renders two password fields", () => {
    renderOnboard();
    expect(document.querySelectorAll('input[type="password"]').length).toBe(2);
  });

  it("renders the security notice", () => {
    renderOnboard();
    expect(
      screen.getByText(/Admin will be required to change password/i),
    ).toBeInTheDocument();
  });

  it("allows typing in password fields", async () => {
    renderOnboard();
    const [pw] = document.querySelectorAll('input[type="password"]');
    await userEvent.type(pw, "Secret123!");
    expect(pw).toHaveValue("Secret123!");
  });
});

// ── Module Permissions ────────────────────────────────────────────────────────
describe("Module Permissions", () => {
  const modules = [
    "Concierge Module",
    "View Member Profiles",
    "Send Messages",
    "Manage Coaching",
    "Moderation Access",
    "Analytics Access",
    "Billing Access",
    "Security Access",
  ];

  it("renders section heading", () => {
    renderOnboard();
    expect(screen.getByText("Module Permissions")).toBeInTheDocument();
  });

  it("renders CONTROL ACCESS label", () => {
    renderOnboard();
    expect(screen.getByText("CONTROL ACCESS")).toBeInTheDocument();
  });

  it("renders all 6 module labels", () => {
    renderOnboard();
    const permSection = screen
      .getByText("Module Permissions")
      .closest("section");
    const moduleScope = within(permSection);
    // Match actual MODULE_PERMISSIONS array in component
    const actualModules = [
      "Moderation",
      "Analytics",
      "Billing",
      "Security & APIs",
      "Policies",
      "System Health",
    ];
    actualModules.forEach((m) =>
      expect(moduleScope.getByText(m)).toBeInTheDocument(),
    );
  });

  it("renders 8 toggles (6 modules + 2 email options)", () => {
    renderOnboard();
    expect(screen.getAllByRole("switch").length).toBe(8);
  });

  it("Moderation Access toggle is ON by default", () => {
    renderOnboard();
    expect(screen.getAllByRole("switch")[0]).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("Analytics Access toggle is OFF by default", () => {
    renderOnboard();
    expect(screen.getAllByRole("switch")[1]).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("Billing Access toggle is OFF by default", () => {
    renderOnboard();
    expect(screen.getAllByRole("switch")[2]).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("clicking ON toggle turns it OFF", () => {
    renderOnboard();
    const toggle = screen.getAllByRole("switch")[0];
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("clicking OFF toggle turns it ON", () => {
    renderOnboard();
    const toggle = screen.getAllByRole("switch")[1]; // Analytics
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });
});

// ── Send Welcome Email ────────────────────────────────────────────────────────
describe("Send Welcome Email", () => {
  it("renders section heading", () => {
    renderOnboard();
    expect(screen.getByText("Send Welcome Email")).toBeInTheDocument();
  });

  it("renders Send login credentials label", () => {
    renderOnboard();
    expect(screen.getByText("Send login credentials")).toBeInTheDocument();
  });

  it("renders Require 2FA setup label", () => {
    renderOnboard();
    expect(screen.getByText("Require 2FA setup")).toBeInTheDocument();
  });

  it("Send login credentials is ON by default", () => {
    renderOnboard();
    expect(screen.getAllByRole("switch")[6]).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("Require 2FA is ON by default", () => {
    renderOnboard();
    expect(screen.getAllByRole("switch")[7]).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});

// ── Next Steps ────────────────────────────────────────────────────────────────
describe("Next Steps", () => {
  it("renders Next Steps heading", () => {
    renderOnboard();
    expect(screen.getByText("Next Steps")).toBeInTheDocument();
  });

  it("mentions 48 hour invitation validity", () => {
    renderOnboard();
    expect(
      screen.getByText(/invitation link valid for 48 hours/i),
    ).toBeInTheDocument();
  });

  it("mentions Admin Management list", () => {
    renderOnboard();
    expect(screen.getByText(/Admin Management list/i)).toBeInTheDocument();
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────
describe("Footer", () => {});

// ── Submit Action ─────────────────────────────────────────────────────────────
describe("Submit", () => {
  it("shows form fields for submission", () => {
    renderOnboard();

    // Check that form fields exist
    expect(screen.getByLabelText(/FIRST NAME/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LAST NAME/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/e.g. sarah\.jenkins/i),
    ).toBeInTheDocument();

    // Check that submit button exists
    expect(
      screen.getByRole("button", { name: /create admin account/i }),
    ).toBeInTheDocument();
  });
});
